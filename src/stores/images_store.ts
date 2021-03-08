import { reactive, computed, toRefs } from '@vue/composition-api'
import axios, { AxiosResponse } from 'axios'

import { Directory } from '~domains/index.ts'
import { Image, ImagesResponse } from '~domains/images.ts'
import handleResponse from '@/utils/handleResponse.ts'

interface ImageFile {
  name: string
  raw: File
  uid: number
}

export const buildImagesStore = () => {
  const state = reactive<{
    currentDirectory: string
    resources: Image[]
    directories: Directory[]
    showingResourceIndex: number | undefined
    selectingName: string | undefined
  }>({
    currentDirectory: '/',
    resources: [],
    directories: [],
    showingResourceIndex: undefined,
    selectingName: undefined
  })

  const fetchResources = async () => {
    const res: AxiosResponse<ImagesResponse> = await axios.get(`/api/images?directory=${state.currentDirectory}`)
    const data: ImagesResponse = res.data
    state.resources = data.resources
    state.directories = data.directories
  }

  const resourceForm = reactive<{
    flag: boolean
    action?: 'create' | 'edit'
    beforeName: string
    name: string
    extension: string
    data?: string
  }>({
    flag: false,
    action: undefined,
    beforeName: '',
    name: '',
    extension: '',
    data: undefined
  })
  const resourceCreating = computed<boolean>(() => resourceForm.action === 'create')
  const resourceEditing = computed<boolean>(() => resourceForm.action === 'edit')

  const openResourceCreateModal = () => {
    resourceForm.flag = true
    resourceForm.action = 'create'
    resourceForm.beforeName = ''
    resourceForm.name = ''
    resourceForm.extension = ''
    resourceForm.data = undefined
  }
  const openResourceEditModal = (resource: Image) => {
    resourceForm.flag = true
    resourceForm.action = 'edit'
    resourceForm.beforeName = resource.name
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
    const params = {
      filePath: state.currentDirectory + resourceForm.name + resourceForm.extension,
      data: resourceForm.data
    }
    const res = await axios.post('/api/images', params)
    handleResponse(res, '作成完了！', fetchResources, resourceForm)
  }
  const editResource = async () => {
    if (!resourceFormValid.value) return
    const params = {
      beforeFilePath: state.currentDirectory + resourceForm.beforeName,
      filePath: state.currentDirectory + resourceForm.name + resourceForm.extension,
      data: resourceForm.data
    }
    const res = await axios.patch('/api/images', params)
    handleResponse(res, '更新完了！', fetchResources, resourceForm)
  }

  const showResource = (name: string) => {
    const index = state.resources.findIndex((r: Image) => r.name === name)
    if (index < 0) return
    state.showingResourceIndex = index
  }
  const showingResource = computed<Image | undefined>(() => {
    if (state.showingResourceIndex === undefined) return
    return state.resources[state.showingResourceIndex]
  })

  const breadcrumbs = computed<string[]>(() => {
    return state.currentDirectory.split('/').filter((v: any) => v)
  })

  return {
    ...toRefs(state),
    fetchResources,
    resourceForm,
    resourceCreating,
    resourceEditing,

    openResourceCreateModal,
    openResourceEditModal,

    resourceFormValid,
    uploadImage,
    createResource,
    editResource,

    showResource,
    showingResource,

    breadcrumbs
  }
}

export type ImagesStore = ReturnType<typeof buildImagesStore>
