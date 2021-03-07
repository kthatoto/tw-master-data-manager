import fs from 'fs'
import { Application, Request, Response } from 'express'

import { ResponseMessage, DefaultResponseBody } from '~server/index'

export interface CreateDirectoryRequestBody {
  directory: string
  name: string
}

export default (app: any, method: 'post', path: string) => {
  app[method]('/directories', async (req: Request<any, any, CreateDirectoryRequestBody>, res: Response<DefaultResponseBody>) => {
    const directory: string = req.body.directory
    const name: string = req.body.name
    try {
      const filePath: string = `${app.get('baseDirectory')}/${directory}${name}`
      await fs.promises.mkdir(filePath)
      res.send(null)
    } catch (err: any) {
      if (err.code === 'EEXIST') {
        res.send({ message: `「${name}」は既に存在してます` })
      } else {
        res.send({ message: '把握していない不具合', err })
      }
    }
  })
}
