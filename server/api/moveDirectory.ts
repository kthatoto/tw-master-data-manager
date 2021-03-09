import { Application, Request, Response } from 'express'

import { ResponseMessage, DefaultResponseBody, ResourceKey } from '~server/api/index'
import Image, { IImage } from '../models/image'

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

    const result: IImage | null = await Image.findOneAndUpdate(
      { path, name: beforeName },
      { $set: { name } }
    )
    if (!result) {
      res.send({ message: `「${path}${beforeName}」が見つかりません` })
      return
    }
    const children: IImage[] = await Image.find({ path: { $regex: `^${path}${beforeName}/` } })
    children.forEach(async (child: IImage) => {
      await Image.findOneAndUpdate(
        { path: child.path, name: child.name },
        { path: `${path}${name}/` }
      )
    })
    res.send(null)
  })
}
