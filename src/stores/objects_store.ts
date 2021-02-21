import { reactive, computed, toRefs } from '@vue/composition-api'
import axios from 'axios'
import { Message } from 'element-ui'

import { ImagesStore } from '@/stores/images_store.ts'

export interface Object {
  fullPath: string
  name: string
  size: number
  collision: boolean
  imagePath: string
  raw: string
  isFile: true
}

interface Directory {
  fullPath: string
  name: string
  isFile: false
}

export const buildObjectsStore = (stores: {
  imagesStore: ImagesStore
}) => {
  const state = reactive<{
    currentDirectory: string
    tiles: Object[]
    directories: Directory[]
    showingObjectIndex: number | undefined
    selectingName: string | undefined
  }>({
    currentDirectory: '/',
    tiles: [],
    directories: [],
    showingObjectIndex: undefined,
    selectingName: undefined
  })

  const fetchObjects = async () => {
    const res = await axios.get(`/api/tiles?directory=${state.currentDirectory}`)
    state.tiles = res.data.tiles
    state.directories = res.data.directories
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
    const res = await axios.post(`/api/tiles/directories?directory=${state.currentDirectory}`, params)
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
      fetchObjects()
    }
    directoryCreating.flag = false
  }

  const tileCreating = reactive<{
    flag: boolean
    name: string
    collision: boolean
  }>({
    flag: false,
    name: '',
    collision: false
  })
  const openObjectCreateModal = (refs: any) => {
    tileCreating.flag = true
    tileCreating.name = ''
    tileCreating.collision = false
    setTimeout(() => refs.tileCreateInput.focus(), 500)
  }
  const tileCreatable = computed<boolean>(() => {
    if (tileCreating.name.length === 0) return false
    if (!stores.imagesStore.selectingImagePath.value) return false
    return true
  })
  const createObject = async () => {
    if (!tileCreatable.value) return
    const params = {
      name: tileCreating.name,
      imagePath: stores.imagesStore.selectingImagePath.value,
      collision: tileCreating.collision
    }
    const res = await axios.post(`/api/tiles?directory=${state.currentDirectory}`, params)
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
      fetchObjects()
    }
    tileCreating.flag = false
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
    const res = await axios.patch(`/api/tiles/directories?directory=${state.currentDirectory}`, params)
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
      fetchObjects()
    }
    directoryEditing.flag = false
  }

  const tileEditing = reactive<{
    flag: boolean
    beforeName: string
    name: string
    collision: boolean
  }>({
    flag: false,
    beforeName: '',
    name: '',
    collision: false
  })
  const openObjectEditModal = (refs: any, o: Object) => {
    tileEditing.flag = true
    tileEditing.beforeName = o.name
    tileEditing.collision = o.collision
    stores.imagesStore.setSelection(o.imagePath)
    setTimeout(() => {
      refs.tileNameEditor.focus()
      tileEditing.name = o.name
    })
  }
  const tileEditable = computed<boolean>(() => {
    if (tileEditing.name.length === 0) return false
    if (!stores.imagesStore.selectingImagePath.value) return false
    return true
  })
  const editObject = async () => {
    if (tileEditing.name.length === 0) return
    const params = {
      beforeName: tileEditing.beforeName,
      name: tileEditing.name,
      collision: tileEditing.collision,
      imagePath: stores.imagesStore.selectingImagePath.value
    }
    const res = await axios.patch(`/api/tiles?directory=${state.currentDirectory}`, params)
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
      fetchObjects()
    }
    tileEditing.flag = false
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
    const res = await axios.patch(`/api/tiles/delete?directory=${state.currentDirectory}`, params)
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
      state.showingObjectIndex = undefined
      fetchObjects()
    }
    deleting.flag = false
  }

  const showObject = (filename: string) => {
    const index = state.tiles.findIndex((i: Object) => i.name === filename)
    if (index < 0) return
    state.showingObjectIndex = index
  }
  const showingObject = computed<Object | undefined>(() => {
    if (state.showingObjectIndex === undefined) return
    return state.tiles[state.showingObjectIndex]
  })

  const backToHome = () => {
    state.currentDirectory = '/'
    state.showingObjectIndex = undefined
    fetchObjects()
  }
  const appendDirectory = (dir: string) => {
    state.currentDirectory = `${state.currentDirectory}${dir}/`
    fetchObjects()
  }
  const backDirectory = (i: number) => {
    state.currentDirectory = breadcrumbs.value.reduce((newDirectory: string, breadcrumb: string, j: number) => {
      if (j <= i) newDirectory += `${breadcrumb}/`
      return newDirectory
    }, '/')
    state.showingObjectIndex = undefined
    fetchObjects()
  }
  const breadcrumbs = computed<string[]>(() => {
    return state.currentDirectory.split('/').filter((v: any) => v)
  })

  return {
    ...toRefs(state),
    fetchObjects,

    directoryCreating,
    openDirectoryCreateModal,
    createDirectory,

    tileCreating,
    openObjectCreateModal,
    tileCreatable,
    createObject,

    directoryEditing,
    openDirectoryNameEditModal,
    editDirectoryName,

    tileEditing,
    openObjectEditModal,
    tileEditable,
    editObject,

    deleting,
    confirmDelete,
    deleteObject,

    showObject,
    showingObject,
    backToHome,
    appendDirectory,
    backDirectory,
    breadcrumbs
  }
}

export type ObjectsStore = ReturnType<typeof buildObjectsStore>
