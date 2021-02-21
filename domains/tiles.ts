import { Directory, BasicObject } from '~domains/index.ts'

export interface Tile extends BasicObject {
  collision: boolean
  imagePath: string
}

export interface TileJson {
  name: string
  collision: boolean
  imagePath: string
}

export interface TilesResponse {
  tiles: Tile[]
  directories: Directory[]
}
