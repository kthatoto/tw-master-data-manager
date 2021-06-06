import { reactive, computed } from '@vue/composition-api'
import axios from 'axios'

import { AppStores } from '@/stores/appStores.ts'
import { BasicObject, Directory } from '~domains/index.ts'
import handleResponse from '@/utils/handleResponse.ts'

import { ResourceType } from '~server/index.ts'
import { CreateDirectoryRequestBody } from '~server/api/createDirectory.ts'
import { MoveDirectoryRequestBody } from '~server/api/moveDirectory.ts'

export const buildCommonStore = (stores: AppStores) => {
  const getStoreByResourceType = (resourceType: ResourceType) => {
    if (resourceType === 'images') return stores.imagesStore
    if (resourceType === 'tiles') return stores.tilesStore
    if (resourceType === 'flags') return stores.flagsStore
    throw new Error(`Not handled resourceType '${resourceType}'`)
  }

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
  const createDirectory = async (resourceType: ResourceType) => {
    if (!directoryFormValid.value) return
    if (!directoryForm.name) return
    const store = getStoreByResourceType(resourceType)
    const params: CreateDirectoryRequestBody = {
      resourceType,
      name: directoryForm.name,
      directoryId: store.currentDirectoryId?.value
    }
    const res = await axios.post('/api/directories', params)
    handleResponse(res, '作成完了！', store.fetchResources, directoryForm)
  }
  const editDirectory = async (resourceType: ResourceType) => {
    if (!directoryFormValid.value) return
    if (!directoryForm.name) return
    if (!directoryForm.id) return
    const store = getStoreByResourceType(resourceType)
    const params: MoveDirectoryRequestBody = {
      resourceType,
      id: directoryForm.id,
      name: directoryForm.name,
      directoryId: store.currentDirectoryId?.value
    }
    const res = await axios.patch('/api/directories', params)
    handleResponse(res, '更新完了！', store.fetchResources, directoryForm)
  }

  const deleteForm = reactive<{
    flag: boolean
    objectType?: 'resources' | 'directories'
    id?: string
    name?: string
  }>({
    flag: false,
    objectType: undefined,
    id: undefined,
    name: undefined
  })
  const confirmDelete = (resource: BasicObject, objectType: 'resources' | 'directories') => {
    deleteForm.flag = true
    deleteForm.objectType = objectType
    deleteForm.id = resource.id
    deleteForm.name = resource.name
  }
  const deleteObject = async (resourceType: ResourceType) => {
    const store = getStoreByResourceType(resourceType)
    const res = await axios.delete(`/api/${deleteForm.objectType}/${deleteForm.id}?resourceType=${resourceType}`)
    const result: boolean = handleResponse(res, '削除完了！', store.fetchResources, deleteForm)
    if (result) {
      if (store.showingResourceId) store.showingResourceId.value = undefined
    }
    deleteForm.objectType = undefined
    deleteForm.id = undefined
    deleteForm.name = undefined
  }

  const backToHome = (resourceType: ResourceType) => {
    const store = getStoreByResourceType(resourceType)
    if (store.currentDirectoryId) store.currentDirectoryId.value = undefined
    if (store.showingResourceId) store.showingResourceId.value = undefined
    store.breadcrumbs.value = []
    store.fetchResources()
  }
  const backDirectory = (resourceType: ResourceType, directoryId: string) => {
    const store = getStoreByResourceType(resourceType)
    if (store.currentDirectoryId) store.currentDirectoryId.value = directoryId
    const directoryIndex = store.breadcrumbs.value.findIndex((breadcrumb: { directoryId: string }) =>
      breadcrumb.directoryId === directoryId
    )
    if (directoryIndex < 0) {
      backToHome(resourceType)
      return
    }
    store.breadcrumbs.value = store.breadcrumbs.value.slice(0, directoryIndex + 1)
    if (store.showingResourceId) store.showingResourceId.value = undefined
    store.fetchResources()
  }
  const appendDirectory = (resourceType: ResourceType, directory: { name: string, id: string }) => {
    const store = getStoreByResourceType(resourceType)
    if (store.currentDirectoryId) store.currentDirectoryId.value = directory.id
    store.breadcrumbs.value.push({ name: directory.name, directoryId: directory.id })
    store.fetchResources()
  }

  return {
    getStoreByResourceType,
    directoryForm,
    openDirectoryCreateModal,
    openDirectoryEditModal,
    directoryCreating,
    directoryEditing,
    directoryFormValid,
    createDirectory,
    editDirectory,

    deleteForm,
    confirmDelete,
    deleteObject,

    backToHome,
    backDirectory,
    appendDirectory
  }
}

export type CommonStore = ReturnType<typeof buildCommonStore>
