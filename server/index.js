import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import fs from 'fs'

const app = express()
const storage = multer.diskStorage({
  destination: './data/images',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/images', async (req, res) => {
  fs.promises.readdir('./data/images', {}).then(files => {
    res.send(files)
  }).catch(err => {
    throw err
  })
})

app.post('/images', upload.single('file'), async (req, res) => {
  res.send(null)
})

export default {
  path: '/api/',
  handler: app
}
