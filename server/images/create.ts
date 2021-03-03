import fs from 'fs'

export default (app: any, method: 'post', path: string) => {
  app[method](path, async (req: any, res: any) => {
    const filePath: string = req.body.filePath
    const fullFilePath: string = `${app.get('baseDirectory')}/images${filePath}`
    const raw: string = req.body.raw

    try {
      if (fs.existsSync(fullFilePath)) {
        return res.send({ message: `「${filePath}」は既に存在してます` })
      }
      await fs.promises.writeFile(fullFilePath, raw, 'base64')
      res.send(null)
    } catch (err: any) {
      res.send({ message: '把握していない不具合', err })
    }
  })
}
