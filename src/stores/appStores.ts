import { buildCommonStore, CommonStore } from '@/stores/common_store.ts'
import { buildImagesStore, ImagesStore } from '@/stores/images_store.ts'
import { buildTilesStore, TilesStore } from '@/stores/tiles_store.ts'
import { buildObjektsStore, ObjektsStore } from '@/stores/objekts_store.ts'
import { buildItemsStore, ItemsStore } from '@/stores/items_store.ts'

export interface AppStores {
  commonStore: CommonStore
  imagesStore: ImagesStore
  tilesStore: TilesStore
  objektsStore: ObjektsStore
  itemsStore: ItemsStore
}

const _: Partial<AppStores> = {}

export const appStores: AppStores = {
  get commonStore (): CommonStore {
    return _.commonStore || (_.commonStore = buildCommonStore(this))
  },
  get imagesStore (): ImagesStore {
    return _.imagesStore || (_.imagesStore = buildImagesStore())
  },
  get tilesStore (): TilesStore {
    return _.tilesStore || (_.tilesStore = buildTilesStore(this))
  },
  get objektsStore (): ObjektsStore {
    return _.objektsStore || (_.objektsStore = buildObjektsStore(this))
  },
  get itemsStore (): ItemsStore {
    return _.itemsStore || (_.itemsStore = buildItemsStore(this))
  }
}
