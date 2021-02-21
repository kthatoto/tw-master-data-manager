export interface Directory {
  fullPath: string
  name: string
  isFile: false
}

export interface BasicObject {
  fullPath: string
  name: string
  isFile: true
  size: number
  raw: string | null
}
