import mongoose, { Schema, Document } from 'mongoose'

export interface ImageDocument extends Document {
  name: string
  data: string
  directoryId?: string
}

const ImageSchema: Schema = new Schema({
  name: { type: String, required: true },
  data: { type: String, required: true },
  directoryId: { type: String }
})

export default mongoose.model<IImage>('Image', ImageSchema)
