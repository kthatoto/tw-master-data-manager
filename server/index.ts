import express from 'express'
import bodyParser from 'body-parser'

import imagesHandle from './images/index'

import createDirectory from './createDirectory'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

imagesHandle(app)

createDirectory(app, 'post', '/directories')

export default {
  path: '/api/',
  handler: app
}
