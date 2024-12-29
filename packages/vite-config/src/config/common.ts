import type { UserConfig } from 'vite'
import { resolve } from 'node:path'
import process from 'node:process'

export async function getCommonConfig(): Promise<UserConfig> {
  return {
    resolve: {
      alias: {
        '@': resolve(process.cwd(), './src'),
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
      sourcemap: false,
    },
  }
}
