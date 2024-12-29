import type { PackageJson } from '@visuejs/toolkit'
import type { CAC } from 'cac'
import process from 'node:process'
import { cancel, isCancel, select } from '@clack/prompts'
import { getPackages } from '@visuejs/toolkit'
import { consola } from 'consola'
import { execaCommand } from 'execa'

interface TurboRunOptions {
  command?: string
}

export async function turboRun(options: TurboRunOptions) {
  const { command } = options
  if (!command) {
    consola.error(`Please enter the command to run.`)
    process.exit(1)
  }
  const { packages } = await getPackages()
  const selectPkgs = packages.filter(pkg => (pkg?.packageJson as PackageJson)?.scripts?.[command])

  let selectPkg: string | symbol
  if (selectPkgs.length > 1) {
    selectPkg = await select({
      message: `Select the app you need to run [${command}]:`,
      options: selectPkgs.map(item => ({
        label: item?.packageJson.name,
        value: item?.packageJson.name,
      })),
    })
  }
  else {
    selectPkg = selectPkgs[0]?.packageJson?.name ?? ''
  }

  if (isCancel(selectPkg) || !selectPkg) {
    cancel('👋 Has cancelled')
    process.exit(0)
  }

  if (!selectPkg) {
    consola.error(`No app found.`)
    process.exit(1)
  }

  execaCommand(`pnpm --filter=${selectPkg} run ${command}`, {
    stdio: 'inherit',
  })
}

export function defineTurboRunCommand(cac: CAC) {
  cac
    .command('[script]')
    .usage(`Run turbo interactively.`)
    .action(async (command: string) => {
      turboRun({ command })
    })
}
