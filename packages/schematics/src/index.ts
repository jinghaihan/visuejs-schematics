import process from 'node:process'
import { cac } from 'cac'
import { consola } from 'consola'
import { defineCleanCommand } from './scripts/clean'
import { defineTurboRunCommand } from './scripts/turbo-run'

try {
  const visue = cac('visue')

  defineCleanCommand(visue)

  defineTurboRunCommand(visue)

  visue.on('command:*', () => {
    consola.error(`Invalid command.`)
    process.exit(1)
  })

  visue.usage('visue')
  visue.help()
  visue.parse()
}
catch (error) {
  consola.error(error)
  process.exit(1)
}
