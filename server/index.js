import express from "express"
import bodyParser from "body-parser"
import fs from "fs"

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/images", async (req, res) => {
  fs.promises.readdir("./data/images", {}).then(files => {
    res.send(files)
  }).catch(err => {
    throw err
  })
})

app.post("/images", async (req, res) => {
  console.log(req.body)
  fs.promises.writeFile("./data/images/test.png", req.body)
  res.send(null)
})

export default {
  path: "/api/",
  handler: app
}
