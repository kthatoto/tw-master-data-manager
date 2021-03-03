import fs from 'fs'

export default (app: any, method: 'patch', path: string) => {
  app[method](path, async (req: any, res: any) => {
    const beforeFilePath = `./data/images${req.body.beforeFilePath}`
    const afterFilePath = `./data/images${req.body.filePath}`
    const raw: string = req.body.raw
    try {
      if (!fs.existsSync(beforeFilePath)) {
        return res.send({ message: `「${beforeFilePath}」は存在しません` })
      }
      if (fs.existsSync(afterFilePath)) {
        return res.send({ message: `「${afterFilePath}」は既に存在してます` })
      }
      await fs.promises.rename(beforeFilePath, afterFilePath)
      await fs.promises.writeFile(afterFilePath, raw, 'base64')
      res.send(null)
    } catch (err: any) {
      res.send({ message: '把握していない不具合', err })
    }
  })
}
