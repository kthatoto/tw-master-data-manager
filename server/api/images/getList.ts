import fs from 'fs'
import { Application, Request, Response } from 'express'

import { ImagesResponse } from '~domains/images.ts'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<ImagesResponse>) => {
    const response: ImagesResponse = { resources: [], directories: [] }

    const objects = await fs.promises.readdir(`${app.get('baseDirectory')}/images${req.query.directory}`, {})
    for (const obj of objects) {
      const filePath: string = `${app.get('baseDirectory')}/images${req.query.directory}${obj}`
      const stat = await fs.promises.stat(filePath)
      if (stat.isDirectory()) {
        response.directories.push({
          fullPath: filePath,
          name: obj,
          isFile: false
        })
      } else {
        const data = await fs.promises.readFile(filePath, 'base64')
        response.resources.push({
          fullPath: filePath,
          name: obj,
          isFile: true,
          size: stat.size,
          raw: data
        })
      }
    }

    res.send(response)
  })
}
