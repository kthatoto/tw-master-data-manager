import { reactive } from '@vue/composition-api'
import axios from 'axios'
import { Message } from 'element-ui'

import { AppStores } from '@/stores/appStores.ts'

type StoreKey = 'images' | 'tiles' | 'objekts' | 'items'

export const buildCommonStore = (stores: AppStores) => {
  const getStore = (key: StoreKey) => {
    if (key === 'images') return stores.imagesStore
    if (key === 'tiles') return stores.tilesStore
    if (key === 'objekts') return stores.objektsStore
    if (key === 'items') return stores.itemsStore
    throw new Error(`Not handled key '${key}'`)
  }

  const creatingDirectory = reactive<{
    flag: boolean
    name: string
  }>({
    flag: false,
    name: ''
  })
  const openCreateDirectoryModal = (refs: any, refName: string) => {
    creatingDirectory.flag = true
    creatingDirectory.name = ''
    setTimeout(() => refs[refName].focus(), 50)
  }
  const createDirectory = async (key: StoreKey) => {
    if (creatingDirectory.name.length === 0) return
    const store = getStore(key)

    const params = { name: creatingDirectory.name }
    const res = await axios.post(`/api/directories?directory=${store.directory.value}`, params)
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
      store.fetchResources()
    }
    creatingDirectory.flag = false
  }

  return {
    creatingDirectory,
    openCreateDirectoryModal,
    createDirectory
  }
}

export type CommonStore = ReturnType<typeof buildCommonStore>
