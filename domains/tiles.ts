import { Directory, BasicObject, ImageChip } from '~domains/index'

export interface Tile extends BasicObject {
  imageData: {
    [imageId: string]: { name: string, data: string }
  }
  images: ImageChip[]
}

export interface TilesResponse {
  resources: Tile[]
  directories: Directory[]
  parentDirectory?: Directory[]
}
