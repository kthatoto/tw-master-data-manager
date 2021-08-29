import { reactive, computed, ComputedRef } from '@vue/composition-api'
import axios from 'axios'

import { Directory, ResourceType } from '~domains/index.ts'
import handleResponse from '@/utils/handleResponse.ts'

import { CreateDirectoryRequestBody } from '~server/api/createDirectory.ts'
import { MoveDirectoryRequestBody } from '~server/api/moveDirectory.ts'

export default (
  resourceType: ResourceType,
  currentDirectoryId: ComputedRef<string | undefined>,
  fetchResources: Function
) => {
  const directoryForm = reactive<{
    flag: boolean
    action?: 'create' | 'edit'
    id?: string
    name?: string
  }>({
    flag: false,
    action: undefined,
    id: undefined,
    name: undefined
  })
  const openDirectoryCreateModal = (refs: any) => {
    directoryForm.flag = true
    directoryForm.action = 'create'
    directoryForm.name = ''
    directoryForm.id = undefined
    setTimeout(() => refs.directoryName.focus(), 50)
  }
  const openDirectoryEditModal = (refs: any, directory: Directory) => {
    directoryForm.flag = true
    directoryForm.action = 'edit'
    directoryForm.id = directory.id
    directoryForm.name = directory.name
    setTimeout(() => refs.directoryName.focus(), 50)
  }
  const directoryCreating = computed<boolean>(() => directoryForm.action === 'create')
  const directoryEditing = computed<boolean>(() => directoryForm.action === 'edit')
  const directoryFormValid = computed<boolean>(() => {
    if (!directoryForm.name) return false
    return true
  })
  const createDirectory = async () => {
    if (!directoryFormValid.value) return
    if (!directoryForm.name) return
    const params: CreateDirectoryRequestBody = {
      resourceType,
      name: directoryForm.name,
      directoryId: currentDirectoryId.value
    }
    const res = await axios.post('/api/directories', params)
    handleResponse(res, '作成完了！', fetchResources, directoryForm)
  }
  const editDirectory = async () => {
    if (!directoryFormValid.value) return
    if (!directoryForm.name) return
    if (!directoryForm.id) return
    const params: MoveDirectoryRequestBody = {
      resourceType,
      id: directoryForm.id,
      name: directoryForm.name,
      directoryId: currentDirectoryId.value
    }
    const res = await axios.patch('/api/directories', params)
    handleResponse(res, '更新完了！', fetchResources, directoryForm)
  }

  return {
    directoryForm,
    openDirectoryCreateModal,
    openDirectoryEditModal,
    directoryCreating,
    directoryEditing,
    directoryFormValid,
    createDirectory,
    editDirectory
  }
}
