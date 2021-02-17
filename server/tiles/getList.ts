import fs from 'fs'

export default (app: any, method: 'get', path: string) => {
  app[method](path, async(req: any, res: any) => {
    const response: any = { tiles: [], directories: [] }

    const objects = await fs.promises.readdir(`./data/tiles${req.query.directory}`, {})
    for (const obj of objects) {
      const filePath: string = `./data/tiles${req.query.directory}${obj}`
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
        response.tiles.push({
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
