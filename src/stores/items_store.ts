import { reactive, computed, toRefs } from '@vue/composition-api'
import axios, { AxiosResponse } from 'axios'
import { Message } from 'element-ui'

import { ImagesStore } from '@/stores/images_store.ts'
import { Directory, Value, valueCurrencies } from '~domains/index.ts'
import {
  Item,
  ItemsResponse,
  ItemCategory,
  ItemSubCategory,
  ItemEffect,
  ItemEffectKey,
  itemEffectAmountTypes,
  itemsSubCategoryRequiredEffectKeys
} from '~domains/items.ts'

export const buildItemsStore = (stores: {
  imagesStore: ImagesStore
}) => {
  const state = reactive<{
    currentDirectory: string
    items: Item[]
    directories: Directory[]
    showingItemIndex: number | undefined
    selectingName: string | undefined
  }>({
    currentDirectory: '/',
    items: [],
    directories: [],
    showingItemIndex: undefined,
    selectingName: undefined
  })

  const fetchItems = async () => {
    const res: AxiosResponse<ItemsResponse> = await axios.get(`/api/items?directory=${state.currentDirectory}`)
    const data: ItemsResponse = res.data
    state.items = data.items
    state.directories = data.directories
  }

  const directoryCreating = reactive<{
    flag: boolean
    name: string
  }>({
    flag: false,
    name: ''
  })
  const openDirectoryCreateModal = (refs: any) => {
    directoryCreating.flag = true
    directoryCreating.name = ''
    setTimeout(() => refs.directoryCreateInput.focus(), 50)
  }
  const createDirectory = async () => {
    if (directoryCreating.name.length === 0) return
    const params = { name: directoryCreating.name }
    const res = await axios.post(`/api/items/directories?directory=${state.currentDirectory}`, params)
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
      fetchItems()
    }
    directoryCreating.flag = false
  }

  const itemCreating = reactive<{
    flag: boolean
    name: string
    category?: ItemCategory
    subCategory?: ItemSubCategory
    value: Value
    effect: ItemEffect
  }>({
    flag: false,
    name: '',
    category: undefined,
    subCategory: undefined,
    value: {
      currency: 'gold',
      amount: 10
    },
    effect: {
      amount: undefined,
      amountType: 'absolute',
      durationSecond: undefined
    }
  })
  const openItemCreateModal = (refs: any) => {
    itemCreating.flag = true
    itemCreating.name = ''
    itemCreating.category = undefined
    itemCreating.subCategory = undefined
    itemCreating.value = { currency: 'gold', amount: 10 }
    itemCreating.effect = { amount: undefined, amountType: 'absolute', durationSecond: undefined }
    setTimeout(() => refs.itemCreateInput.focus(), 500)
  }
  const itemCreatable = computed<boolean>(() => {
    if (itemCreating.name.length === 0) return false
    if (!stores.imagesStore.selectingImagePath.value) return false
    if (!itemCreating.category) return false
    if (!itemCreating.subCategory) return false
    if (itemCreating.value.amount < 0) return false
    if (!valueCurrencies.includes(itemCreating.value.currency)) return false
    if (itemCreating.effect.amountType && !itemEffectAmountTypes.includes(itemCreating.effect.amountType)) return false
    const requiredEffectKeys: ItemEffectKey[] = itemsSubCategoryRequiredEffectKeys[itemCreating.subCategory]
    if (!requiredEffectKeys.every((key: ItemEffectKey) => itemCreating.effect[key])) return false
    return true
  })
  const createItem = async () => {
    if (!itemCreatable.value) return
    const params = {
      name: itemCreating.name,
      imagePath: stores.imagesStore.selectingImagePath.value,
      category: itemCreating.category,
      subCategory: itemCreating.subCategory,
      value: itemCreating.value,
      effect: itemCreating.effect
    }
    const res = await axios.post(`/api/items?directory=${state.currentDirectory}`, params)
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
      fetchItems()
    }
    itemCreating.flag = false
  }

  const directoryEditing = reactive<{
    flag: boolean
    beforeName: string
    name: string
  }>({
    flag: false,
    beforeName: '',
    name: ''
  })
  const openDirectoryNameEditModal = (refs: any, o: Directory) => {
    directoryEditing.flag = true
    directoryEditing.beforeName = o.name
    setTimeout(() => {
      refs.directoryNameEditor.focus()
      directoryEditing.name = o.name
    })
  }
  const editDirectoryName = async () => {
    if (directoryEditing.name.length === 0) return
    const params = { before: directoryEditing.beforeName, after: directoryEditing.name }
    const res = await axios.patch(`/api/items/directories?directory=${state.currentDirectory}`, params)
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
      fetchItems()
    }
    directoryEditing.flag = false
  }

  const itemEditing = reactive<{
    flag: boolean
    beforeName: string
    name: string
    category?: ItemCategory
    subCategory?: ItemSubCategory
    value: Value
    effect: ItemEffect
  }>({
    flag: false,
    beforeName: '',
    name: '',
    category: undefined,
    subCategory: undefined,
    value: {
      currency: 'gold',
      amount: 10
    },
    effect: {
      amount: undefined,
      amountType: 'absolute',
      durationSecond: undefined
    }
  })
  const openItemEditModal = (refs: any, o: Item) => {
    itemEditing.flag = true
    itemEditing.beforeName = o.name
    stores.imagesStore.setSelection(o.imagePath, !!o.raw)
    setTimeout(() => {
      refs.itemNameEditor.focus()
      itemEditing.name = o.name
    })
  }
  const itemEditable = computed<boolean>(() => {
    if (itemEditing.name.length === 0) return false
    if (!stores.imagesStore.selectingImagePath.value) return false
    if (!itemEditing.category) return false
    if (!itemEditing.subCategory) return false
    if (itemEditing.value.amount < 0) return false
    if (!valueCurrencies.includes(itemEditing.value.currency)) return false
    if (itemCreating.effect.amountType && !itemEffectAmountTypes.includes(itemCreating.effect.amountType)) return false
    const requiredEffectKeys: ItemEffectKey[] = itemsSubCategoryRequiredEffectKeys[itemEditing.subCategory]
    if (!requiredEffectKeys.every((key: ItemEffectKey) => itemEditing.effect[key])) return false
    return true
  })
  const editItem = async () => {
    if (!itemEditable.value) return
    const params = {
      beforeName: itemEditing.beforeName,
      name: itemEditing.name,
      imagePath: stores.imagesStore.selectingImagePath.value,
      category: itemEditing.category,
      subCategory: itemEditing.subCategory,
      value: itemEditing.value,
      effect: itemEditing.effect
    }
    const res = await axios.patch(`/api/items?directory=${state.currentDirectory}`, params)
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
      fetchItems()
    }
    itemEditing.flag = false
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
    const res = await axios.patch(`/api/items/delete?directory=${state.currentDirectory}`, params)
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
      state.showingItemIndex = undefined
      fetchItems()
    }
    deleting.flag = false
  }

  const showItem = (filename: string) => {
    const index = state.items.findIndex((i: Item) => i.name === filename)
    if (index < 0) return
    state.showingItemIndex = index
  }
  const showingItem = computed<Item | undefined>(() => {
    if (state.showingItemIndex === undefined) return
    return state.items[state.showingItemIndex]
  })

  const backToHome = () => {
    state.currentDirectory = '/'
    state.showingItemIndex = undefined
    fetchItems()
  }
  const appendDirectory = (dir: string) => {
    state.currentDirectory = `${state.currentDirectory}${dir}/`
    fetchItems()
  }
  const backDirectory = (i: number) => {
    state.currentDirectory = breadcrumbs.value.reduce((newDirectory: string, breadcrumb: string, j: number) => {
      if (j <= i) newDirectory += `${breadcrumb}/`
      return newDirectory
    }, '/')
    state.showingItemIndex = undefined
    fetchItems()
  }
  const breadcrumbs = computed<string[]>(() => {
    return state.currentDirectory.split('/').filter((v: any) => v)
  })

  return {
    ...toRefs(state),
    fetchItems,

    directoryCreating,
    openDirectoryCreateModal,
    createDirectory,

    itemCreating,
    openItemCreateModal,
    itemCreatable,
    createItem,

    directoryEditing,
    openDirectoryNameEditModal,
    editDirectoryName,

    itemEditing,
    openItemEditModal,
    itemEditable,
    editItem,

    deleting,
    confirmDelete,
    deleteObject,

    showItem,
    showingItem,
    backToHome,
    appendDirectory,
    backDirectory,
    breadcrumbs
  }
}

export type ItemsStore = ReturnType<typeof buildItemsStore>
