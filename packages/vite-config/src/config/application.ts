import type { UserConfig } from 'vite'
import type { DefineApplicationOptions } from '../typings'
import { defineConfig, mergeConfig } from 'vite'
import { loadApplicationPlugins } from '../plugins'
import { getCommonConfig } from './common'

export function defineApplicationConfig(userConfigPromise?: DefineApplicationOptions) {
  return defineConfig(async (config) => {
    const options = await userConfigPromise?.(config)
    const { command } = config
    const { application = {}, vite = {} } = options || {}
    const isBuild = command === 'build'

    const plugins = await loadApplicationPlugins({
      isBuild,
      devtools: false,
      i18n: true,
      injectAppLoading: true,
      autoImport: true,
      router: true,
      component: true,
      ...application,
    })

    const applicationConfig: UserConfig = {
      build: {
        target: 'es2015',
        rollupOptions: {
          output: {
            assetFileNames: '[ext]/[name]-[hash].[ext]',
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'jse/index-[name]-[hash].js',
          },
        },
      },
      esbuild: {
        drop: isBuild
          ? [
              // 'console',
              'debugger',
            ]
          : [],
        legalComments: 'none',
      },
      server: {
        host: true,
        warmup: {
          clientFiles: ['index.html'],
        },
      },
      plugins,
    }
    const commonConfig = await getCommonConfig()
    const mergedConmonConfig = mergeConfig(commonConfig, applicationConfig)
    return mergeConfig(mergedConmonConfig, vite)
  })
}
