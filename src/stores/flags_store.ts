import { reactive, computed } from '@vue/composition-api'
import axios from 'axios'

import { Flag, FlagsResponse } from '~domains/flags'
import handleResponse from '@/utils/handleResponse'
import useResources from '@/hooks/useResources'

import { FlagsCreateRequestBody } from '~server/api/flags/create'
import { FlagsEditRequestBody } from '~server/api/flags/edit'

export const buildFlagsStore = () => {
  const resourceForm = reactive<{
    flag: boolean
    action?: 'create' | 'edit'
    id?: string
    name?: string
    key?: string
    description?: string
  }>({
    flag: false,
    action: undefined,
    id: undefined,
    name: undefined,
    key: undefined,
    description: undefined
  })

  const resourcesHook = useResources<Flag, FlagsResponse>('flags', resourceForm)

  const openResourceCreateModal = () => {
    resourceForm.flag = true
    resourceForm.action = 'create'
    resourceForm.id = undefined
    resourceForm.name = ''
    resourceForm.key = ''
    resourceForm.description = ''
  }
  const openResourceEditModal = (resource: Flag) => {
    resourceForm.flag = true
    resourceForm.action = 'edit'
    resourceForm.id = resource.id
    resourceForm.name = resource.name
    resourceForm.key = resource.key
    resourceForm.description = resource.description
  }
  const resourceFormValid = computed<boolean>(() => {
    if (!resourceForm.name) return false
    if (!resourceForm.key) return false
    return true
  })
  const createResource = async () => {
    if (!resourceFormValid.value) return
    const params: FlagsCreateRequestBody = {
      name: resourceForm.name!,
      key: resourceForm.key!,
      description: resourceForm.description,
      directoryId: resourcesHook.currentDirectoryId.value
    }
    const res = await axios.post('/api/flags', params)
    handleResponse(res, '作成完了！', resourcesHook.fetchResources, resourceForm)
  }
  const editResource = async () => {
    if (!resourceFormValid.value) return
    if (!resourceForm.id) return
    const params: FlagsEditRequestBody = {
      id: resourceForm.id,
      name: resourceForm.name!,
      key: resourceForm.key!,
      description: resourceForm.description,
      directoryId: resourcesHook.currentDirectoryId.value
    }
    const res = await axios.patch('/api/flags', params)
    handleResponse(res, '更新完了！', resourcesHook.fetchResources, resourceForm)
  }

  return {
    ...resourcesHook,

    resourceForm,

    openResourceCreateModal,
    openResourceEditModal,
    resourceFormValid,
    createResource,
    editResource
  }
}

export type FlagsStore = ReturnType<typeof buildFlagsStore>
