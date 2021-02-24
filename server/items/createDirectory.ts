import fs from 'fs'

export default (app: any, method: 'post', path: string) => {
  app[method]('/items/directories', async (req: any, res: any) => {
    const name: string = req.body.name
    try {
      const filePath: string = `./data/items${req.query.directory}${name}`
      await fs.promises.mkdir(filePath)
      res.send(null)
    } catch (err: any) {
      if (err.code === 'EEXIST') {
        res.send({ message: `「${name}」は既に存在してます` })
      } else {
        res.send({ message: '把握していない不具合', err })
      }
    }
  })
}
