import type { UserConfig } from 'vite'
import type { DefineLibraryOptions } from '../typings'
import process from 'node:process'
import { readPackageJSON } from '@visuejs/toolkit'
import { defineConfig, mergeConfig } from 'vite'
import { loadLibraryPlugins } from '../plugins'
import { getCommonConfig } from './common'

export function defineLibraryConfig(userConfigPromise?: DefineLibraryOptions) {
  return defineConfig(async (config) => {
    const options = await userConfigPromise?.(config)
    const { command } = config
    const { library = {}, vite = {} } = options || {}
    const root = process.cwd()
    const isBuild = command === 'build'

    const plugins = await loadLibraryPlugins({
      isBuild,
      dts: true,
      injectLibCss: false,
      ...library,
    })

    const { dependencies = {}, peerDependencies = {} } = await readPackageJSON(root)
    const externalPackages = [
      ...Object.keys(dependencies),
      ...Object.keys(peerDependencies),
    ]

    const packageConfig: UserConfig = {
      build: {
        lib: {
          entry: 'src/index.ts',
          fileName: () => 'index.mjs',
          formats: ['es'],
        },
        rollupOptions: {
          external: (id) => {
            return externalPackages.some(
              pkg => id === pkg || id.startsWith(`${pkg}/`),
            )
          },
        },
      },
      plugins,
    }
    const commonConfig = await getCommonConfig()
    const mergedConmonConfig = mergeConfig(commonConfig, packageConfig)
    return mergeConfig(mergedConmonConfig, vite)
  })
}
