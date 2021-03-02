import { reactive, computed, toRefs } from '@vue/composition-api'
import axios, { AxiosResponse } from 'axios'
// import { Message } from 'element-ui'

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
  const openResourceEditModal = (refs: any, resource: Image) => {
    resourceForm.flag = true
    resourceForm.action = 'edit'
    resourceForm.beforeName = resource.name
    setTimeout(() => {
      refs.resourceName.focus()
      const splited: string[] = resource.name.split('.')
      resourceForm.extension = '.' + splited.pop()
      resourceForm.name = splited.join('.')
    }, 50)
  }

  const resourceFormValid = computed<boolean>(() => {
    if (!resourceForm.name) return false
    if (!resourceForm.raw) return false
    return true
  })
  const uploadImage = async (file: ImageFile) => {
    resourceForm.raw = file.raw
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
    fileReader.readAsBinaryString(resourceForm.raw)
  }

  const createResource = async () => {
    if (!resourceFormValid.value) return
    if (!resourceForm.raw) return
    console.log('create!')
  }

  // const editName = async () => {
  //   if (editing.name.length === 0) return
  //   const afterName = editing.isFile ? editing.name + editing.extension : editing.name
  //   const params = { before: editing.beforeName, after: afterName }
  //   const res = await axios.patch(`/api/images?directory=${state.currentDirectory}`, params)
  //   if (res.data && res.data.message) {
  //     Message({
  //       message: res.data.message,
  //       type: 'error'
  //     })
  //   } else {
  //     Message({
  //       message: '更新完了！',
  //       type: 'success'
  //     })
  //     fetchResources()
  //   }
  //   editing.flag = false
  // }

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

    // editing,
    // openEditModal,
    // editName,

    showResource,
    showingResource,

    breadcrumbs,

    selectingImagePath,
    setSelection
  }
}

export type ImagesStore = ReturnType<typeof buildImagesStore>
