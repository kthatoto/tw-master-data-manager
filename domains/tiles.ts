import { Directory } from '~domains/index.ts'

export interface Tile {
  fullPath: string
  name: string
  collision: boolean
  imagePath: string
  isFile: true
  size: number
  raw: string | null
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
