import { reactive, computed } from '@vue/composition-api'
import axios from 'axios'

import { AppStores } from '@/stores/appStores.ts'
import { Directory } from '~domains/index.ts'
import handleResponse from '@/utils/handleResponse.ts'

export type StoreKey = 'images'

export const buildCommonStore = (stores: AppStores) => {
  const getStoreByKey = (key: StoreKey) => {
    if (key === 'images') return stores.imagesStore
    throw new Error(`Not handled key '${key}'`)
  }

  const directoryForm = reactive<{
    flag: boolean
    action?: 'create' | 'edit'
    beforeName: string
    name: string
  }>({
    flag: false,
    action: undefined,
    beforeName: '',
    name: ''
  })
  const openDirectoryCreateModal = (refs: any) => {
    directoryForm.flag = true
    directoryForm.action = 'create'
    directoryForm.name = ''
    setTimeout(() => refs.directoryName.focus(), 50)
  }
  const openDirectoryEditModal = (refs: any, directory: Directory) => {
    directoryForm.flag = true
    directoryForm.action = 'edit'
    directoryForm.beforeName = directory.name
    directoryForm.name = directory.name
    setTimeout(() => refs.directoryName.focus(), 50)
  }
  const directoryCreating = computed<boolean>(() => directoryForm.action === 'create')
  const directoryEditing = computed<boolean>(() => directoryForm.action === 'edit')
  const directoryFormValid = computed<boolean>(() => {
    if (!directoryForm.name) return false
    return true
  })
  const createDirectory = async (key: StoreKey) => {
    if (!directoryFormValid.value) return
    const store = getStoreByKey(key)
    const params = {
      directory: `${key}${store.currentDirectory.value}`,
      name: directoryForm.name
    }
    const res = await axios.post('/api/directories', params)
    handleResponse(res, '作成完了！', store.fetchResources, directoryForm)
  }
  const editDirectory = async (key: StoreKey) => {
    if (!directoryFormValid.value) return
    const store = getStoreByKey(key)
    const params = {
      directory: `${key}${store.currentDirectory.value}`,
      beforeName: directoryForm.beforeName,
      name: directoryForm.name
    }
    const res = await axios.patch('/api/directories', params)
    handleResponse(res, '変更完了！', store.fetchResources, directoryForm)
  }

  const deleteForm = reactive<{
    flag: boolean
    name: string
  }>({
    flag: false,
    name: ''
  })
  const confirmDelete = (name: string) => {
    deleteForm.flag = true
    deleteForm.name = name
  }
  const deleteObject = async (key: StoreKey) => {
    const store = getStoreByKey(key)
    const path = `${key}${store.currentDirectory.value}${deleteForm.name}`
    const res = await axios.delete(`/api/objects?path=${path}`)
    const result: boolean = handleResponse(res, '削除完了！', store.fetchResources, deleteForm)
    if (result) {
      store.showingResourceIndex.value = undefined
    }
    deleteForm.name = ''
  }

  const backToHome = (key: StoreKey) => {
    const store = getStoreByKey(key)
    store.currentDirectory.value = '/'
    store.showingResourceIndex.value = undefined
    store.fetchResources()
  }
  const backDirectory = (key: StoreKey, i: number) => {
    const store = getStoreByKey(key)
    store.currentDirectory.value = store.breadcrumbs.value.reduce((newDirectory: string, breadcrumb: string, j: number) => {
      if (j <= i) newDirectory += `${breadcrumb}/`
      return newDirectory
    }, '/')
    store.showingResourceIndex.value = undefined
    store.fetchResources()
  }
  const appendDirectory = (key: StoreKey, dir: string) => {
    const store = getStoreByKey(key)
    store.currentDirectory.value = `${store.currentDirectory.value}${dir}/`
    store.fetchResources()
  }

  return {
    getStoreByKey,
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
