import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import apiHandle from './api/index'

const app: Application = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const productionDatabaseName = 'tw-master'
const cypressDatabaseName = 'tw-master-cypress'
app.use((req: Request, res: Response, next: Function) => {
  const currentDatabaseName = mongoose.connection.db.databaseName
  if (req.headers.cypress && currentDatabaseName === productionDatabaseName) {
    mongoose.disconnect()
    mongoose.connect(`mongodb://root:rootroot@localhost:27017/${cypressDatabaseName}?authSource=admin`)
  } else if (!req.headers.cypress && currentDatabaseName === cypressDatabaseName) {
    // mongoose.disconnect()
    // mongoose.connect(`mongodb://root:rootroot@localhost:27017/${productionDatabaseName}?authSource=admin`)
  }
  next()
})
mongoose.connect(
  `mongodb://root:rootroot@localhost:27017/${productionDatabaseName}?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

apiHandle(app)

export default {
  path: '/api/',
  handler: app
}

import { IImage } from './models/image'
export type ResourceModel = IImage
export type ResourceKey = 'images'
