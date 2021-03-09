import { Application, Request, Response } from 'express'

import { ResourceKey, ResourceModel } from '~server/index'
import { ResponseMessage, DefaultResponseBody } from '~server/api/index'
import Image from '../models/image'

export interface MoveDirectoryRequestBody {
  resourceKey: ResourceKey
  path: string
  beforeName: string
  name: string
}

export default (app: Application, method: 'patch', path: string) => {
  app[method](path, async (req: Request<any, any, MoveDirectoryRequestBody>, res: Response<DefaultResponseBody>) => {
    const resourceKey: ResourceKey = req.body.resourceKey
    const path: string = req.body.path
    const beforeName: string = req.body.beforeName
    const name: string = req.body.name

    const Model = {
      images: Image
    }[resourceKey]
    const result: ResourceModel | null = await Model.findOneAndUpdate(
      { path, name: beforeName },
      { $set: { name } }
    )
    if (!result) {
      res.send({ message: `「${path}${beforeName}」が見つかりません` })
      return
    }
    const oldPath: string = `${path}${beforeName}/`
    const newPath: string = `${path}${name}/`
    const children: ResourceModel[] = await Model.find({ path: { $regex: `^${oldPath}` } })
    children.forEach(async (child: ResourceModel) => {
      const newChildPath: string = child.path.replace(oldPath, newPath)
      await Model.findOneAndUpdate(
        { path: child.path, name: child.name },
        { path: newChildPath }
      )
    })
    res.send(null)
  })
}
