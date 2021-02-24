import fs from 'fs'

import { Value } from '~domains/index.ts'
import { ItemJson, ItemCategory, ItemSubCategory, ItemEffect } from '~domains/items.ts'

export default (app: any, method: 'patch', path: string) => {
  app[method]('/items', async (req: any, res: any) => {
    const beforeName: string = req.body.beforeName
    const name: string = req.body.name
    const imagePath: string = req.body.imagePath
    const category: ItemCategory = req.body.category
    const subCategory: ItemSubCategory = req.body.subCategory
    const value: Value = { currency: req.body.value.currency, amount: req.body.value.amount }
    const effect: ItemEffect = {
      amount: req.body.effect.amount,
      amountType: req.body.effect.amountType,
      durationSecond: req.body.effect.durationSecond
    }
    const itemJson: ItemJson = {
      name,
      imagePath,
      category,
      subCategory,
      value,
      effect
    }
    const data = JSON.stringify(itemJson)

    const beforeFilePath = `./data/items${req.query.directory}${beforeName}`
    const afterFilePath = `./data/items${req.query.directory}${name}`

    try {
      if (!fs.existsSync(beforeFilePath)) {
        return res.send({ message: `「${beforeName}」は存在しないため変更できません` })
      }
      const stat = await fs.promises.stat(beforeFilePath)
      if (stat.isDirectory()) {
        return res.send({ message: `「${beforeName}」はItemではありません` })
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
