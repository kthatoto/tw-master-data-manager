import { Directory, BasicObject, Value } from '~domains/index.ts'

export interface Item extends BasicObject {
  imagePath: string
  isFile: true
  category: ItemCategory
  subCategory: ItemSubCategory
  value: Value
  effect: ItemEffect
}

export interface ItemJson {
  name: string
  collision: boolean
  imagePath: string
  category: string
  subCategory: string
  value: Value
  effect: ItemEffect
}

export interface ItemsResponse {
  Items: Item[]
  directories: Directory[]
}

export type ItemCategory = 'supplies' | 'materials' | 'equipments'
export const itemSubCategoryLabels = {
  'potions.healhp': 'HP回復薬',
  'potions.healmp': 'MP回復薬',
  'buff.maxhp':     'MaxHP一時上昇',
  'buff.maxmp':     'MaxMP一時上昇',
  'buff.atk':       'ATK一時上昇',
  'buff.def':       'DEF',
  'buff.agility':   'Agility',
  'buff.accuracy':  'Accuracy',
  'buff.luck':      'Luck',
  'buff.exp':       '獲得経験値UP',
  'materials':      '素材'
}
export const itemsSubCategoryRequiredEffectKeys = {
  'potions.healhp': ['amount', 'amountType'],
  'potions.healmp': ['amount', 'amountType'],
  'buff.maxhp':     ['amount', 'amountType', 'durationSecond'],
  'buff.maxmp':     ['amount', 'amountType', 'durationSecond'],
  'buff.atk':       ['amount', 'amountType', 'durationSecond'],
  'buff.def':       ['amount', 'amountType', 'durationSecond'],
  'buff.agility':   ['amount', 'amountType', 'durationSecond'],
  'buff.accuracy':  ['amount', 'amountType', 'durationSecond'],
  'buff.luck':      ['amount', 'amountType', 'durationSecond'],
  'buff.exp':       ['amount', 'amountType', 'durationSecond'],
  'materials':      []
}
export type ItemSubCategory = string

export interface ItemEffect {
  amount?: number
  amountType?: 'absolute' | 'percentage'
  durationSecond?: number
}
