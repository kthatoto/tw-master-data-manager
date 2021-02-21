import { Directory, BasicObject } from '~domains/index.ts'

export interface Image extends BasicObject

export interface ImagesResponse {
  images: Image[]
  directories: Directory[]
}
