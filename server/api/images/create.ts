import fs from 'fs'
import { Application, Request, Response } from 'express'

import { ResponseMessage, DefaultResponseBody } from '~server/index'

export interface ImagesCreateRequestBody {
  filePath: string
  raw: string
}

export default (app: Application, method: 'post', path: string) => {
  app[method](path, async (req: Request<any, any, ImagesCreateRequestBody>, res: Response<DefaultResponseBody>) => {
    const filePath: string = req.body.filePath
    const fullFilePath: string = `${app.get('baseDirectory')}/images${filePath}`
    const raw: string = req.body.raw

    try {
      if (fs.existsSync(fullFilePath)) {
        return res.send({ message: `「${filePath}」は既に存在してます` })
      }
      await fs.promises.writeFile(fullFilePath, raw, 'base64')
      res.send(null)
    } catch (err: any) {
      res.send({ message: '把握していない不具合', err })
    }
  })
}
