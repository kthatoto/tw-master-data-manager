import { Directory, BasicObject } from '~domains/index.ts'

export type ItemCategory = 'supplies' | 'materials' | 'equipments'
export type ItemSubCategory =
  'aaa' |
  'bbb'

export interface Item extends BasicObject {
  imagePath: string
  isFile: true
  category: ItemCategory
  subCategory: ItemSubCategory
}

export interface ItemJson {
  name: string
  collision: boolean
  imagePath: string
}

export interface ItemsResponse {
  Items: Item[]
  directories: Directory[]
}
