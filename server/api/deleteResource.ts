import { Application, Request, Response } from 'express'

import { ResourceType, getModel, ResourceModel, ResourceDocument } from '~server/index'
import { DefaultResponseBody } from '~server/api/index'

export default (app: Application, method: 'delete', path: string) => {
  app[method](path, async (req: Request, res: Response<DefaultResponseBody>) => {
    const id = req.query.id as string
    const resourceType = req.query.id as ResourceType

    const Model: ResourceModel = getModel(resourceType)
    const doc: ResourceDocument | null = await Model.findById(id)
    if (!doc) {
      res.send({ message: `リソース(id:${id})が見つかりませんでした` })
      return
    }

    await doc.remove()
    res.send(null)
  })
}
