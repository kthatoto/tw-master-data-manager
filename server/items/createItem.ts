import fs from 'fs'

import { Value } from '~domains/index.ts'
import { ItemJson, ItemCategory, ItemSubCategory, ItemEffect } from '~domains/items.ts'

export default (app: any, method: 'post', path: string) => {
  app[method]('/items', async (req: any, res: any) => {
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

    try {
      const filePath: string = `./data/items${req.query.directory}${name}`
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
