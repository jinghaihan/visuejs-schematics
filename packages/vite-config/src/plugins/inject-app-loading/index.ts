import type { PluginOption } from 'vite'
import type { InjectAppLoadingOptions } from '../../typings'
import fsp from 'node:fs/promises'
import { join } from 'node:path'

export async function viteInjectAppLoadingPlugin(
  options?: InjectAppLoadingOptions,
): Promise<PluginOption | undefined> {
  const { injectTo = 'app', title = '', template } = options || {}
  const loadingHtml = template ?? await getHtmlTemplate()

  const injectScript = `
  <script data-app-loading="inject-js">
    ;(function () {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const setting = localStorage.getItem('vueuse-color-scheme') || 'auto'
      if (setting === 'dark' || (prefersDark && setting !== 'light'))
        document.documentElement.classList.toggle('dark', true)
    })()
  </script>
  `

  return {
    name: 'vite:inject-app-loading',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => {
        const regex = new RegExp(`<div id="${injectTo}"\\s*></div>`, 'i')
        const replacement = `<div id="${injectTo}">${injectScript}${loadingHtml.replace('[title-placeholder]', title)}</div>`
        if (!regex.test(html))
          return html

        return html.replace(regex, replacement)
      },
    },
  }
}

async function getHtmlTemplate() {
  return await fsp.readFile(join(__dirname, './default-loading.html'), 'utf8')
}
