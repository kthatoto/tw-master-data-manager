import { reactive, computed, toRefs } from '@vue/composition-api'
import axios from 'axios'
import { Message } from 'element-ui'

export interface UploadingFile {
  name: string
  raw: File
  size: number
  uid: number
}

export interface FileObject {
  fullPath: string
  name: string
  isFile: boolean
  size: number
  raw: string
}

export const buildImagesStore = () => {
  const state = reactive<{
    currentDirectory: string
    images: FileObject[]
    directories: FileObject[]
    showingImageIndex: number | undefined
    selectingName: string | undefined
  }>({
    currentDirectory: '/',
    images: [],
    directories: [],
    showingImageIndex: undefined,
    selectingName: undefined
  })

  const fetchImages = async () => {
    const res = await axios.get(`/api/images?directory=${state.currentDirectory}`)
    const images = []
    const directories = []
    for (const obj of res.data.objects) {
      if (obj.isFile) {
        images.push(obj)
      } else {
        directories.push(obj)
      }
    }
    state.images = images
    state.directories = directories
  }

  const uploadImage = async (file: UploadingFile) => {
    const params = new FormData()
    params.append('file', file.raw)
    params.append('filename', file.name)
    const headers = { 'content-type': 'multipart/form-data' }
    await axios.post(`/api/images?directory=${state.currentDirectory}`, params, { headers })
    fetchImages()
  }

  const creating = reactive<{
    flag: boolean
    name: string
  }>({
    flag: false,
    name: ''
  })
  const openCreateModal = (refs: any) => {
    creating.flag = true
    creating.name = ''
    setTimeout(() => refs.createInput.focus(), 50)
  }
  const createDirectory = async () => {
    if (creating.name.length === 0) return
    const params = { name: creating.name }
    const res = await axios.post(`/api/images/directories?directory=${state.currentDirectory}`, params)
    if (res.data && res.data.message) {
      Message({
        message: res.data.message,
        type: 'error'
      })
    } else {
      Message({
        message: '作成完了！',
        type: 'success'
      })
      fetchImages()
    }
    creating.flag = false
  }

  const editing = reactive<{
    flag: boolean
    isFile: boolean
    beforeName: string
    name: string
    extension: string
  }>({
    flag: false,
    isFile: false,
    beforeName: '',
    name: '',
    extension: ''
  })
  const openEditModal = (refs: any, o: FileObject) => {
    editing.flag = true
    editing.isFile = o.isFile
    editing.beforeName = o.name
    setTimeout(() => {
      refs.nameEditor.focus()
      if (o.isFile) {
        const splited: string[] = o.name.split('.')
        editing.extension = '.' + splited.pop()
        editing.name = splited.join('.')
      } else {
        editing.name = o.name
      }
    }, 50)
  }
  const editName = async () => {
    if (editing.name.length === 0) return
    const afterName = editing.isFile ? editing.name + editing.extension : editing.name
    const params = { before: editing.beforeName, after: afterName }
    const res = await axios.patch(`/api/images?directory=${state.currentDirectory}`, params)
    if (res.data && res.data.message) {
      Message({
        message: res.data.message,
        type: 'error'
      })
    } else {
      Message({
        message: '更新完了！',
        type: 'success'
      })
      fetchImages()
    }
    editing.flag = false
  }

  const deleting = reactive<{
    flag: boolean
    name: string
  }>({
    flag: false,
    name: ''
  })
  const confirmDelete = (name: string) => {
    deleting.flag = true
    deleting.name = name
  }
  const deleteObject = async () => {
    const params = { name: deleting.name }
    const res = await axios.patch(`/api/images/delete?directory=${state.currentDirectory}`, params)
    if (res.data && res.data.message) {
      Message({
        message: res.data.message,
        type: 'error'
      })
    } else {
      Message({
        message: '削除完了！',
        type: 'success'
      })
      fetchImages()
    }
    deleting.flag = false
  }

  const showImage = (filename: string) => {
    const index = state.images.findIndex((i: FileObject) => i.name === filename)
    if (index < 0) return
    state.showingImageIndex = index
  }
  const showingImage = computed<FileObject | undefined>(() => {
    if (state.showingImageIndex === undefined) return
    return state.images[state.showingImageIndex]
  })

  const backToHome = () => {
    state.currentDirectory = '/'
    state.showingImageIndex = undefined
    fetchImages()
  }

  const appendDirectory = (dir: string) => {
    state.currentDirectory = `${state.currentDirectory}${dir}/`
    fetchImages()
  }

  const backDirectory = (i: number) => {
    state.currentDirectory = breadcrumbs.value.reduce((newDirectory: string, breadcrumb: string, j: number) => {
      if (j <= i) newDirectory += `${breadcrumb}/`
      return newDirectory
    }, '/')
    state.showingImageIndex = undefined
    fetchImages()
  }

  const breadcrumbs = computed<string[]>(() => {
    return state.currentDirectory.split('/').filter((v: any) => v)
  })

  return {
    ...toRefs(state),
    fetchImages,
    uploadImage,

    creating,
    openCreateModal,
    createDirectory,

    editing,
    openEditModal,
    editName,

    deleting,
    confirmDelete,
    deleteObject,

    showImage,
    showingImage,
    backToHome,
    appendDirectory,
    backDirectory,
    breadcrumbs
  }
}

export type ImagesStore = ReturnType<typeof buildImagesStore>
