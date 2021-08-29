import { Application, Request, Response } from 'express'

import { FlagsResponse } from '~domains/flags'
import FlagModel, { FlagDocument } from '../../models/flag'

import getList from '../../services/getList'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<FlagsResponse>) => {
    const response = await getList<FlagDocument>(
      req,
      res,
      FlagModel,
      'flags',
      (_: any) => {
        return (resource: FlagDocument) => {
          return {
            id: resource.id,
            name: resource.name,
            key: resource.key,
            description: resource.description
          }
        }
      }
    )
    res.send(response)
  })
}
