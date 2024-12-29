import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export function defineConfig(
  options: OptionsConfig & Omit<TypedFlatConfigItem, 'files'> = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  return antfu(
    {
      vue: true,
      typescript: true,
      ...options,
    },
    ...tailwind.configs['flat/recommended'],
    {
      rules: {
        'tailwindcss/no-custom-classname': 'off',
      },
    },
    ...userConfigs,
  )
}
