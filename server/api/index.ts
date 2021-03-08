import { Application } from 'express'

import imagesHandle from './images/index'

import createDirectory from './createDirectory'
import moveDirectory from './moveDirectory'
import deleteObject from './deleteObject'

export default (app: Application) => {
  imagesHandle(app)
  createDirectory(app, 'post', '/directories')
  moveDirectory(app, 'patch', '/directories')
  deleteObject(app, 'delete', '/objects')
}

export interface ResponseMessage {
  message: string
  err?: any
}
export type DefaultResponseBody = ResponseMessage | null
export type ResourceKey = 'images' | 'tiles'
