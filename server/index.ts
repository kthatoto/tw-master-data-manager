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

const { TW_MONGODB_USER, TW_MONGODB_PASSWORD, TW_MONGODB_HOST, TW_MONGODB_PORT } = process.env
const DATABASE_URL = `mongodb://${TW_MONGODB_USER}:${TW_MONGODB_PASSWORD}@${TW_MONGODB_HOST}:${TW_MONGODB_PORT}`
const connectDatabase = async (databaseName: string) => {
  const currentDatabaseName = mongoose.connection.db?.databaseName
  if (currentDatabaseName === databaseName) return
  if (currentDatabaseName) await mongoose.disconnect()
  await mongoose.connect(
    `${DATABASE_URL}/${databaseName}?authSource=admin`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
}

app.use(async (req: Request, res: Response, next: Function) => {
  const databaseName = req.headers.cypress ? cypressDatabaseName : productionDatabaseName
  await connectDatabase(databaseName)
  next()
})
connectDatabase(productionDatabaseName)

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
