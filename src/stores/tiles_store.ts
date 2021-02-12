// import { reactive, computed, toRefs } from '@vue/composition-api'
// import axios from 'axios'
// import { Message } from 'element-ui'

export interface FileObject {
  fullPath: string
  name: string
  isFile: string
  size: number
  raw: string
}

export const buildTilesStore = () => {
  // const state = reactive<{
  //   currentDirectory: string
  //   tiles: FileObject[]
  //   directories: FileObject[]
  // }>({
  // })
  return {}
}

export type TilesStore = ReturnType<typeof buildTilesStore>
