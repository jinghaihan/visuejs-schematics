import { random } from 'lodash-es'

export function uid(length: number = 8, specials: string = '') {
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789${specials}`
  return Array.from({ length }).reduce(
    (acc) => {
      return acc + characters.charAt(random(0, characters.length - 1))
    },
    '',
  )
}
