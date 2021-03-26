import { Types } from 'mongoose'

import { Directory, BasicObject } from '~domains/index.ts'

export interface Tile extends BasicObject {
  collision: boolean
  imageId: Types.ObjectId
}

export interface TilesResponse {
  resources: Tile[]
  directories: Directory[]
}
