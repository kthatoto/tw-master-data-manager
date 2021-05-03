import mongoose, { Schema, Document } from 'mongoose'

export interface IDirectory extends Document {
  name: string
  directoryId?: string
}

const DirectorySchema: Schema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  directoryId: { type: String }
})

export default mongoose.model<IDirectory>('Directory', DirectorySchema)
