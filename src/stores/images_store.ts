import { reactive, computed, toRefs } from '@vue/composition-api'
import axios from 'axios'

export interface UploadingFile {
  name: string
  raw: File
  size: number
  uid: number
}

export interface FileObject {
  path: string
  name: string
  isFile: boolean
  image?: string
}

export const buildImagesStore = () => {
  const state = reactive<{
    currentDirectory: string
    images: FileObject[]
    directories: FileObject[]
  }>({
    currentDirectory: '',
    images: [],
    directories: []
  })

  const fetchImages = async () => {
    const res = await axios.get(`/api/images?directory=${state.currentDirectory}`)
    const images = []
    const directories = []
    for (const obj of res.data.objects) {
      if (obj.isFile) {
        obj.image = (await import(`~data/images/${state.currentDirectory}${obj.name}`)).default
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
    await axios.post('/api/images', params, { headers })
  }

  const changeDirectory = (dir: string) => {
    state.currentDirectory = dir
  }

  const appendDirectory = (dir: string) => {
    if (!state.currentDirectory) state.currentDirectory = dir
    else state.currentDirectory = `${state.currentDirectory}/${dir}`
  }

  const backDirectory = (i: number) => {
    state.currentDirectory = breadcrumbs.value.reduce((newDirectory: string[], breadcrumb: string, j: number) => {
      if (j <= i) newDirectory.push(breadcrumb)
      return newDirectory
    }, []).join('/')
  }

  const breadcrumbs = computed<string[]>(() => {
    if (state.currentDirectory.length === 0) return []
    return state.currentDirectory.split('/').filter((v: any) => v)
  })

  return {
    ...toRefs(state),
    fetchImages,
    uploadImage,
    changeDirectory,
    appendDirectory,
    backDirectory,
    breadcrumbs
  }
}

export type ImagesStore = ReturnType<typeof buildImagesStore>
