import fs from 'fs'
import { Application, Request, Response } from 'express'

import { ResponseMessage, DefaultResponseBody } from '~server/index'

export interface ImagesEditRequestBody {
  beforeFilePath: string
  filePath: string
  raw: string
}

export default (app: Application, method: 'patch', path: string) => {
  app[method](path, async (req: Request<any, any, ImagesEditRequestBody>, res: Response<DefaultResponseBody>) => {
    const beforeFilePath = `${app.get('baseDirectory')}/images${req.body.beforeFilePath}`
    const afterFilePath = `${app.get('baseDirectory')}/images${req.body.filePath}`
    const raw: string = req.body.raw
    try {
      if (!fs.existsSync(beforeFilePath)) {
        return res.send({ message: `「${beforeFilePath}」は存在しません` })
      }
      if (fs.existsSync(afterFilePath)) {
        return res.send({ message: `「${afterFilePath}」は既に存在してます` })
      }
      await fs.promises.rename(beforeFilePath, afterFilePath)
      await fs.promises.writeFile(afterFilePath, raw, 'base64')
      res.send(null)
    } catch (err: any) {
      res.send({ message: '把握していない不具合', err })
    }
  })
}
