import fs from 'fs'

export default (app: any, method: 'patch', path: string) => {
  app[method](path, async (req: any, res: any) => {
    const name: string = req.body.name
    try {
      const filePath: string = `./data/images${req.query.directory}${name}`
      const stat = await fs.promises.stat(filePath)
      if (stat.isDirectory()) {
        await fs.promises.rmdir(filePath)
      } else {
        await fs.promises.unlink(filePath)
      }
      res.send(null)
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        res.send({ message: `「${name}」は存在しません` })
      } else if (err.code === 'ENOTEMPTY') {
        res.send({ message: `「${name}」の中は空じゃないので消せません` })
      } else {
        res.send({ message: '把握していない不具合', err })
      }
    }
  })
}
