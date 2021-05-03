import { Directory, BasicObject } from '~domains/index.ts'

export interface Tile extends BasicObject {
  collision: boolean
  imageId: string
  image: {
    path: string
    name: string
    data: string
  }
}

export interface TilesResponse {
  resources: Tile[]
  directories: Directory[]
}
