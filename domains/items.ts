import { Directory, BasicObject, Value } from '~domains/index.ts'

export type ItemCategory = 'supplies' | 'materials' | 'equipments'
export const itemSubCategoryLabels = {
  'potions.healhp': 'HP回復薬',
  'potions.healmp': 'MP回復薬',
  'buff.maxhp': 'MaxHP一時上昇',
  'buff.maxmp': 'MaxMP一時上昇',
  'buff.atk': 'ATK一時上昇',
  'buff.def': 'DEF',
  'buff.agility': 'Agility',
  'buff.accuracy': 'Accuracy',
  'buff.luck': 'Luck',
  'buff.exp': '獲得経験値UP',
  'materials': '素材'
}
export type ItemSubCategory =
  'potions.healhp' |
  'potions.healmp' |
  'buff.maxhp' |
  'buff.maxmp' |
  'buff.atk' |
  'buff.def' |
  'buff.agility' |
  'buff.accuracy' |
  'buff.luck' |
  'buff.exp' |
  'materials'

export type ItemEffectKey = 'amount' | 'amountType' | 'durationSecond'
export const itemsSubCategoryRequiredEffectKeys: { [key in ItemSubCategory]: ItemEffectKey[] } = {
  'potions.healhp': ['amount', 'amountType'],
  'potions.healmp': ['amount', 'amountType'],
  'buff.maxhp': ['amount', 'amountType', 'durationSecond'],
  'buff.maxmp': ['amount', 'amountType', 'durationSecond'],
  'buff.atk': ['amount', 'amountType', 'durationSecond'],
  'buff.def': ['amount', 'amountType', 'durationSecond'],
  'buff.agility': ['amount', 'amountType', 'durationSecond'],
  'buff.accuracy': ['amount', 'amountType', 'durationSecond'],
  'buff.luck': ['amount', 'amountType', 'durationSecond'],
  'buff.exp': ['amount', 'amountType', 'durationSecond'],
  'materials': []
}

export const itemEffectAmountTypes = ['absolute', 'percentage']
export interface ItemEffect {
  amount?: number
  amountType?: 'absolute' | 'percentage'
  durationSecond?: number
}
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
  imagePath: string
  category: ItemCategory
  subCategory: ItemSubCategory
  value: Value
  effect: ItemEffect
}

export interface ItemsResponse {
  items: Item[]
  directories: Directory[]
}
