import { Application, Request, Response } from 'express'

import { ResourceKey, ResourceDocumentModel } from '~server/index'
import { DefaultResponseBody } from '~server/api/index'
import Image from '../models/image'
import Tile from '../models/tile'

export interface CreateDirectoryRequestBody {
  resourceKey: ResourceKey
  path: string
  name: string
}

export default (app: Application, method: 'post', path: string) => {
  app[method]('/directories', async (req: Request<any, any, CreateDirectoryRequestBody>, res: Response<DefaultResponseBody>) => {
    const { resourceKey, path, name } = req.body

    const Model: ResourceDocumentModel = {
      images: Image,
      tiles: Tile
    }[resourceKey]

    const already: boolean = await Model.exists({ path, name })
    if (already) {
      res.send({ message: `「${path}${name}/」は既に存在してます` })
      return
    }
    const newDirectory = new Model({ name, path, objectType: 'directory' })
    await newDirectory.save()
    res.send(null)
  })
}
