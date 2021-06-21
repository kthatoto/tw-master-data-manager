import { Application, Request, Response } from 'express'

import { TilesResponse } from '~domains/tiles.ts'
import TileModel, { TileDocument } from '../../models/tile'
import ImageModel, { ImageDocument } from '../../models/image'

import getList from '../../services/getList'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<TilesResponse>) => {
    const response = await getList<TileDocument>(
      req,
      res,
      TileModel,
      'tiles',
      (cache: any) => {
        return (resource: TileDocument) => {
          const imageIds: string[] = resource.images.map((image: { id: string }) => image.id)
          const imageData = cache.allImages.filter((image: ImageDocument) => imageIds.includes(image.id))
            .reduce((acc: { [imageId: string]: { name: string, data: string } }, image: ImageDocument) => {
              acc[image.id] = { name: image.name, data: image.data }
              return acc
            }, {})

          return {
            id: resource.id,
            name: resource.name,
            imageData,
            images: resource.images
          }
        }
      },
      async (resources: TileDocument[]) => {
        const allImageIds: string[] = resources.reduce((ids: string[], resource: TileDocument) => {
          resource.images.forEach((image: { id: string }) => {
            if (!ids.includes(image.id)) ids.push(image.id)
          })
          return ids
        }, [])
        const allImages: ImageDocument[] = await ImageModel.find({ _id: { $in: allImageIds } })
        return { allImages }
      },
    )
    res.send(response)
  })
}
