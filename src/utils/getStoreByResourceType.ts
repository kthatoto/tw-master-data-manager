import { ResourceType } from '~server/index.ts'
import { appStores } from '@/stores/appStores.ts'

export default (resourceType: ResourceType) => {
  if (resourceType === 'images') return appStores.imagesStore
  if (resourceType === 'tiles') return appStores.tilesStore
  if (resourceType === 'flags') return appStores.flagsStore
  throw new Error(`Not handled resourceType '${resourceType}'`)
}
