import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import apiHandle from './api/index'

import ImageModel, { ImageDocument } from './models/image'
import TileModel, { TileDocument } from './models/tile'
import FlagModel, { FlagDocument } from './models/flag'

const app: Application = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

export const productionDatabaseName = 'tw-master'
export const cypressDatabaseName = 'tw-master-cypress'
app.use(async (req: Request, res: Response, next: Function) => {
  const currentDatabaseName = mongoose.connection.db.databaseName
  if (req.headers.cypress && currentDatabaseName === productionDatabaseName) {
    await mongoose.disconnect()
    await mongoose.connect(
      `mongodb://root:rootroot@localhost:27017/${cypressDatabaseName}?authSource=admin`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
  } else if (!req.headers.cypress && currentDatabaseName === cypressDatabaseName) {
    await mongoose.disconnect()
    await mongoose.connect(
      `mongodb://root:rootroot@localhost:27017/${productionDatabaseName}?authSource=admin`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
  }
  next()
})
mongoose.connect(
  `mongodb://root:rootroot@localhost:27017/${productionDatabaseName}?authSource=admin`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

apiHandle(app)

export default {
  path: '/api/',
  handler: app
}
export type ResourceDocument = ImageDocument | TileDocument | FlagDocument
export type ResourceType = 'images' | 'tiles' | 'flags'
// @ts-ignore
export type ResourceModel = ImageModel | TileModel | FlagModel
export const getModel = (resourceType: ResourceType): ResourceModel => {
  if (resourceType === 'images') return ImageModel
  if (resourceType === 'tiles') return TileModel
  if (resourceType === 'flags') return FlagModel
  throw new Error(`resourceType:${resourceType} is invalid`)
}
