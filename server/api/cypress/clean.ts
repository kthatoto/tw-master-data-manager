import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { cypressDatabaseName } from '~server/index'

export default (app: Application, method: 'delete', path: string) => {
  app[method](path, async (req: Request, res: Response) => {
    const currentDatabaseName = mongoose.connection.db.databaseName
    if (currentDatabaseName === cypressDatabaseName) {
      mongoose.connection.db.dropDatabase()
    }
    res.send(null)
  })
}
