import mongoose, { Schema } from 'mongoose'

const Image = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  data: { type: String },
  objectType: { type: String, required: true } // as 'file' | 'directory'
})

default export mongoose.model('Image', Image)
