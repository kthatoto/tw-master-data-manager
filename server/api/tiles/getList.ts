import { Application, Request, Response } from 'express'

import { TilesResponse } from '~domains/tiles.ts'
import Tile, { ITile } from '../../models/tile'
import Image, { IImage } from '../../models/image'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<TilesResponse>) => {
    const response: TilesResponse = { resources: [], directories: [] }
    const directoryPath: string = req.query.directory as string

    const tiles: ITile[] = await Tile.find({ path: directoryPath })
    for await (let tile of tiles) {
      if (tile.objectType === 'file') {
        const image: IImage | null = await Image.findById(tile.imageId)
        response.resources.push({
          id: tile.id,
          path: tile.path,
          name: tile.name,
          collision: tile.collision,
          imageId: tile.imageId,
          data: image ? image.data : undefined
        })
      } else if (tile.objectType === 'directory') {
        response.directories.push({
          id: tile.id,
          path: tile.path,
          name: tile.name
        })
      }
    }
    res.send(response)
  })
}
