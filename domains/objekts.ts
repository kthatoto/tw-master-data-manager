import { Directory } from '~domains/index.ts'

export type ObjektType = 'normal' | 'chest'

export interface Objekt {
  fullPath: string
  name: string
  collision: boolean
  imagePath: string
  isFile: true
  size: number
  raw: string | null
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
