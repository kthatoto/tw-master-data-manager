import { Application, Request, Response } from 'express'

import { ResourceType } from '~server/index'
import { DefaultResponseBody } from '~server/api/index'
import DirectoryModel from '../models/directory'

export interface CreateDirectoryRequestBody {
  resourceType: ResourceType
  name: string
  directoryId?: string
}

export default (app: Application, method: 'post', path: string) => {
  app[method]('/directories', async (req: Request<any, any, CreateDirectoryRequestBody>, res: Response<DefaultResponseBody>) => {
    const { name, resourceType, directoryId } = req.body

    const already: boolean = await DirectoryModel.exists({ name, resourceType, directoryId })
    if (already) {
      res.send({ message: `「${name}」は既に存在してます` })
      return
    }
    const newDirectory = new DirectoryModel({ name, resourceType, directoryId })
    await newDirectory.save()
    res.send(null)
  })
}
