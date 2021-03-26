import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ITile extends Document {
  name: string
  path: string
  objectType: 'file' | 'directory'
  collision?: boolean
  imageId?: Types.ObjectId
}

const TileSchema: Schema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  objectType: { type: String, required: true },
  collision: { type: Boolean },
  imageId: { type: String }
})

export default mongoose.model<ITile>('Tile', TileSchema)
