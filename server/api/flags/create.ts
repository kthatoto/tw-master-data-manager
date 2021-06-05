import { Application, Request, Response } from 'express'

import { DefaultResponseBody } from '~server/api/index'
import FlagModel from '../../models/flag'

export interface FlagsCreateRequestBody {
  name: string
  key: string
  description: string
  directoryId?: string
}

export default (app: Application, method: 'post', path: string) => {
  app[method](path, async (req: Request<any, any, FlagsCreateRequestBody>, res: Response<DefaultResponseBody>) => {
    const { name, key, description, directoryId } = req.body

    const already: boolean = await FlagModel.exists({ name, directoryId })
    if (already) {
      res.send({ message: `「${name}」は既に存在してます` })
      return
    }
    const newFlag = new FlagModel({ name, key, description, directoryId })
    await newFlag.save()
    res.send(null)
  })
}
