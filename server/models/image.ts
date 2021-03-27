import mongoose, { Schema, Document } from 'mongoose'

export interface IImage extends Document {
  name: string
  path: string
  objectType: 'file' | 'directory'
  data?: string
}

const ImageSchema: Schema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  objectType: { type: String, required: true },
  data: { type: String }
})

export default mongoose.model<IImage>('Image', ImageSchema)
