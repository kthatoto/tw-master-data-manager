import { reactive, toRefs } from '@vue/composition-api'
import axios from 'axios'

export interface UploadingFile {
  name: string
  raw: File
  size: number
  uid: number
}

export const buildImagesStore = () => {
  const state = reactive<{
    currentDirectory: string
    images: string[]
  }>({
    currentDirectory: '',
    images: []
  })

  const fetchImages = async () => {
    const imagesRes = await axios.get(`/api/images?directory=${state.currentDirectory}`)
    imagesRes.data.forEach(async (filename: string) => {
      const image = (await import(`~data/images/${state.currentDirectory}${filename}`)).default
      state.images.push(image)
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
