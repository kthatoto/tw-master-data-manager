import mongoose, { Schema, Document } from 'mongoose'

export interface IImage extends Document {
  name: string
  path: string
  data?: string
  objectType: 'file' | 'directory'
}

const ImageSchema: Schema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  data: { type: String },
  objectType: { type: String, required: true }
})

export default mongoose.model<IImage>('Image', ImageSchema)
