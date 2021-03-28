import { Application, Request, Response } from 'express'

import { TilesResponse } from '~domains/tiles.ts'
import Tile, { ITile } from '../../models/tile'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<TilesResponse>) => {
    const response: TilesResponse = { resources: [], directories: [] }
    const directoryPath: string = req.query.directory as string

    const tiles: ITile[] = await Tile.find({ path: directoryPath })
    tiles.forEach((tile: ITile) => {
      if (tile.objectType === 'file') {
        response.resources.push({
          path: tile.path,
          name: tile.name,
          collision: tile.collision,
          imageId: tile.imageId
        })
      } else if (tile.objectType === 'directory') {
        response.directories.push({
          path: tile.path,
          name: tile.name
        })
      }
    })
    res.send(response)
  })
}
