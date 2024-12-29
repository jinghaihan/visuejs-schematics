import type { Preference } from '../typings'
import { useColorMode, useStorage, useStyleTag } from '@vueuse/core'
import { isNumber, merge } from 'lodash-es'
import { computed, nextTick } from 'vue'
import { DEFAULT_PREFERENCE } from '../constants'
import { generateThemeColorVars } from '../utils'

export const preference = useStorage<Preference>(
  'preference',
  DEFAULT_PREFERENCE,
  localStorage,
  {
    mergeDefaults: (storageValue, defaults) => merge(defaults, storageValue),
  },
)

const { store: storageColorSchema, system: preferredColorSchema } = useColorMode()
export const colorSchema = computed(() => storageColorSchema.value === 'auto' ? preferredColorSchema.value : storageColorSchema.value)
export const isDark = computed(() => colorSchema.value === 'dark')
export const preferredDark = computed(() => preferredColorSchema.value === 'dark')
export const primaryColor = computed(() => preference.value.primaryColor)
export const radius = computed(() => preference.value.radius)
export const lang = computed(() => preference.value.lang)

function toggleColorMode() {
  storageColorSchema.value = colorSchema.value === 'light' ? 'dark' : 'light'
  updatePreference({ colorSchema: storageColorSchema.value })
}

// @ts-expect-error: Transition API
const isAppearanceTransition = document.startViewTransition
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
export function toggleDark(event?: MouseEvent) {
  if (!isAppearanceTransition || !event) {
    toggleColorMode()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  const transition = document.startViewTransition(async () => {
    toggleColorMode()
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value
          ? [...clipPath].reverse()
          : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}

export async function updatePreference(updates: Partial<Preference>) {
  if (updates.colorSchema)
    storageColorSchema.value = updates.colorSchema

  if (updates.colorSchema || updates.primaryColor) {
    updateColorVars(updates)
  }

  if (updates.lang) {
    // TODO load language
  }

  if (isNumber(updates.radius)) {
    document.body.style.setProperty('--radius', `${updates.radius}rem`)
  }

  preference.value = merge(preference.value, updates)
}

const { css } = useStyleTag(``, {
  id: `__SHADCN_UI_VARIABLES__`,
})
export function updateColorVars(updates: Partial<Preference>) {
  const colorVars = generateThemeColorVars(
    updates.primaryColor ?? preference.value.primaryColor,
    isDark.value,
  )

  let cssText = `:root {`
  for (const [key, value] of Object.entries(colorVars)) {
    cssText += `--${key}: ${value};`
  }
  cssText += `}`
  css.value = cssText
}

export async function initPreference() {
  await updatePreference(preference.value)
}
