import { reactive, computed, toRefs } from '@vue/composition-api'
import axios, { AxiosResponse } from 'axios'
import { Message } from 'element-ui'

import { ImagesStore } from '@/stores/images_store.ts'
import { Directory } from '~domains/index.ts'
import { Objekt, ObjektsResponse } from '~domains/objekts.ts'

export const buildObjektsStore = (stores: {
  imagesStore: ImagesStore
}) => {
  const state = reactive<{
    currentDirectory: string
    objekts: Objekt[]
    directories: Directory[]
    showingObjektIndex: number | undefined
    selectingName: string | undefined
  }>({
    currentDirectory: '/',
    objekts: [],
    directories: [],
    showingObjektIndex: undefined,
    selectingName: undefined
  })

  const fetchObjekts = async () => {
    const res: AxiosResponse<ObjektsResponse> = await axios.get(`/api/objekts?directory=${state.currentDirectory}`)
    const data: ObjektsResponse = res.data
    state.objekts = data.objekts
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
    const res = await axios.post(`/api/objekts/directories?directory=${state.currentDirectory}`, params)
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
      fetchObjekts()
    }
    directoryCreating.flag = false
  }

  const objektCreating = reactive<{
    flag: boolean
    name: string
    collision: boolean
  }>({
    flag: false,
    name: '',
    collision: false
  })
  const openObjektCreateModal = (refs: any) => {
    objektCreating.flag = true
    objektCreating.name = ''
    objektCreating.collision = false
    setTimeout(() => refs.objektCreateInput.focus(), 500)
  }
  const objektCreatable = computed<boolean>(() => {
    if (objektCreating.name.length === 0) return false
    if (!stores.imagesStore.selectingImagePath.value) return false
    return true
  })
  const createObjekt = async () => {
    if (!objektCreatable.value) return
    const params = {
      name: objektCreating.name,
      imagePath: stores.imagesStore.selectingImagePath.value,
      collision: objektCreating.collision
    }
    const res = await axios.post(`/api/objekts?directory=${state.currentDirectory}`, params)
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
      fetchObjekts()
    }
    objektCreating.flag = false
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
    const res = await axios.patch(`/api/objekts/directories?directory=${state.currentDirectory}`, params)
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
      fetchObjekts()
    }
    directoryEditing.flag = false
  }

  const objektEditing = reactive<{
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
  const openObjektEditModal = (refs: any, o: Objekt) => {
    objektEditing.flag = true
    objektEditing.beforeName = o.name
    objektEditing.collision = o.collision
    stores.imagesStore.setSelection(o.imagePath)
    setTimeout(() => {
      refs.objektNameEditor.focus()
      objektEditing.name = o.name
    })
  }
  const objektEditable = computed<boolean>(() => {
    if (objektEditing.name.length === 0) return false
    if (!stores.imagesStore.selectingImagePath.value) return false
    return true
  })
  const editObjekt = async () => {
    if (objektEditing.name.length === 0) return
    const params = {
      beforeName: objektEditing.beforeName,
      name: objektEditing.name,
      collision: objektEditing.collision,
      imagePath: stores.imagesStore.selectingImagePath.value
    }
    const res = await axios.patch(`/api/objekts?directory=${state.currentDirectory}`, params)
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
      fetchObjekts()
    }
    objektEditing.flag = false
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
    const res = await axios.patch(`/api/objekts/delete?directory=${state.currentDirectory}`, params)
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
      state.showingObjektIndex = undefined
      fetchObjekts()
    }
    deleting.flag = false
  }

  const showObjekt = (filename: string) => {
    const index = state.objekts.findIndex((i: Objekt) => i.name === filename)
    if (index < 0) return
    state.showingObjektIndex = index
  }
  const showingObjekt = computed<Objekt | undefined>(() => {
    if (state.showingObjektIndex === undefined) return
    return state.objekts[state.showingObjektIndex]
  })

  const backToHome = () => {
    state.currentDirectory = '/'
    state.showingObjektIndex = undefined
    fetchObjekts()
  }
  const appendDirectory = (dir: string) => {
    state.currentDirectory = `${state.currentDirectory}${dir}/`
    fetchObjekts()
  }
  const backDirectory = (i: number) => {
    state.currentDirectory = breadcrumbs.value.reduce((newDirectory: string, breadcrumb: string, j: number) => {
      if (j <= i) newDirectory += `${breadcrumb}/`
      return newDirectory
    }, '/')
    state.showingObjektIndex = undefined
    fetchObjekts()
  }
  const breadcrumbs = computed<string[]>(() => {
    return state.currentDirectory.split('/').filter((v: any) => v)
  })

  return {
    ...toRefs(state),
    fetchObjekts,

    directoryCreating,
    openDirectoryCreateModal,
    createDirectory,

    objektCreating,
    openObjektCreateModal,
    objektCreatable,
    createObjekt,

    directoryEditing,
    openDirectoryNameEditModal,
    editDirectoryName,

    objektEditing,
    openObjektEditModal,
    objektEditable,
    editObjekt,

    deleting,
    confirmDelete,
    deleteObject,

    showObjekt,
    showingObjekt,
    backToHome,
    appendDirectory,
    backDirectory,
    breadcrumbs
  }
}

export type ObjektsStore = ReturnType<typeof buildObjektsStore>
