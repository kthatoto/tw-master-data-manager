import { Application, Request, Response } from 'express'

import { TilesResponse } from '~domains/tiles.ts'
import TileModel, { TileDocument } from '../../models/tile'
import ImageModel, { ImageDocument } from '../../models/image'
import DirectoryModel, { DirectoryDocument } from '../../models/directory'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<TilesResponse>) => {
    const directoryId: string | undefined = (req.query.directoryId || undefined) as string | undefined

    const tiles: TileDocument[] = await TileModel.find({ directoryId })
    const allImageIds: string[] = tiles.reduce((ids: string[], tile: TileDocument) => {
      tile.images.forEach((image: { id: string }) => {
        if (!ids.includes(image.id)) ids.push(image.id)
      })
      return ids
    }, [])
    const allImages: ImageDocument[] = await ImageModel.find({ _id: { $in: allImageIds } })

    const responseTiles = tiles.map((tile: TileDocument) => {
      const imageIds: string[] = tile.images.map((image: { id: string }) => image.id)
      const imageData = allImages.filter((image: ImageDocument) => imageIds.includes(image.id))
        .reduce((acc: { [imageId: string]: { name: string, data: string } }, image: ImageDocument) => {
          acc[image.id] = { name: image.name, data: image.data }
          return acc
        }, {})

      return {
        id: tile.id,
        name: tile.name,
        imageData,
        images: tile.images,
      }
    })

    const directories: DirectoryDocument[] = await DirectoryModel.find({ directoryId, resourceType: 'tiles' })
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
