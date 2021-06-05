import { Directory, BasicObject } from '~/domains/index.ts'

export interface Flag extends BasicObject {
  key: string
  description: string
}

export interface FlagsResponse {
  resources: Flag[]
  directories: Directory[]
}
