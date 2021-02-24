import { Directory, BasicObject } from '~domains/index.ts'

export const objektCategoryLabels = {
  normal: '通常',
  chest: 'チェスト'
}
export type ObjektCategory = 'normal' | 'chest'

export interface Objekt extends BasicObject {
  collision: boolean
  imagePath: string
  category: ObjektCategory
  chest: 
}

export interface ObjektJson {
  name: string
  collision: boolean
  imagePath: string
  category: ObjektCategory
  chest?: {
    items: {
      itemPath: string
      minAmount: number
      maxAmount: number
    }[]
    respawnDurationSecond: number
  }
}

export interface ObjektsResponse {
  objekts: Objekt[]
  directories: Directory[]
}
