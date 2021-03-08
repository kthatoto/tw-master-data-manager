import fs from 'fs'
import { Application, Request, Response } from 'express'

import { ImagesResponse } from '~domains/images.ts'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<ImagesResponse>) => {
    const response: ImagesResponse = { resources: [], directories: [] }

    const objects = await fs.promises.readdir(`${app.get('baseDirectory')}/images${req.query.directory}`, {})
    for (const obj of objects) {
      const path: string = `${app.get('baseDirectory')}/images${req.query.directory}${obj}`
      const stat = await fs.promises.stat(path)
      if (stat.isDirectory()) {
        response.directories.push({
          path,
          name: obj
        })
      } else {
        const data = await fs.promises.readFile(path, 'base64')
        response.resources.push({
          path,
          data,
          name: obj,
          size: stat.size,
        })
      }
    }

    res.send(response)
  })
}
