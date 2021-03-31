import { reactive, computed, toRefs } from '@vue/composition-api'
import axios from 'axios'

import { Tile, TilesResponse } from '~domains/tiles.ts'
import handleResponse from '@/utils/handleResponse.ts'
import resourceService from '@/services/resourceService.ts'

import { TilesCreateRequestBody } from '~server/api/tiles/create.ts'
import { TilesEditRequestBody } from '~server/api/tiles/edit.ts'

export const buildTilesStore = () => {
  const resourceForm = reactive<{
    flag: boolean
    action?: 'create' | 'edit'
    id: string
    beforeName: string
    name: string
    collision: boolean
    imageId?: string
    image?: {
      data?: string
      name?: string
    }
  }>({
    flag: false,
    action: undefined,
    id: '',
    beforeName: '',
    name: '',
    collision: false,
    imageId: undefined,
    image: undefined
  })

  const {
    state,
    fetchResources,
    resourceCreating,
    resourceEditing,
    selectResource,
    selectingResource,
    showResource,
    showingResource,
    breadcrumbs
  } = resourceService<Tile, TilesResponse>('tiles', resourceForm)

  const openResourceCreateModal = () => {
    resourceForm.flag = true
    resourceForm.action = 'create'
    resourceForm.id = ''
    resourceForm.beforeName = ''
    resourceForm.name = ''
    resourceForm.collision = false
    resourceForm.imageId = undefined
  }
  const openResourceEditModal = (resource: Tile) => {
    resourceForm.flag = true
    resourceForm.action = 'edit'
    resourceForm.id = resource.id
    resourceForm.beforeName = resource.name
    resourceForm.name = resource.name
    resourceForm.collision = resource.collision || false
    resourceForm.imageId = resource.imageId
  }
  const resourceFormValid = computed<boolean>(() => {
    if (!resourceForm.name) return false
    if (!resourceForm.imageId) return false
    return true
  })
  const createResource = async () => {
    if (!resourceFormValid.value) return
    if (!resourceForm.imageId) return
    if (resourceForm.collision === undefined) return
    const params: TilesCreateRequestBody = {
      path: state.currentDirectory,
      name: resourceForm.name,
      collision: resourceForm.collision,
      imageId: resourceForm.imageId
    }
    const res = await axios.post('/api/tiles', params)
    handleResponse(res, '作成完了！', fetchResources, resourceForm)
  }
  const editResource = async () => {
    if (!resourceFormValid.value) return
    if (!resourceForm.imageId) return
    if (resourceForm.collision === undefined) return
    const params: TilesEditRequestBody = {
      path: state.currentDirectory,
      id: resourceForm.id,
      beforeName: resourceForm.beforeName,
      name: resourceForm.name,
      collision: resourceForm.collision,
      imageId: resourceForm.imageId
    }
    const res = await axios.patch('/api/tiles', params)
    handleResponse(res, '更新完了！', fetchResources, resourceForm)
  }

  return {
    ...toRefs(state),
    fetchResources,
    resourceCreating,
    resourceEditing,
    selectResource,
    selectingResource,
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
