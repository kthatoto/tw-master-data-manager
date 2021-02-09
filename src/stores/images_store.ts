import { reactive, toRefs } from '@vue/composition-api'
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
}

export const buildImagesStore = () => {
  const state = reactive<{
    currentDirectory: string
    images: string[]
    directories: string[]
  }>({
    currentDirectory: '',
    images: [],
    directories: []
  })

  const fetchImages = async () => {
    const res = await axios.get(`/api/images?directory=${state.currentDirectory}`)
    res.data.objects.forEach(async (obj: FileObject) => {
      if (obj.isFile) {
        const image = (await import(`~data/images/${state.currentDirectory}${obj.name}`)).default
        state.images.push(image)
      } else {
        state.directories.push(obj.name)
      }
    })
  }

  const uploadImage = async (file: UploadingFile) => {
    const params = new FormData()
    params.append('file', file.raw)
    params.append('filename', file.name)
    const headers = { 'content-type': 'multipart/form-data' }
    await axios.post('/api/images', params, { headers })
  }

  return {
    ...toRefs(state),
    fetchImages,
    uploadImage
  }
}

export type ImagesStore = ReturnType<typeof buildImagesStore>
