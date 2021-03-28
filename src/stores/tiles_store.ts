import { reactive, computed, toRefs } from '@vue/composition-api'
// import axios from 'axios'

import { Tile, TilesResponse } from '~domains/tiles.ts'
// import handleResponse from '@/utils/handleResponse.ts'
import resourceService from '@/services/resourceService.ts'

// import { TilesCreateRequestBody } from '~server/api/tiles/create.ts'
// import { TilesEditRequestBody } from '~server/api/tiles/edit.ts'

export const buildTilesStore = () => {
  const resourceForm = reactive<{
    flag: boolean
    action?: 'create' | 'edit'
    beforeName: string
    name: string
    collision?: boolean
    imageId?: string
  }>({
    flag: false,
    action: undefined,
    beforeName: '',
    name: '',
    collision: undefined,
    imageId: undefined
  })

  const {
    state,
    fetchResources,
    resourceCreating,
    resourceEditing,
    showResource,
    showingResource,
    breadcrumbs
  } = resourceService<Tile, TilesResponse>('tiles', resourceForm)

  const openResourceCreateModal = () => {
  }
  const openResourceEditModal = () => {
  }
  const resourceFormValid = computed<boolean>(() => {
    return true
  })
  const createResource = () => {
  }
  const editResource = () => {
  }

  return {
    ...toRefs(state),
    fetchResources,
    resourceCreating,
    resourceEditing,
    showResource,
    showingResource,
    breadcrumbs,

    resourceForm,

    openResourceCreateModal,
    openResourceEditModal,
    resourceFormValid,
    createResource,
    editResource
  }
}

export type TilesStore = ReturnType<typeof buildTilesStore>
