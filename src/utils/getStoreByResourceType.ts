import { ResourceType } from '~domains/index'
import { appStores } from '@/stores/appStores'

export default (resourceType: ResourceType, selector: Boolean = false) => {
  if (!selector) {
    if (resourceType === 'images') return appStores.imagesStore
    if (resourceType === 'tiles') return appStores.tilesStore
    if (resourceType === 'flags') return appStores.flagsStore
  } else {
    if (resourceType === 'images') return appStores.imagesSelectorStore
  }
  throw new Error(`Not handled resourceType '${resourceType}'`)
}
