import fs from 'fs'

import { ObjektJson } from '~domains/objekts'

export default (app: any, method: 'post', path: string) => {
  app[method]('/objekts', async (req: any, res: any) => {
    const name: string = req.body.name
    const collision: boolean = req.body.collision
    const imagePath: string = req.body.imagePath
    const objektJson: ObjektJson = { name, collision, imagePath }
    const data = JSON.stringify(objektJson)

    try {
      const filePath: string = `./data/objekts${req.query.directory}${name}`
      await fs.promises.writeFile(filePath, data)
      res.send(null)
    } catch (err: any) {
      if (err.code === 'EEXIST' || err.code === 'EISDIR') {
        res.send({ message: `「${name}」は既に存在してます` })
      } else {
        res.send({ message: '把握していない不具合', err })
      }
    }
  })
}
