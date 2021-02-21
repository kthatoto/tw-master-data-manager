import fs from 'fs'

export default (app: any, method: 'patch', path: string) => {
  app[method](path, async (req: any, res: any) => {
    const before: string = req.body.before
    const beforeFilePath = `./data/objects${req.query.directory}${before}`
    const after: string = req.body.after
    const afterFilePath = `./data/objects${req.query.directory}${after}`
    try {
      const stat = await fs.promises.stat(beforeFilePath)
      if (!stat.isDirectory()) {
        return res.send({ message: `「${before}」はディレクトリではありません` })
      }
      if (fs.existsSync(afterFilePath)) {
        return res.send({ message: `「${after}」は既に存在してます` })
      }
      fs.rename(beforeFilePath, afterFilePath, (err: any) => {
        if (err) throw err
        res.send(null)
      })
    } catch (err: any) {
      res.send({ message: '把握していない不具合', err })
    }
  })
}
