import fs from 'fs'

export default (app: any, method: 'patch', path: string) => {
  app[method]('/tiles', async (req: any, res: any) => {
    const beforeName: string = req.body.beforeName
    const name: string = req.body.name
    const collision: boolean = req.body.collision
    const imagePath: string = req.body.imagePath
    const data = JSON.stringify({ name, collision, imagePath })

    const beforeFilePath = `./data/tiles${req.query.directory}${beforeName}`
    const afterFilePath = `./data/tiles${req.query.directory}${name}`

    try {
      if (!fs.existsSync(beforeFilePath)) {
        return res.send({ message: `「${beforeName}」は存在しないため変更できません` })
      }
      const stat = await fs.promises.stat(beforeFilePath)
      if (stat.isDirectory()) {
        return res.send({ message: `「${beforeName}」はTileではありません` })
      }
      if (beforeFilePath !== afterFilePath) {
        fs.promises.renameSync(beforeFilePath, afterFilePath)
      }
      await fs.promises.writeFile(afterFilePath, data)
      res.send(null)
    } catch (err: any) {
      res.send({ message: '把握していない不具合', err })
    }
  })
}
