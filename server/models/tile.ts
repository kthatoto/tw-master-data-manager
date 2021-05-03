import mongoose, { Schema, Document } from 'mongoose'

export interface ITile extends Document {
  name: string
  collision: boolean
  imageId: string
  directoryId?: string
}

const TileSchema: Schema = new Schema({
  name: { type: String, required: true },
  collision: { type: Boolean, required: true },
  imageId: { type: String: required: true },
  directoryId: { type: String }
})

export default mongoose.model<ITile>('Tile', TileSchema)
