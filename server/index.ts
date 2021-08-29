import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import apiHandle from './api/index'

const app: Application = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

export const productionDatabaseName = 'tw-master'
export const cypressDatabaseName = 'tw-master-cypress'

const connectDatabase = async (databaseName: string) => {
  const currentDatabaseName = mongoose.connection.db?.databaseName
  if (currentDatabaseName === databaseName) return
  if (currentDatabaseName) await mongoose.disconnect()
  await mongoose.connect(
    `${process.env.TW_MONGODB_URL}/${databaseName}?authSource=admin`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
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
