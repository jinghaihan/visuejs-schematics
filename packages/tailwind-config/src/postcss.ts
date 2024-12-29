import process from 'node:process'
import config from '.'

export default {
  plugins: {
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    'autoprefixer': {},
    'postcss-nested': {},
    'postcss-import': {},
    'postcss-preset-env': {},
    'tailwindcss': { config },
  },
}
