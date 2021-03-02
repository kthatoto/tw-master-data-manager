import fs from 'fs'

export default (app: any, method: 'post', path: string) => {
  app[method](path, async (req: any, res: any) => {
    const filePath: string = req.body.filePath
    const raw: string = req.body.raw

    try {
      await fs.promises.writeFile(`./data/images${filePath}`, raw, 'base64')
      res.send(null)
    } catch (err: any) {
      res.send({ message: '把握していない不具合', err })
    }
  })
}
