import { reactive, computed } from '@vue/composition-api'
import axios from 'axios'

import { Image, ImagesResponse } from '~domains/images'
import handleResponse from '@/utils/handleResponse'
import useResources from '@/hooks/useResources'

import { ImagesCreateRequestBody } from '~server/api/images/create'
import { ImagesEditRequestBody } from '~server/api/images/edit'

interface ImageFile {
  name: string
  raw: File
  uid: number
}

export const buildImagesStore = (selector: Boolean) => {
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

  const resourcesHook = useResources<Image, ImagesResponse>('images', resourceForm, selector)

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
      directoryId: resourcesHook.currentDirectoryId.value
    }
    const res = await axios.post('/api/images', params)
    handleResponse(res, '作成完了！', resourcesHook.fetchResources, resourceForm)
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
      directoryId: resourcesHook.currentDirectoryId.value
    }
    const res = await axios.patch('/api/images', params)
    handleResponse(res, '更新完了！', resourcesHook.fetchResources, resourceForm)
  }

  return {
    ...resourcesHook,

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
