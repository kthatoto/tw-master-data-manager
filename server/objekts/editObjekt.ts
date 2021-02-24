import fs from 'fs'

import { ObjektJson, ObjektCategory, ObjektChest } from '~domains/objekts.ts'

export default (app: any, method: 'patch', path: string) => {
  app[method]('/objekts', async (req: any, res: any) => {
    const beforeName: string = req.body.beforeName
    const name: string = req.body.name
    const collision: boolean = req.body.collision
    const imagePath: string = req.body.imagePath
    const category: ObjektCategory = req.body.category
    const chest: ObjektChest | undefined = req.body.chest
    const objektJson: ObjektJson = { name, collision, imagePath, category, chest }
    const data = JSON.stringify(objektJson)

    const beforeFilePath = `./data/objekts${req.query.directory}${beforeName}`
    const afterFilePath = `./data/objekts${req.query.directory}${name}`

    try {
      if (!fs.existsSync(beforeFilePath)) {
        return res.send({ message: `「${beforeName}」は存在しないため変更できません` })
      }
      const stat = await fs.promises.stat(beforeFilePath)
      if (stat.isDirectory()) {
        return res.send({ message: `「${beforeName}」はobjektではありません` })
      }
      if (beforeFilePath !== afterFilePath) {
        fs.renameSync(beforeFilePath, afterFilePath)
      }
      await fs.promises.writeFile(afterFilePath, data)
      res.send(null)
    } catch (err: any) {
      res.send({ message: '把握していない不具合', err })
    }
  })
}
