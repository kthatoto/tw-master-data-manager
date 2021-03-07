import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import apiHandle from './api/index'

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
mongoose.connect(
  'mongodb://root:rootroot@localhost:27017/tw-master?authSource=admin',
  { useNewUrlParser: true }
)

apiHandle(app)

export default {
  path: '/api/',
  handler: app
}

export interface ResponseMessage {
  message: string
  err?: any
}
export type DefaultResponseBody = ResponseMessage | null
