import type { PluginOption } from 'vite'
import type { ApplicationPluginOptions, CommonPluginOptions, ConditionPlugin, LibraryPluginOptions } from '../typings'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer as Visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Dts from 'vite-plugin-dts'
import { createHtmlPlugin as Html } from 'vite-plugin-html'
import { libInjectCss as LibInjectCss } from 'vite-plugin-lib-inject-css'
import Devtools from 'vite-plugin-vue-devtools'
import { LodashAutoImports, UnheadAutoImports, VueRouterAutoImports } from './auto-import'
import { viteInjectAppLoadingPlugin as InjectAppLoading } from './inject-app-loading'

export async function loadConditionPlugins(conditionPlugins: ConditionPlugin[]) {
  const plugins: PluginOption[] = []
  for (const conditionPlugin of conditionPlugins) {
    if (conditionPlugin.condition) {
      const realPlugins = await conditionPlugin.plugins()
      plugins.push(...realPlugins)
    }
  }
  return plugins.flat()
}

export async function loadCommonPlugins(options: CommonPluginOptions): Promise<ConditionPlugin[]> {
  const { isBuild, visualizer } = options
  return [
    {
      condition: true,
      plugins: () => [
        Vue(),
        VueJsx(),
      ],
    },
    {
      condition: isBuild && !!visualizer,
      plugins: () => [
        Visualizer(
          typeof visualizer === 'boolean'
            ? {
                filename: './node_modules/.cache/visualizer/stats.html',
                gzipSize: true,
                open: true,
              }
            : visualizer,
        ),
      ],
    },
  ]
}

export async function loadLibraryPlugins(options: LibraryPluginOptions): Promise<PluginOption[]> {
  const isBuild = options.isBuild
  const { dts, injectLibCss, ...commonOptions } = options
  const commonPlugins = await loadCommonPlugins(commonOptions)
  return await loadConditionPlugins([
    {
      condition: isBuild && !!dts,
      plugins: () => [
        Dts(
          typeof dts === 'boolean'
            ? {
                logLevel: 'error',
              }
            : dts,
        ),
      ],
    },
    {
      condition: injectLibCss,
      plugins: () => [
        LibInjectCss(),
      ],
    },
    ...commonPlugins,
  ])
}

export async function loadApplicationPlugins(options: ApplicationPluginOptions): Promise<PluginOption[]> {
  const isBuild = options.isBuild
  const {
    devtools,
    i18n,
    injectAppLoading,
    autoImport,
    router,
    component,
    ...commonOptions
  } = options
  const commonPlugins = await loadCommonPlugins(commonOptions)
  return await loadConditionPlugins([
    {
      condition: !isBuild && !!devtools,
      plugins: () => [
        Devtools(
          typeof devtools === 'boolean'
            ? undefined
            : devtools,
        ),
      ],
    },
    {
      condition: true,
      plugins: () => [
        Html({
          minify: true,
        }),
      ],
    },
    {
      condition: !!i18n,
      plugins: async () => [
        VueI18n(
          typeof i18n === 'boolean'
            ? {
                compositionOnly: true,
                fullInstall: true,
                runtimeOnly: true,
              }
            : i18n,
        ) as PluginOption,
      ],
    },
    {
      condition: !!injectAppLoading,
      plugins: async () => [
        await InjectAppLoading(
          typeof injectAppLoading === 'boolean'
            ? undefined
            : injectAppLoading,
        ),
      ],
    },
    {
      condition: !!autoImport,
      plugins: () => [
        AutoImport(
          typeof autoImport === 'boolean'
            ? {
                imports: [
                  'vue',
                  'vue-i18n',
                  '@vueuse/core',
                  VueRouterAutoImports,
                  UnheadAutoImports,
                  LodashAutoImports(),
                ],
                dts: 'src/typings/auto-imports.d.ts',
                dirs: [
                  'src/composables',
                  'src/hooks',
                  'src/stores',
                  'src/utils',
                ],
                vueTemplate: true,
              }
            : autoImport,
        ),
      ],
    },
    {
      condition: !!router,
      plugins: () => [
        VueRouter(
          typeof router === 'boolean'
            ? {
                dts: 'src/typings/typed-router.d.ts',
              }
            : router,
        ),
      ],
    },
    {
      condition: !!component,
      plugins: () => [
        VueComponents(
          typeof component === 'boolean'
            ? {
                deep: false,
                dts: 'src/typings/components.d.ts',
              }
            : component,
        ),
      ],
    },
    ...commonPlugins,
  ])
}
