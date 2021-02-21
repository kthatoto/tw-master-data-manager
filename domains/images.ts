import { Directory } from '~domains/index.ts'

export interface Image {
  fullPath: string
  name: string
  isFile: true
  size: number
  raw: string
}

export interface ImagesResponse {
  images: Image[]
  directories: Directory[]
}
