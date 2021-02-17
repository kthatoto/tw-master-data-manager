import { reactive, computed, toRefs } from '@vue/composition-api'
import axios from 'axios'
import { Message } from 'element-ui'

import { ImagesStore } from '@/stores/images_store.ts'

export interface Tile {
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

export const buildTilesStore = (stores: {
  imagesStore: ImagesStore
}) => {
  const state = reactive<{
    currentDirectory: string
    tiles: Tile[]
    directories: Directory[]
    showingTileIndex: number | undefined
    selectingName: string | undefined
  }>({
    currentDirectory: '/',
    tiles: [],
    directories: [],
    showingTileIndex: undefined,
    selectingName: undefined
  })

  const fetchTiles = async () => {
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
    setTimeout(() => refs.createInput.focus(), 50)
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
      fetchTiles()
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
  const openTileCreateModal = (refs: any) => {
    tileCreating.flag = true
    tileCreating.name = ''
    tileCreating.collision = false
    setTimeout(() => refs.createInput.focus(), 50)
  }
  const tileCreatable = computed<boolean>(() => {
    if (tileCreating.name.length === 0) return false
    if (!stores.imagesStore.selectingImagePath.value) return false
    return true
  })
  const createTile = async () => {
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
      fetchTiles()
    }
    tileCreating.flag = false
  }

  const editing = reactive<{
    flag: boolean
    beforeName: string
    name: string
    collision: boolean
    imagePath: string
  }>({
    flag: false,
    beforeName: '',
    name: '',
    collision: false,
    imagePath: ''
  })
  const openEditModal = (o: Tile | Directory) => {
    editing.flag = true
    editing.beforeName = o.name
    editing.name = o.name
    if (o.isFile) {
      editing.collision = o.collision
      editing.imagePath = o.imagePath
    }
  }
  const editDirectory = async () => {
    if (editing.name.length === 0) return
    const params = { before: editing.beforeName, after: directoryCreating.name }
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
      fetchTiles()
    }
    editing.flag = false
  }
  const editTile = async () => {
    if (editing.name.length === 0) return
    if (!editing.imagePath) return
    const params = {
      beforeName: editing.beforeName,
      name: editing.name,
      collision: editing.collision,
      imagePath: editing.imagePath
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
      fetchTiles()
    }
    editing.flag = false
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
      state.showingTileIndex = undefined
      fetchTiles()
    }
    deleting.flag = false
  }

  const showTile = (filename: string) => {
    const index = state.tiles.findIndex((i: Tile) => i.name === filename)
    if (index < 0) return
    state.showingTileIndex = index
  }
  const showingTile = computed<Tile | undefined>(() => {
    if (state.showingTileIndex === undefined) return
    return state.tiles[state.showingTileIndex]
  })

  const backToHome = () => {
    state.currentDirectory = '/'
    state.showingTileIndex = undefined
    fetchTiles()
  }
  const appendDirectory = (dir: string) => {
    state.currentDirectory = `${state.currentDirectory}${dir}/`
    fetchTiles()
  }
  const backDirectory = (i: number) => {
    state.currentDirectory = breadcrumbs.value.reduce((newDirectory: string, breadcrumb: string, j: number) => {
      if (j <= i) newDirectory += `${breadcrumb}/`
      return newDirectory
    }, '/')
    state.showingTileIndex = undefined
    fetchTiles()
  }
  const breadcrumbs = computed<string[]>(() => {
    return state.currentDirectory.split('/').filter((v: any) => v)
  })

  return {
    ...toRefs(state),
    fetchTiles,

    directoryCreating,
    openDirectoryCreateModal,
    createDirectory,

    tileCreating,
    openTileCreateModal,
    tileCreatable,
    createTile,

    editing,
    openEditModal,
    editDirectory,
    editTile,

    deleting,
    confirmDelete,
    deleteObject,

    showTile,
    showingTile,
    backToHome,
    appendDirectory,
    backDirectory,
    breadcrumbs
  }
}

export type TilesStore = ReturnType<typeof buildTilesStore>
