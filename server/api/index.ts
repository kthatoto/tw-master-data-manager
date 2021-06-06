import { Application } from 'express'

import createDirectory from './createDirectory'
import moveDirectory from './moveDirectory'
import deleteDirectory from './deleteDirectory'
import deleteResource from './deleteResource'

import imagesHandle from './images/index'
import tilesHandle from './tiles/index'
import flagsHandle from './flags/index'

import cypressClean from './cypress/clean'

export default (app: Application) => {
  imagesHandle(app)
  tilesHandle(app)
  flagsHandle(app)
  createDirectory(app, 'post', '/directories')
  moveDirectory(app, 'patch', '/directories')
  deleteDirectory(app, 'delete', '/directories/:id')
  deleteResource(app, 'delete', '/resources/:id')
  cypressClean(app, 'delete', '/cypress/clean')
}

export interface ResponseMessage {
  message: string
  err?: any
}
export type DefaultResponseBody = ResponseMessage | null
