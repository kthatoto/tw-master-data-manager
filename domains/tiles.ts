import { Directory, BasicObject } from '~domains/index.ts'

export interface Tile extends BasicObject {
  collision: boolean
  imageData: { [imageKey: string]: string }
  images: {
    [x: number]: {
      [y: number]: {
        path: string
        name: string
        imageKey: string
      }
    }
  }
}

export interface TilesResponse {
  resources: Tile[]
  directories: Directory[]
}
