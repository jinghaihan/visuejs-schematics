import type { PluginOptions as I18nOptions } from '@intlify/unplugin-vue-i18n'
import type { PluginVisualizerOptions as VisualizerOptions } from 'rollup-plugin-visualizer'
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types'
import type { Options as ComponentOptions } from 'unplugin-vue-components'
import type { Options as RouterOptions } from 'unplugin-vue-router'
import type { ConfigEnv, PluginOption, UserConfig } from 'vite'
import type { PluginOptions as DtsOptions } from 'vite-plugin-dts'
import type { VitePluginVueDevToolsOptions as DevtoolsOptions } from 'vite-plugin-vue-devtools'

export interface ApplicationPluginOptions extends CommonPluginOptions {
  devtools?: boolean | DevtoolsOptions
  i18n?: boolean | I18nOptions
  autoImport?: boolean | AutoImportOptions
  router?: boolean | RouterOptions
  component?: boolean | ComponentOptions
  injectAppLoading?: boolean | InjectAppLoadingOptions
}

export interface LibraryPluginOptions extends CommonPluginOptions {
  dts?: boolean | DtsOptions
  injectLibCss?: boolean
}

export type DefineApplicationOptions = (config?: ConfigEnv) => Promise<{
  application?: ApplicationPluginOptions
  vite?: UserConfig
}>

export type DefineLibraryOptions = (config?: ConfigEnv) => Promise<{
  library?: LibraryPluginOptions
  vite?: UserConfig
}>

export type DefineConfig = DefineApplicationOptions | DefineLibraryOptions

export interface InjectAppLoadingOptions {
  injectTo?: string
  title?: string
  template?: string
}

export interface ConditionPlugin {
  condition?: boolean
  plugins: () => PluginOption[] | PromiseLike<PluginOption[]>
}

export interface CommonPluginOptions {
  isBuild?: boolean
  visualizer?: boolean | VisualizerOptions
}
