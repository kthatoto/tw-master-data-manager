import { reactive, computed, toRefs } from '@vue/composition-api'
import axios from 'axios'

import { Image, ImagesResponse } from '~domains/images.ts'
import handleResponse from '@/utils/handleResponse.ts'
import resourceService from '@/services/resourceService.ts'

import { ImagesCreateRequestBody } from '~server/api/images/create.ts'
import { ImagesEditRequestBody } from '~server/api/images/edit.ts'

interface ImageFile {
  name: string
  raw: File
  uid: number
}

export const buildImagesStore = () => {
  const resourceForm = reactive<{
    flag: boolean
    action?: 'create' | 'edit'
    id?: string
    name?: string
    extension?: string
    data?: string
  }>({
    flag: false,
    action: undefined,
    id: undefined,
    name: undefined,
    extension: undefined,
    data: undefined
  })

  const {
    state,
    fetchResources,
    resourceCreating,
    resourceEditing,
    selectResource,
    selectingResource,
    showResource,
    showingResource
  } = resourceService<Image, ImagesResponse>('images', resourceForm)

  const openResourceCreateModal = () => {
    resourceForm.flag = true
    resourceForm.action = 'create'
    resourceForm.id = undefined
    resourceForm.name = ''
    resourceForm.extension = ''
    resourceForm.data = undefined
  }
  const openResourceEditModal = (resource: Image) => {
    resourceForm.flag = true
    resourceForm.action = 'edit'
    resourceForm.id = resource.id
    resourceForm.data = resource.data || undefined
    const splited: string[] = resource.name.split('.')
    resourceForm.extension = '.' + splited.pop()
    resourceForm.name = splited.join('.')
  }

  const resourceFormValid = computed<boolean>(() => {
    if (!resourceForm.name) return false
    if (!resourceForm.data) return false
    return true
  })
  const uploadImage = async (file: ImageFile) => {
    const splited: string[] = file.name.split('.')
    resourceForm.extension = '.' + splited.pop()
    resourceForm.name = splited.join('.')

    const fileReader = new FileReader()
    fileReader.onload = (() => {
      return (e: any) => {
        const binaryData = e.target.result
        const base64String = window.btoa(binaryData)
        resourceForm.data = base64String
      }
    })()
    fileReader.readAsBinaryString(file.raw)
  }

  const createResource = async () => {
    if (!resourceFormValid.value) return
    if (!resourceForm.name || !resourceForm.extension) return
    if (!resourceForm.data) return
    const params: ImagesCreateRequestBody = {
      name: resourceForm.name + resourceForm.extension,
      data: resourceForm.data,
      directoryId: state.currentDirectoryId
    }
    const res = await axios.post('/api/images', params)
    handleResponse(res, '作成完了！', fetchResources, resourceForm)
  }
  const editResource = async () => {
    if (!resourceFormValid.value) return
    if (!resourceForm.id) return
    if (!resourceForm.name || !resourceForm.extension) return
    if (!resourceForm.data) return
    const params: ImagesEditRequestBody = {
      id: resourceForm.id,
      name: resourceForm.name + resourceForm.extension,
      data: resourceForm.data,
      directoryId: state.currentDirectoryId
    }
    const res = await axios.patch('/api/images', params)
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

    resourceForm,

    openResourceCreateModal,
    openResourceEditModal,
    resourceFormValid,
    uploadImage,
    createResource,
    editResource
  }
}

export type ImagesStore = ReturnType<typeof buildImagesStore>
