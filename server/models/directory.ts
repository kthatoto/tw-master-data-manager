import mongoose, { Schema, Document } from 'mongoose'

import { ResourceType } from '~server/index'

export interface DirectoryDocument extends Document {
  name: string
  resourceType: ResourceType
  directoryId?: string
}

const DirectorySchema: Schema = new Schema({
  name: { type: String, required: true },
  resourceType: { type: String, required: true },
  directoryId: { type: String }
})

export default mongoose.model<IDirectory>('Directory', DirectorySchema)
