import express from 'express'
import bodyParser from 'body-parser'

import imagesHandle from './images/index'
import tilesHandle from './tiles/index'
import objectsHandle from './objects/index'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

imagesHandle(app)
tilesHandle(app)
objectsHandle(app)

export default {
  path: '/api/',
  handler: app
}
