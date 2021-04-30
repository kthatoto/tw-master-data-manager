import { Application, Request, Response } from 'express'

import { ResourceKey, ResourceModel, ResourceDocumentModel } from '~server/index'
import { DefaultResponseBody } from '~server/api/index'
import Image from '../models/image'
import Tile from '../models/tile'

export interface MoveDirectoryRequestBody {
  resourceKey: ResourceKey
  path: string
  id: string
  beforeName: string
  name: string
}

export default (app: Application, method: 'patch', path: string) => {
  app[method](path, async (req: Request<any, any, MoveDirectoryRequestBody>, res: Response<DefaultResponseBody>) => {
    const { resourceKey, path, id, beforeName, name } = req.body

    const Model: ResourceDocumentModel = {
      images: Image,
      tiles: Tile
    }[resourceKey]
    const already: boolean = await Model.exists({ path, name })
    if (already) {
      res.send({ message: `「${path}${name}/」は既に存在してます` })
      return
    }
    const result: ResourceModel | null = await Model.findByIdAndUpdate(id, { $set: { name } })
    if (!result) {
      res.send({ message: `「${path}${beforeName}」が見つかりません` })
      return
    }
    const oldPath: string = `${path}${beforeName}/`
    const newPath: string = `${path}${name}/`
    const children: ResourceModel[] = await Model.find({ path: { $regex: `^${oldPath}` } })
    children.forEach(async (child: ResourceModel) => {
      const newChildPath: string = child.path.replace(oldPath, newPath)
      await Model.findByIdAndUpdate(child.id, { path: newChildPath })
    })
    res.send(null)
  })
}
