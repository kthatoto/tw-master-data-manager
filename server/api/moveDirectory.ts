import { Application, Request, Response } from 'express'

import { ResourceType } from '~server/index'
import { DefaultResponseBody } from '~server/api/index'
import DirectoryModel, { DirectoryDocument } from '~server/models/directory'

export interface MoveDirectoryRequestBody {
  id: string
  resourceType: ResourceType
  name: string
  directoryId?: string
}

export default (app: Application, method: 'patch', path: string) => {
  app[method](path, async (req: Request<any, any, MoveDirectoryRequestBody>, res: Response<DefaultResponseBody>) => {
    const { id, resourceType, name, directoryId } = req.body

    const already: boolean = await DirectoryModel.exists({ name, resourceType, directoryId })
    if (already) {
      res.send({ message: `「${name}」は既に存在してます` })
      return
    }
    const result: DirectoryDocument | null = await DirectoryModel.findByIdAndUpdate(id, { $set: { name, directoryId } })
    if (!result) {
      res.send({ message: `ディレクトリ(id:${id})が見つかりません` })
      return
    }
    res.send(null)
  })
}
