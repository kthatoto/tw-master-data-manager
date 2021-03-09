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
    // const children: IImage[] = await Image.find(
    //   { path, name }
    // )

    // const beforeFilePath: string = `${app.get('baseDirectory')}/${directory}${beforeName}`
    // const afterFilePath: string = `${app.get('baseDirectory')}/${directory}${name}`
    // try {
    //   const stat = await fs.promises.stat(beforeFilePath)
    //   if (!stat.isDirectory()) {
    //     return res.send({ message: `「${directory}${beforeName}」はフォルダではありません` })
    //   }
    //   if (fs.existsSync(afterFilePath)) {
    //     return res.send({ message: `「${directory}${name}」は既に存在してます` })
    //   }
    //
    //   fs.rename(beforeFilePath, afterFilePath, (err: any) => {
    //     if (err) throw err
    //     res.send(null)
    //   })
    // } catch (err: any) {
    //   res.send({ message: '把握していない不具合', err })
    // }
  })
}
