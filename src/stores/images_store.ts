import { reactive, toRefs } from "@vue/composition-api"
import axios from "axios"

export const buildImagesStore = () => {
  const state = reactive<{
    images: any[]
  }>({
    images: []
  })

  return {
    ...toRefs(state)
  }
}

export type ImagesStore = ReturnType<typeof buildImagesStore>
