import fs from 'fs'

export default (app: any, method: 'get', path: string) => {
  app[method](path, async (req: any, res: any) => {
    const response: any = { images: [], directories: [] }

    const objects = await fs.promises.readdir(`./data/images${req.query.directory}`, {})
    for (const obj of objects) {
      const filePath: string = `./data/images${req.query.directory}${obj}`
      const stat = await fs.promises.stat(filePath)
      if (stat.isDirectory()) {
        response.directories.push({
          fullPath: filePath,
          name: obj,
          isFile: false
        })
      } else {
        const data = await fs.promises.readFile(filePath, 'base64')
        response.images.push({
          fullPath: filePath,
          name: obj,
          isFile: true,
          size: stat.size,
          raw: 'data:image;base64,' + data
        })
      }
    }

    res.send(response)
  })
}
