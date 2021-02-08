import express from "express"
import fs from "fs"

const app = express()

app.get("/images", async (req, res) => {
  const fileList = []
  await fs.promises.readdir("./data/images", (err, files) => {
    if (err) throw err
    files.forEach((file) => {
      fileList.push(file)
    })
    console.log("#01")
    res.send(fileList)
  })
  console.log("#02")
})

export default {
  path: "/api/",
  handler: app
}
