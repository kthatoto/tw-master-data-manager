import { Application, Request, Response } from 'express'

import { TilesResponse } from '~domains/tiles.ts'
import TileModel, { TileDocument } from '../../models/tile'
import ImageModel, { ImageDocument } from '../../models/image'
import DirectoryModel, { DirectoryDocument } from '../../models/directory'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<TilesResponse>) => {
    const directoryId: string | undefined = req.query.directoryId as string | undefined

    const tiles: TileDocument[] = await TileModel.find({ directoryId })
    const imageIds: string[] = tiles.map((tile: TileDocument) => tile.imageId)
    const images: ImageDocument[] = await ImageModel.find({ _id: { $in: imageIds } })

    const responseTiles = tiles.map((tile: TileDocument) => {
      const image: ImageDocument | undefined = images.find((i: ImageDocument) => i.id === tile.imageId)
      if (!image) throw new Error('ImageNotFound')
      return {
        id: tile.id,
        name: tile.name,
        collision: tile.collision,
        imageId: tile.imageId,
        image: {
          id: image.id,
          name: image.name,
          data: image.data
        }
      }
    })

    const directories: DirectoryDocument[] = await DirectoryModel.find({ directoryId })
    const responseDirectories = directories.map((directory: DirectoryDocument) => {
      return {
        id: directory.id,
        name: directory.name
      }
    })

    res.send({
      resources: responseTiles,
      directories: responseDirectories
    })
  })
}
