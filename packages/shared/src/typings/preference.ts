import type { BasicColorSchema } from '@vueuse/core'

export interface Preference {
  platform: PlatformType
  colorSchema: ColorSchemaType
  primaryColor: string
  radius: BuiltinRadiusesType
  pageTransition: PageTransitionType
  lang: SupportedLanguageType
}

export type PlatformType = 'macos' | 'windows'

export type ColorSchemaType = BasicColorSchema

export type BuiltinRadiusesType = 0 | 0.3 | 0.5 | 0.75 | 1

export type PageTransitionType = 'fade' | 'fade-slide' | 'fade-up' | 'fade-down'

export type SupportedLanguageType = 'en' | 'zh-CN'
