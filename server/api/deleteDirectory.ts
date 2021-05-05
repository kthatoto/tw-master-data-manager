import { Application, Request, Response } from 'express'

import { ResourceType, getModel, ResourceModel, ResourceDocument } from '~server/index'
import { DefaultResponseBody } from '~server/api/index'
import DirectoryModel, { DirectoryDocument } from '~server/models/directory'

export default (app: Application, method: 'delete', path: string) => {
  app[method](path, async (req: Request, res: Response<DefaultResponseBody>) => {
    const id = req.params.id as string

    const doc: DirectoryDocument | null = await DirectoryModel.findById(id)
    if (!doc) {
      res.send({ message: `ディレクトリ(id:${id})が見つかりませんでした` })
      return
    }

    const childrenDirectories: DirectoryDocument[] = await DirectoryModel.find({ directoryId: id })
    const Model: ResourceModel = getModel(doc.resourceType)
    const childrenResources: ResourceDocument[] = await Model.find({ directoryId: id })

    let result: boolean = true
    let message: string = ''
    if (childrenDirectories.length + childrenResources.length === 0) {
      await doc.remove()
    } else {
      result = false
      message = `ディレクトリ(id:${id})の中は空じゃないので消せません`
    }

    if (result) {
      res.send(null)
    } else {
      res.send({ message })
    }
  })
}
