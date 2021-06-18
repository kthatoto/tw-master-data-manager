import { buildImagesStore, ImagesStore } from '@/stores/images_store.ts'
import { buildTilesStore, TilesStore } from '@/stores/tiles_store.ts'
import { buildFlagsStore, FlagsStore } from '@/stores/flags_store.ts'

export interface AppStores {
  imagesStore: ImagesStore
  tilesStore: TilesStore
  flagsStore: FlagsStore

  imagesSelectorStore: ImagesStore
}

const _: Partial<AppStores> = {}

export const appStores: AppStores = {
  get imagesStore (): ImagesStore {
    return _.imagesStore || (_.imagesStore = buildImagesStore())
  },
  get tilesStore (): TilesStore {
    return _.tilesStore || (_.tilesStore = buildTilesStore())
  },
  get flagsStore (): FlagsStore {
    return _.flagsStore || (_.flagsStore = buildFlagsStore())
  },

  get imagesSelectorStore (): ImagesStore {
    return _.imagesSelectorStore || (_.imagesSelectorStore = buildImagesStore())
  }
}
