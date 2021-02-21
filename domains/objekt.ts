import { Directory } from '~domains/index.ts'

export interface Objekt {
  fullPath: string
  name: string
  collision: boolean
  imagePath: string
  isFile: true
  size: number
  raw: string
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
