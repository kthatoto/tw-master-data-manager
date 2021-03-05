import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'

import imagesHandle from './images/index'

import createDirectory from './createDirectory'
import moveDirectory from './moveDirectory'
import deleteObject from './deleteObject'

const app: Application = express()
app.set('baseDirectory', './data')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req: Request, res: Response, next: Function) => {
  if (req.headers.cypress) {
    app.set('baseDirectory', './testdata')
  } else {
    app.set('baseDirectory', './data')
  }
  next()
})

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
