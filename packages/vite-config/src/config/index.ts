import type { DefineConfig } from '../typings'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { defineApplicationConfig } from './application'
import { defineLibraryConfig } from './library'

export function defineConfig(
  userConfigPromise?: DefineConfig,
  type: 'application' | 'library' | 'auto' = 'auto',
) {
  if (type === 'auto') {
    const htmlPath = join(process.cwd(), 'index.html')
    type = existsSync(htmlPath) ? 'application' : 'library'
  }

  switch (type) {
    case 'application':
      return defineApplicationConfig(userConfigPromise)
    case 'library':
      return defineLibraryConfig(userConfigPromise)
    default:
      throw new Error(`Unsupported project type: ${type}`)
  }
}
