import { Directory, BasicObject } from '~domains/index.ts'

export interface Tile extends BasicObject {
  collision?: boolean
  imageId?: string
}

export interface TilesResponse {
  resources: Tile[]
  directories: Directory[]
}
