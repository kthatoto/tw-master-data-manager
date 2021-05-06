import mongoose, { Schema, Document } from 'mongoose'

export interface TileDocument extends Document {
  name: string
  images: {
    x: number
    y: number
    id: string
    collision: boolean
  }[]
  directoryId?: string
}

const TileSchema: Schema = new Schema({
  name: { type: String, required: true },
  collision: { type: Boolean, required: true },
  images: { type: Array, required: true },
  directoryId: { type: String }
})

export default mongoose.model<TileDocument>('Tile', TileSchema)
