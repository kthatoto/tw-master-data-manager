import express from 'express'
import bodyParser from 'body-parser'

import imagesHandle from './images/index'
import tilesHandle from './tiles/index'
import objektsHandle from './objekts/index'
import itemsHandle from './items/index'

import createDirectory from './createDirectory'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

imagesHandle(app)
tilesHandle(app)
objektsHandle(app)
itemsHandle(app)

createDirectory(app, 'post', '/directories')

export default {
  path: '/api/',
  handler: app
}
