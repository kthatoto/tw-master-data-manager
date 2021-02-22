import { Directory, BasicObject } from '~domains/index.ts'

export type ObjektCategory = 'normal' | 'chest'

export interface Objekt extends BasicObject {
  collision: boolean
  imagePath: string
}

export interface ObjektJson {
  name: string
  collision: boolean
  imagePath: string
}

export interface ObjektsResponse {
  objekts: Objekt[]
  directories: Directory[]
}
