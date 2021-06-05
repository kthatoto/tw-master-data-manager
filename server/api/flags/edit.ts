import { Application, Request, Response } from 'express'

import { DefaultResponseBody } from '~server/api/index'
import FlagModel from '../../models/flag'

export interface FlagsEditRequestBody {
  id: string
  name: string
  key: string
  description: string
  directoryId?: string
}

export default (app: Application, method: 'patch', path: string) => {
  app[method](path, async (req: Request<any, any, FlagsEditRequestBody>, res: Response<DefaultResponseBody>) => {
    const { id, name, key, description, directoryId } = req.body

    const target: boolean = await FlagModel.exists({ _id: id })
    if (!target) {
      res.send({ message: `flag(id:${id})が見つかりませんでした` })
      return
    }
    await FlagModel.findByIdAndUpdate(id, { $set: { name, key, description, directoryId } })
    res.send(null)
  })
}
