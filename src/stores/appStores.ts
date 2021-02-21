import { buildImagesStore, ImagesStore } from '@/stores/images_store.ts'
import { buildTilesStore, TilesStore } from '@/stores/tiles_store.ts'
import { buildObjectsStore, ObjectsStore } from '@/stores/objects_store.ts'

export interface AppStores {
  imagesStore: ImagesStore
  tilesStore: TilesStore
  objectsStore: ObjectsStore
}

const _: Partial<AppStores> = {}

export const appStores: AppStores = {
  get imagesStore (): ImagesStore {
    return _.imagesStore || (_.imagesStore = buildImagesStore())
  },
  get tilesStore (): TilesStore {
    return _.tilesStore || (_.tilesStore = buildTilesStore(this))
  },
  get objectsStore (): ObjectsStore {
    return _.objectsStore || (_.objectsStore = buildObjectsStore(this))
  }
}
