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

export default (app: any, method: 'post', path: string) => {
  app[method](path, upload.single('file'), async(req: any, res: any) => {
    res.send(null)
  })
}
