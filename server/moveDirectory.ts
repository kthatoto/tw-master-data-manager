import fs from 'fs'
import { Application, Request, Response } from 'express'

import { ResponseMessage } from '~server/index'

export default (app: Application, method: 'patch', path: string) => {
  app[method](path, async (req: Request, res: Response<null | ResponseMessage>) => {
    const directory: string = req.body.directory
    const beforeName: string = req.body.beforeName
    const name: string = req.body.name

    const beforeFilePath: string = `${app.get('baseDirectory')}/${directory}${beforeName}`
    const afterFilePath: string = `${app.get('baseDirectory')}/${directory}${name}`
    try {
      const stat = await fs.promises.stat(beforeFilePath)
      if (!stat.isDirectory()) {
        return res.send({ message: `「${directory}${beforeName}」はフォルダではありません` })
      }
      if (fs.existsSync(afterFilePath)) {
        return res.send({ message: `「${directory}${name}」は既に存在してます` })
      }

      fs.rename(beforeFilePath, afterFilePath, (err: any) => {
        if (err) throw err
        res.send(null)
      })
    } catch (err: any) {
      res.send({ message: '把握していない不具合', err })
    }
  })
}
