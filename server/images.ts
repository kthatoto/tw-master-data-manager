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
    const response: any = {objects: []}

    const objects = await fs.promises.readdir(`./data/images${req.query.directory}`, {})
    for (let obj of objects) {
      const filePath: string = `./data/images${req.query.directory}${obj}`
      const stat = await fs.promises.stat(filePath)
      const data = stat.isDirectory() ? null : await fs.promises.readFile(filePath, 'base64')
      response.objects.push({
        fullPath: filePath,
        name: obj,
        isFile: !stat.isDirectory(),
        size: stat.size,
        raw: data ? `data:image;base64,` + data : null
      })
    }

    res.send(response)
  })

  app.post('/images', upload.single('file'), async (req: any, res: any) => {
    res.send(null)
  })

  app.patch('/images', async (req: any, res: any) => {
    const before: string = req.body.before
    const after: string = req.body.after
    fs.rename(`./data/images${req.query.directory}${before}`, `./data/images${req.query.directory}${after}`, (err: any) => {
      if (err) throw err
      res.send(null)
    })
  })

  app.delete('/images/directories', async (req: any, res: any) => {
    const name: string = req.body.name
    const result = await fs.promises.rmdir(`./data/images${req.query.directory}${name}`)
    res.send(result)
  })
}
