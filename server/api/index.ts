import { Application } from 'express'

import createDirectory from './createDirectory'
import moveDirectory from './moveDirectory'
import deleteObject from './deleteObject'

import imagesHandle from './images/index'
import tilesHandle from './tiles/index'

import cypressClean from './cypress/clean'

export default (app: Application) => {
  imagesHandle(app)
  tilesHandle(app)
  createDirectory(app, 'post', '/directories')
  moveDirectory(app, 'patch', '/directories')
  deleteObject(app, 'delete', '/objects')
  cypressClean(app, 'delete', '/cypress/clean')
}

export interface ResponseMessage {
  message: string
  err?: any
}
export type DefaultResponseBody = ResponseMessage | null
