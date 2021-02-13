import { reactive, computed, toRefs } from '@vue/composition-api'
import axios from 'axios'
import { Message } from 'element-ui'

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

export const buildTilesStore = () => {
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
    const tiles = []
    const directories = []
    for (const obj of res.data.objects) {
      if (obj.isFile) {
        tiles.push(obj)
      } else {
        directories.push(obj)
      }
    }
    state.tiles = tiles
    state.directories = directories
  }

  const creating = reactive<{
    flag: boolean
    name: string
    collision: boolean
    imagePath: string
  }>({
    flag: false,
    name: '',
    collision: false,
    imagePath: ''
  })
  const openCreateModal = (refs: any) => {
    creating.flag = true
    creating.name = ''
    creating.collision = false
    creating.imagePath = ''
    setTimeout(() => refs.createInput.focus(), 50)
  }
  const createDirectory = async () => {
    if (creating.name.length === 0) return
    const params = { name: creating.name }
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
    creating.flag = false
  }
  const createTile = async () => {
    if (creating.name.length === 0) return
    if (!creating.imagePath) return
    const params = {
      name: creating.name,
      imagePath: creating.imagePath,
      collision: creating.collision
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
    creating.flag = false
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
    const params = { before: editing.beforeName, after: creating.name }
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

    creating,
    openCreateModal,
    createDirectory,
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
