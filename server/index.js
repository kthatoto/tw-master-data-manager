import express from "express"
import fs from "fs"

const app = express()

app.get("/images", async (req, res) => {
  fs.promises.readdir("./data/images", {}).then(files => {
    res.send(files)
  }).catch(err => {
    throw err
  })
})

export default {
  path: "/api/",
  handler: app
}
