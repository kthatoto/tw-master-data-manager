import { Application, Request, Response } from 'express'

import { FlagsResponse } from '~domains/flags.ts'
import FlagModel, { FlagDocument } from '../../models/flag'
import DirectoryModel, { DirectoryDocument } from '../../models/directory'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<FlagsResponse>) => {
    const directoryId: string | undefined = (req.query.directoryId || undefined) as string | undefined

    const flags: FlagDocument[] = await FlagModel.find({ directoryId })
    const responseFlags = flags.map((flag: FlagDocument) => {
      return {
        id: flag.id,
        name: flag.name,
        key: flag.key,
        description: flag.description
      }
    })

    const directories: DirectoryDocument[] = await DirectoryModel.find({ directoryId, resourceType: 'flags' })
    const responseDirectories = directories.map((directory: DirectoryDocument) => {
      return {
        id: directory.id,
        name: directory.name
      }
    })

    res.send({
      resources: responseFlags,
      directories: responseDirectories
    })
  })
}
