import fs from 'fs'

import { ObjektResponse } from '~domains/objekts.ts'

export default (app: any, method: 'get', path: string) => {
  app[method](path, async (req: any, res: any) => {
    const response: ObjektResponse = { objekts: [], directories: [] }

    const objects = await fs.promises.readdir(`./data/objekts${req.query.directory}`, {})
    for (const obj of objects) {
      const filePath: string = `./data/objekts${req.query.directory}${obj}`
      const stat = await fs.promises.stat(filePath)
      if (stat.isDirectory()) {
        response.directories.push({
          fullPath: filePath,
          name: obj,
          isFile: false
        })
      } else {
        const json = JSON.parse(await fs.promises.readFile(filePath, 'utf8'))
        const image = await fs.promises.readFile(`./data/images${json.imagePath}`, 'base64')
        response.objekts.push({
          fullPath: filePath,
          name: json.name,
          size: stat.size,
          collision: json.collision,
          imagePath: json.imagePath,
          raw: 'data:image;base64,' + image,
          isFile: true
        })
      }
    }

    res.send(response)
  })
}
