import { buildImagesStore, ImagesStore } from '@/stores/images_store.ts'

export interface AppStores {
  imagesStore: ImagesStore
}

const _: Partial<AppStores> = {}

export const appStores: AppStores = {
  get imagesStore (): ImagesStore {
    return _.imagesStore || (_.imagesStore = buildImagesStore())
  }
}
