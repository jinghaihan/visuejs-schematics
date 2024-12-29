import { dirname } from 'node:path'
import process from 'node:process'
import { getPackages as getPackagesFunc, getPackagesSync as getPackagesSyncFunc } from '@manypkg/get-packages'
import { findUpSync } from 'find-up'

export function findMonorepoRoot(cwd: string = process.cwd()) {
  const lockFile = findUpSync(
    ['pnpm-lock.yaml', 'yarn.lock', 'package-lock.json'],
    {
      cwd,
      type: 'file',
    },
  )
  return dirname(lockFile || '')
}

export function getPackagesSync() {
  const root = findMonorepoRoot()
  return getPackagesSyncFunc(root)
}

export async function getPackages() {
  const root = findMonorepoRoot()
  return await getPackagesFunc(root)
}

export async function getPackage(pkgName: string) {
  const { packages } = await getPackages()
  return packages.find(pkg => pkg.packageJson.name === pkgName)
}

export type { Package } from '@manypkg/get-packages'
export { type PackageJson, readPackageJSON } from 'pkg-types'
