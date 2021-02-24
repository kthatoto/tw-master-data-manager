import fs from 'fs'

import { ItemsResponse } from '~domains/items.ts'

export default (app: any, method: 'get', path: string) => {
  app[method](path, async (req: any, res: any) => {
    const response: ItemsResponse = { items: [], directories: [] }

    const objects = await fs.promises.readdir(`./data/items${req.query.directory}`, {})
    for (const obj of objects) {
      const filePath: string = `./data/items${req.query.directory}${obj}`
      const stat = await fs.promises.stat(filePath)
      if (stat.isDirectory()) {
        response.directories.push({
          fullPath: filePath,
          name: obj,
          isFile: false
        })
      } else {
        const json = JSON.parse(await fs.promises.readFile(filePath, 'utf8'))
        const image = await fs.promises.readFile(`./data/images${json.imagePath}`, 'base64').catch((err: any) => {
          console.log(err)
        })
        response.items.push({
          fullPath: filePath,
          name: json.name,
          size: stat.size,
          imagePath: json.imagePath,
          raw: image ? 'data:image;base64,' + image : null,
          isFile: true,
          category: json.category,
          subCategory: json.subCategory,
          value: json.value,
          effect: json.effect
        })
      }
    }

    res.send(response)
  })
}
