import { Application, Request, Response } from 'express'

import { ResourceKey, ResourceModel, ResourceDocumentModel } from '~server/index'
import { DefaultResponseBody } from '~server/api/index'
import Image from '../models/image'
import Tile from '../models/tile'

export default (app: Application, method: 'delete', path: string) => {
  app[method](path, async (req: Request, res: Response<DefaultResponseBody>) => {
    const resourceKey: ResourceKey = req.query.resourceKey as ResourceKey
    const id = req.query.id as string
    const path = req.query.path as string
    const name = req.query.name as string

    const Model: ResourceDocumentModel = {
      images: Image,
      tiles: Tile,
    }[resourceKey]
    const doc: ResourceModel | null = await Model.findById(id)
    if (!doc) {
      res.send({ message: `「${path}${name}」はありません` })
      return
    }

    let result: boolean = true
    let message: string = ''
    if (doc.objectType === 'file') {
      await doc.remove()
    } else if (doc.objectType === 'directory') {
      const docs: ResourceModel[] = await Model.find({ path: `${path}${name}/` })
      if (docs.length === 0) {
        await doc.remove()
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
