import fs from 'fs'

import { ObjektJson, ObjektsResponse } from '~domains/objekts.ts'

export default (app: any, method: 'get', path: string) => {
  app[method](path, async (req: any, res: any) => {
    const response: ObjektsResponse = { objekts: [], directories: [] }

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
        const json: ObjektJson = JSON.parse(await fs.promises.readFile(filePath, 'utf8'))
        const image = await fs.promises.readFile(`./data/images${json.imagePath}`, 'base64').catch((err: any) => {
          console.log(err)
        })
        response.objekts.push({
          fullPath: filePath,
          name: json.name,
          size: stat.size,
          collision: json.collision,
          category: json.category,
          chest: json.chest,
          imagePath: json.imagePath,
          raw: image ? 'data:image;base64,' + image : null,
          isFile: true
        })
      }
    }

    res.send(response)
  })
}
