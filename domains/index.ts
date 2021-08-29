import ImageModel, { ImageDocument } from '../server/models/image'
import TileModel, { TileDocument } from '../server/models/tile'
import FlagModel, { FlagDocument } from '../server/models/flag'

export type ResourceDocument = ImageDocument | TileDocument | FlagDocument
export type ResourceType = 'images' | 'tiles' | 'flags'
// @ts-ignore
export type ResourceModel = ImageModel | TileModel | FlagModel
export const getModel = (resourceType: ResourceType): ResourceModel => {
  if (resourceType === 'images') return ImageModel
  if (resourceType === 'tiles') return TileModel
  if (resourceType === 'flags') return FlagModel
  throw new Error(`resourceType:${resourceType} is invalid`)
}

export interface BasicObject {
  id: string
  name: string
}

export interface Directory extends BasicObject {}

export interface ImageChip {
  x: number
  y: number
  id: string
  collision: boolean
}

export const valueCurrencies = ['gold']
export type Currency = 'gold'
export interface Value {
  currency: Currency
  amount: number
}
