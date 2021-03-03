import fs from 'fs'

export default (app: any, method: 'delete', path: string) => {
  app[method](path, async (req: any, res: any) => {
    const filePath: string = req.query.filePath
    const fullFilePath: string = `${app.get('baseDirectory')}/${filePath}`
    try {
      const stat = await fs.promises.stat(fullFilePath)
      if (stat.isDirectory()) {
        await fs.promises.rmdir(fullFilePath)
      } else {
        await fs.promises.unlink(fullFilePath)
      }
      res.send(null)
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        res.send({ message: `「${filePath}」は存在しません` })
      } else if (err.code === 'ENOTEMPTY') {
        res.send({ message: `「${filePath}」の中は空じゃないので消せません` })
      } else {
        res.send({ message: '把握していない不具合', err })
      }
    }
  })
}
