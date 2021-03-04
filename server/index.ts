import express, { Application } from 'express'
import bodyParser from 'body-parser'

import imagesHandle from './images/index'

import createDirectory from './createDirectory'
import moveDirectory from './moveDirectory'
import deleteObject from './deleteObject'

const app: Application = express()
app.set('baseDirectory', './data')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

imagesHandle(app)

createDirectory(app, 'post', '/directories')
moveDirectory(app, 'patch', '/directories')
deleteObject(app, 'delete', '/objects')

export default {
  path: '/api/',
  handler: app
}

export interface ResponseMessage {
  message: string
  err?: any
}
export type DefaultResponseBody = ResponseMessage | null
