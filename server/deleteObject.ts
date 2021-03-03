import fs from 'fs'

export default (app: any, method: 'delete', path: string) => {
  app[method](path, async (req: any, res: any) => {
    const objectPath: string = req.query.path
    const fullObjectPath: string = `${app.get('baseDirectory')}${objectPath}`
    try {
      const stat = await fs.promises.stat(fullObjectPath)
      if (stat.isDirectory()) {
        await fs.promises.rmdir(fullObjectPath)
      } else {
        await fs.promises.unlink(fullObjectPath)
      }
      res.send(null)
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        res.send({ message: `「${objectPath}」は存在しません` })
      } else if (err.code === 'ENOTEMPTY') {
        res.send({ message: `「${objectPath}」の中は空じゃないので消せません` })
      } else {
        res.send({ message: '把握していない不具合', err })
      }
    }
  })
}
