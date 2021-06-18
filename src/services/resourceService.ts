import { reactive, computed, toRefs, UnwrapRef } from '@vue/composition-api'
import axios, { AxiosResponse } from 'axios'

import { BasicObject, Directory } from '~domains/index.ts'
import { ResourceType } from '~server/index.ts'

import handleResponse from '@/utils/handleResponse.ts'
import useDirectories from '@/hooks/useDirectories.ts'

interface ResourceInterface {
  id: string
  name: string
}

interface ResourcesResponseInterface<Resource> {
  resources: Resource[]
  directories: Directory[]
  parentDirectories?: Directory[]
}

interface State<Resource> {
  resources: Resource[]
  directories: Directory[]
  showingResourceId?: string
  selectingResourceId?: string
  breadcrumbs: Directory[]
}

interface ResourceForm {
  action?: 'create' | 'edit'
}

interface FetchParams {
  directoryNames?: string // ":aaa:bbb:ccc"
}

type ObjectType = 'resources' | 'directories'

export default <Resource extends ResourceInterface, ResourcesResponse extends ResourcesResponseInterface<Resource>>(
  resourceType: ResourceType,
  resourceForm: ResourceForm
) => {
  const state = reactive<State<Resource>>({
    resources: [],
    directories: [],
    showingResourceId: undefined,
    selectingResourceId: undefined,
    breadcrumbs: []
  })

  const currentDirectoryId = computed<string | undefined>(() => {
    if (state.breadcrumbs.length === 0) return undefined
    const lastBreadcrumb = state.breadcrumbs[state.breadcrumbs.length - 1]
    return lastBreadcrumb.id
  })

  const fetchResources = async (fetchParams: FetchParams = {}) => {
    let params = ''
    if (Object.keys(fetchParams).length > 0) {
      const keys = Object.keys(fetchParams) as (keyof FetchParams)[]
      params = keys.map((key: keyof FetchParams) => `${key}=${fetchParams[key] || ''}`).join('&')
    } else {
      params = `directoryId=${currentDirectoryId.value || ''}`
    }
    const res: AxiosResponse<ResourcesResponse> = await axios.get(`/api/${resourceType}?${params}`)
    const data: ResourcesResponse = res.data
    state.resources = data.resources
    state.directories = data.directories
    if (data.parentDirectories) {
      state.breadcrumbs = data.parentDirectories
    }
  }

  const resourceCreating = computed<boolean>(() => resourceForm.action === 'create')
  const resourceEditing = computed<boolean>(() => resourceForm.action === 'edit')

  const selectResource = (id: string) => {
    state.selectingResourceId = id
  }
  const selectingResource = computed<Resource | undefined>(() =>
    state.resources.find((r: Resource) => r.id === state.selectingResourceId)
  )

  const showResource = (id: string) => {
    state.showingResourceId = id

    let newPath = `/map/${resourceType}/:`
    const directoryPath = state.breadcrumbs.map(bc => bc.name).join(':')
    newPath += directoryPath
    history.pushState(null, '', `${newPath}/${showingResource.value!.name}`)
  }
  const showResourceByName = (name: string) => {
    const target: Resource | undefined = state.resources.find((resource: Resource) => resource.name === name)
    if (!target) return
    state.showingResourceId = target.id
  }
  const showingResource = computed<Resource | undefined>(() =>
    state.resources.find((r: Resource) => r.id === state.showingResourceId)
  )

  const directoriesHook = useDirectories(
    resourceType,
    currentDirectoryId,
    fetchResources
  )

  const deleteForm = reactive<{
    flag: boolean
    objectType?: ObjectType
    id?: string
    name?: string
  }>({
    flag: false,
    objectType: undefined,
    id: undefined,
    name: undefined
  })
  const confirmDelete = (resource: BasicObject, objectType: ObjectType) => {
    deleteForm.flag = true
    deleteForm.objectType = objectType
    deleteForm.id = resource.id
    deleteForm.name = resource.name
  }
  const deleteObject = async () => {
    const res = await axios.delete(`/api/${deleteForm.objectType}/${deleteForm.id}?resourceType=${resourceType}`)
    const result: boolean = handleResponse(res, '削除完了！', fetchResources, deleteForm)
    if (result) state.showingResourceId = undefined
    deleteForm.objectType = undefined
    deleteForm.id = undefined
    deleteForm.name = undefined
  }

  const backToHome = () => {
    state.showingResourceId = undefined
    state.breadcrumbs = []
    fetchResources()
    updatePathForDirectory()
  }
  const backDirectory = (directoryId: string) => {
    const directoryIndex = state.breadcrumbs.findIndex((bc: { id: string }) => bc.id === directoryId)
    if (directoryIndex < 0) {
      backToHome()
      return
    }
    state.showingResourceId = undefined
    state.breadcrumbs = state.breadcrumbs.slice(0, directoryIndex + 1)
    fetchResources()
    updatePathForDirectory()
  }
  const appendDirectory = (directory: Directory) => {
    state.breadcrumbs.push(directory)
    fetchResources()
    updatePathForDirectory()
  }

  const updatePathForDirectory = () => {
    let newPath = `/map/${resourceType}/:`
    const directoryPath = state.breadcrumbs.map(bc => bc.name).join(':')
    newPath += directoryPath
    history.pushState(null, '', newPath)
  }

  return {
    ...toRefs(state),
    // state: state as UnwrapRef<State<Resource>>,
    currentDirectoryId,
    fetchResources,
    resourceCreating,
    resourceEditing,
    selectResource,
    selectingResource,
    showResource,
    showResourceByName,
    showingResource,

    ...directoriesHook,

    deleteForm,
    confirmDelete,
    deleteObject,

    backToHome,
    backDirectory,
    appendDirectory
  }
}
