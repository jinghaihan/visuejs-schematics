import type { Component } from 'vue'
import type {
  BuiltinRadiusesType,
  ColorSchemaType,
  PageTransitionType,
  Preference,
  SupportedLanguageType,
} from '../typings'
import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-vue-next'
import { isMacOs } from '../utils'

export const DEFAULT_PREFERENCE: Preference = {
  platform: isMacOs() ? 'macos' : 'windows',
  colorSchema: 'auto',
  primaryColor: '#006BE6FF',
  radius: 0.5,
  pageTransition: 'fade',
  lang: 'en',
}

export const COLOR_SCHEMA_OPTIONS: { icon: Component, type: ColorSchemaType }[] = [
  { icon: SunIcon, type: 'light' },
  { icon: MoonIcon, type: 'dark' },
  { icon: SunMoonIcon, type: 'auto' },
]
export const BUILTIN_RADIUS_OPTIONS: BuiltinRadiusesType[] = [0, 0.3, 0.5, 0.75, 1]

export const PAGE_TRANSITION_OPTIONS: PageTransitionType[] = ['fade', 'fade-slide', 'fade-up', 'fade-down']

export const SUPPORTED_LANGUAGE_OPTIONS: { label: string, value: SupportedLanguageType }[] = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en' },
]
