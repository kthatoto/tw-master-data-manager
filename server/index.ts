import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'

import imagesHandle from './images/index'
import tilesHandle from './tiles/index'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

imagesHandle(app)
tilesHandle(app)

export default {
  path: '/api/',
  handler: app
}
