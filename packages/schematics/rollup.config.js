import path from 'node:path'
import { fileURLToPath } from 'node:url'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  input: {
    index: 'src/index.ts',
    composables: 'src/composables.ts',
    constants: 'src/constants.ts',
    eslint: 'src/eslint.ts',
    postcss: 'src/postcss.ts',
    styles: 'src/styles.ts',
    tailwind: 'src/tailwind.ts',
    typings: 'src/typings.ts',
    ui: 'src/ui.ts',
    utils: 'src/utils.ts',
    vite: 'src/vite.ts',
  },
  output: [
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].mjs',
    },
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].cjs',
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
  ],
  external: ['vue'],
}
