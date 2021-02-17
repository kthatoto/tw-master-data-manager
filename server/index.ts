import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'

import imagesHandle from './images/index'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

imagesHandle(app)

export default {
  path: '/api/',
  handler: app
}
