import { reactive, computed, toRefs } from '@vue/composition-api'
import axios from 'axios'

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
    showingImage: FileObject | undefined
  }>({
    currentDirectory: '/',
    images: [],
    directories: [],
    showingImage: undefined
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

  const updateName = async (before: string, after: string) => {
    const params = { before, after }
    await axios.patch(`/api/images?directory=${state.currentDirectory}`, params)
    fetchImages()
  }

  const showImage = (filename: string) => {
    const index = state.images.findIndex((i: FileObject) => i.name === filename)
    if (index < 0) return
    state.showingImage = state.images[index]
  }

  const backToHome = () => {
    state.currentDirectory = '/'
    state.showingImage = undefined
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
    state.showingImage = undefined
    fetchImages()
  }

  const breadcrumbs = computed<string[]>(() => {
    return state.currentDirectory.split('/').filter((v: any) => v)
  })

  const deleteDirectory = async (name: string) => {
    const params = { name: 'aaa' }
    const res = await axios.patch(`/api/images/directories/delete?directory=${state.currentDirectory}`, params)
    console.log(res)
  }

  return {
    ...toRefs(state),
    fetchImages,
    uploadImage,
    updateName,
    showImage,
    backToHome,
    appendDirectory,
    backDirectory,
    breadcrumbs,
    deleteDirectory
  }
}

export type ImagesStore = ReturnType<typeof buildImagesStore>
