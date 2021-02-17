import fs from 'fs'
// @ts-ignore
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, `./data/images${req.query.directory}`)
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

export default (app: any) => {
  app.get('/images', async (req: any, res: any) => {
    const response: any = { images: [], directories: [] }

    const objects = await fs.promises.readdir(`./data/images${req.query.directory}`, {})
    for (const obj of objects) {
      const filePath: string = `./data/images${req.query.directory}${obj}`
      const stat = await fs.promises.stat(filePath)
      if (stat.isDirectory()) {
        response.directories.push({
          fullPath: filePath,
          name: obj,
          isFile: false
        })
      } else {
        const data = await fs.promises.readFile(filePath, 'base64')
        response.images.push({
          fullPath: filePath,
          name: obj,
          isFile: true,
          size: stat.size,
          raw: 'data:image;base64,' + data
        })
      }
    }

    res.send(response)
  })

  app.post('/images', upload.single('file'), async (req: any, res: any) => {
    res.send(null)
  })

  app.patch('/images', async (req: any, res: any) => {
    const before: string = req.body.before
    const beforeFilePath = `./data/images${req.query.directory}${before}`
    const after: string = req.body.after
    const afterFilePath = `./data/images${req.query.directory}${after}`
    try {
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

  app.post('/images/directories', async (req: any, res: any) => {
    const name: string = req.body.name
    try {
      const filePath: string = `./data/images${req.query.directory}${name}`
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

  app.patch('/images/delete', async (req: any, res: any) => {
    const name: string = req.body.name
    try {
      const filePath: string = `./data/images${req.query.directory}${name}`
      const stat = await fs.promises.stat(filePath)
      if (stat.isDirectory()) {
        await fs.promises.rmdir(filePath)
      } else {
        await fs.promises.unlink(filePath)
      }
      res.send(null)
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        res.send({ message: `「${name}」は存在しません` })
      } else if (err.code === 'ENOTEMPTY') {
        res.send({ message: `「${name}」の中は空じゃないので消せません` })
      } else {
        res.send({ message: '把握していない不具合', err })
      }
    }
  })
}
