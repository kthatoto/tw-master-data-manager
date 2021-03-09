import { Application, Request, Response } from 'express'

import { ResourceKey } from '~server/index'
import { ResponseMessage, DefaultResponseBody } from '~server/api/index'
import Image from '../models/image'

export interface CreateDirectoryRequestBody {
  resourceKey: ResourceKey
  path: string
  name: string
}

export default (app: any, method: 'post', path: string) => {
  app[method]('/directories', async (req: Request<any, any, CreateDirectoryRequestBody>, res: Response<DefaultResponseBody>) => {
    const resourceKey: ResourceKey = req.body.resourceKey
    const path: string = req.body.path
    const name: string = req.body.name

    const Model = {
      images: Image
    }[resourceKey]
    const newDirectory = new Model({
      name, path, objectType: 'directory'
    })
    await newDirectory.save()
    res.send(null)
  })
}
