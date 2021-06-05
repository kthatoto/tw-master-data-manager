import mongoose, { Schema, Document } from 'mongoose'

export interface FlagDocument extends Document {
  name: string
  key: string
  description: string
  directoryId?: string
}

const FlagSchema: Schema = new Schema({
  name: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  description: { type: String },
  directoryId: { type: String }
})

export default mongoose.model<FlagDocument>('Flag', FlagSchema)
