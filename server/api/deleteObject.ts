import { Application, Request, Response } from 'express'

import { ResourceKey, ResourceModel } from '~server/index'
import { ResponseMessage, DefaultResponseBody } from '~server/api/index'
import Image from '../models/image'

export default (app: Application, method: 'delete', path: string) => {
  app[method](path, async (req: Request, res: Response<DefaultResponseBody>) => {
    const resourceKey: ResourceKey = req.query.resourceKey as ResourceKey
    const path = req.query.path
    const name = req.query.name

    const Model = {
      images: Image
    }[resourceKey]
    const doc: ResourceModel | null = await Model.findOne({ path, name })
    if (!doc) {
      res.send({ message: `「${path}${name}」はありません` })
      return
    }

    let result: boolean
    let message: string = ''
    if (doc.objectType === 'file') {
      result = await doc.remove()
      if (!result) message = '削除に失敗しました'
    } else if (doc.objectType === 'directory') {
      const docs: ResourceModel[] = await Model.find({ path: `${path}${name}/` })
      if (docs.length === 0) {
        result = await doc.remove()
        if (!result) message = '削除に失敗しました'
      } else {
        result = false
        message = `「${path}${name}/」の中は空じゃないので消せません`
      }
    }

    if (result) {
      res.send(null)
    } else {
      res.send({ message })
    }
  })
}
