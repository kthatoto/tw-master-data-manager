import fs from 'fs'
// @ts-ignore
import multer from 'multer'

const storage = multer.diskStorage({
  destination: './data/images',
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

export default (app: any) => {
  app.get('/images', async (req: any, res: any) => {
    const response: any = {objects: []}

    const objects = await fs.promises.readdir('./data/images', {})
    for (let obj of objects) {
      const stat = await fs.promises.stat(`./data/images/${obj}`)
      response.objects.push({
        path: obj,
        name: obj,
        isFile: !stat.isDirectory()
      })
    }

    res.send(response)
  })

  app.post('/images', upload.single('file'), async (req: any, res: any) => {
    res.send(null)
  })
}
