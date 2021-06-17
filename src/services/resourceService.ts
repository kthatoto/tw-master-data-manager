import { reactive, computed, UnwrapRef } from '@vue/composition-api'
import axios, { AxiosResponse } from 'axios'

import { Directory } from '~domains/index.ts'
import { ResourceType } from '~server/index.ts'

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
  currentDirectoryId?: string
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

export default <Resource extends ResourceInterface, ResourcesResponse extends ResourcesResponseInterface<Resource>>(
  resourceType: ResourceType,
  resourceForm: ResourceForm
) => {
  const state = reactive<State<Resource>>({
    currentDirectoryId: undefined,
    resources: [],
    directories: [],
    showingResourceId: undefined,
    selectingResourceId: undefined,
    breadcrumbs: []
  }) as State<Resource>

  const fetchResources = async (fetchParams: FetchParams = {}) => {
    let params = ''
    if (Object.keys(fetchParams).length > 0) {
      const keys = Object.keys(fetchParams) as (keyof FetchParams)[]
      params = keys.map((key: keyof FetchParams) => `${key}=${fetchParams[key] || ''}`).join('&')
    } else {
      params = `directoryId=${state.currentDirectoryId || ''}`
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

  return {
    state: state as UnwrapRef<State<Resource>>,
    fetchResources,
    resourceCreating,
    resourceEditing,
    selectResource,
    selectingResource,
    showResource,
    showResourceByName,
    showingResource
  }
}
