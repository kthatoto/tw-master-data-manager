import { reactive, toRefs } from '@vue/composition-api'
import axios from 'axios'

export const buildImagesStore = () => {
  const state = reactive<{
    currentDirectory: string
    images: any[]
  }>({
    currentDirectory: '.',
    images: []
  })

  const fetchImages = async () => {
    const imagesRes = await axios.get(`/api/images?directory=${state.currentDirectory}`)
    imagesRes.data.forEach(async (filename: string) => {
      const image = (await import(`~data/images/${state.currentDirectory}/${filename}`)).default
      state.images.push(image)
    })
  }

  return {
    ...toRefs(state),
    fetchImages
  }
}

export type ImagesStore = ReturnType<typeof buildImagesStore>
