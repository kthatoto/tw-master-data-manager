import { reactive, computed, toRefs } from '@vue/composition-api'
import axios, { AxiosResponse } from 'axios'
import { Message } from 'element-ui'

import { Directory } from '~domains/index.ts'
import { Image, ImagesResponse } from '~domains/images.ts'

interface ImageFile {
  name: string
  raw: File
  size: number
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

  const directory = computed<string>(() => {
    return 'images' + state.currentDirectory
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
    raw?: string
  }>({
    flag: false,
    action: undefined,
    beforeName: '',
    name: '',
    extension: '',
    raw: undefined
  })
  const resourceCreating = computed<boolean>(() => resourceForm.action === 'create')
  const resourceEditing = computed<boolean>(() => resourceForm.action === 'edit')

  const openResourceCreateModal = () => {
    resourceForm.flag = true
    resourceForm.action = 'create'
    resourceForm.beforeName = ''
    resourceForm.name = ''
    resourceForm.extension = ''
    resourceForm.raw = undefined
  }
  const openResourceEditModal = (resource: Image) => {
    resourceForm.flag = true
    resourceForm.action = 'edit'
    resourceForm.beforeName = resource.name
    resourceForm.raw = resource.raw || undefined
    const splited: string[] = resource.name.split('.')
    resourceForm.extension = '.' + splited.pop()
    resourceForm.name = splited.join('.')
  }

  const resourceFormValid = computed<boolean>(() => {
    if (!resourceForm.name) return false
    if (!resourceForm.raw) return false
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
        resourceForm.raw = base64String
      }
    })()
    fileReader.readAsBinaryString(file.raw)
  }

  const createResource = async () => {
    if (!resourceFormValid.value) return
    const params = {
      filePath: state.currentDirectory + resourceForm.name + resourceForm.extension,
      raw: resourceForm.raw
    }
    const res = await axios.post('/api/images', params)
    handleResponse(res, '作成完了！', fetchResources, resourceForm)
  }
  const editResource = async () => {
    if (!resourceFormValid.value) return
    const params = {
      beforeFilePath: state.currentDirectory + resourceForm.beforeName,
      filePath: state.currentDirectory + resourceForm.name + resourceForm.extension,
      raw: resourceForm.raw
    }
    const res = await axios.post('/api/images', params)
    handleResponse(res, '編集完了！', fetchResources, resourceForm)
  }

  const handleResponse = (res: any, successMessage: string, fetchResources: Function, flagManager: any) => {
    if (res.data && res.data.message) {
      Message({
        message: res.data.message,
        type: 'error'
      })
    } else {
      Message({
        message: successMessage,
        type: 'success'
      })
      fetchResources()
    }
    flagManager.flag = false
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

  const selectingImagePath = computed<string | undefined>(() => {
    return ''
  })
  const setSelection = (imagePath: string, imageExists: boolean) => {
  }
  // const selectingImagePath = computed<string | undefined>(() => {
  //   if (!state.selectingName) return
  //   if (!state.images.map((i: Image) => i.name).includes(state.selectingName)) return
  //   return `${state.currentDirectory}${state.selectingName}`
  // })
  // const setSelection = (imagePath: string, imageExists: boolean) => {
  //   if (!imageExists) {
  //     state.currentDirectory = '/'
  //     state.selectingName = ''
  //     return
  //   }
  //   const paths = imagePath.split('/').filter((v: string) => v)
  //   state.selectingName = paths.pop()
  //   if (paths.length === 0) {
  //     state.currentDirectory = '/'
  //   } else {
  //     state.currentDirectory = `/${paths.join('/')}/`
  //   }
  // }

  return {
    ...toRefs(state),
    directory,
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

    breadcrumbs,

    selectingImagePath,
    setSelection
  }
}

export type ImagesStore = ReturnType<typeof buildImagesStore>
