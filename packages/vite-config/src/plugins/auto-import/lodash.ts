import { resolveModule } from '@visuejs/toolkit'
import * as lodash from 'lodash-es'

export function LodashAutoImports() {
  const excluded = [
    'commit',
    'default',
    'lodash',
    'next',
    'templateSettings',
    'thru',
    'toIterator',
    'toJSON',
    'value',
    'valueOf',
    'VERSION',
    'wrapperAt',
    'wrapperChain',
    'wrapperCommit',
    'wrapperLodash',
    'wrapperNext',
    'wrapperPlant',
    'wrapperReverse',
    'wrapperToIterator',
    'wrapperValue',
  ]
  return {
    from: resolveModule('lodash-es') || 'lodash-es',
    imports: Object.keys(lodash).filter(key => !excluded.includes(key)),
  }
}
