import { Directory, BasicObject } from '~domains/index.ts'

export interface Tile extends BasicObject {
  imageData: {
    [imageId: string]: { name: string, data: string }
  }
  images: {
    x: number
    y: number
    id: string
    collision: boolean
  }[]
}

export interface TilesResponse {
  resources: Tile[]
  directories: Directory[]
}
