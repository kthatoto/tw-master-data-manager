import { Directory, BasicObject } from '~domains/index'

export interface Image extends BasicObject {
  data: string
}

export interface ImagesResponse {
  resources: Image[]
  directories: Directory[]
  parentDirectory?: Directory[]
}
