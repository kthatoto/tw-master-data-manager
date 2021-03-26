import { Directory, BasicObject } from '~domains/index.ts'

export interface Image extends BasicObject {
  data?: string
}

export interface ImagesResponse {
  resources: Image[]
  directories: Directory[]
}
