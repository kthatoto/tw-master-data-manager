import { buildImagesStore, ImagesStore } from '@/stores/images_store.ts'
import { buildTilesStore, TilesStore } from '@/stores/tiles_store.ts'
import { buildObjektsStore, ObjektsStore } from '@/stores/objekts_store.ts'

export interface AppStores {
  imagesStore: ImagesStore
  tilesStore: TilesStore
  objektsStore: ObjektsStore
}

const _: Partial<AppStores> = {}

export const appStores: AppStores = {
  get imagesStore (): ImagesStore {
    return _.imagesStore || (_.imagesStore = buildImagesStore())
  },
  get tilesStore (): TilesStore {
    return _.tilesStore || (_.tilesStore = buildTilesStore(this))
  },
  get objektsStore (): ObjektsStore {
    return _.objektsStore || (_.objektsStore = buildObjektsStore(this))
  }
}
