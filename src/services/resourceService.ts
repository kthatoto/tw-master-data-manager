import { reactive, computed, UnwrapRef } from '@vue/composition-api'
import axios, { AxiosResponse } from 'axios'

import { Directory } from '~domains/index.ts'
import { ResourceKey } from '~server/index.ts'

interface ResourceInterface {
  id: string
}

interface ResourcesResponseInterface<Resource> {
  resources: Resource[]
  directories: Directory[]
}

interface State<Resource> {
  currentDirectory: string
  resources: Resource[]
  directories: Directory[]
  showingResourceIndex?: number
  selectingResourceId?: string
}

interface ResourceForm {
  action?: 'create' | 'edit'
}

export default <Resource extends ResourceInterface, ResourcesResponse extends ResourcesResponseInterface<Resource>>(
  resourceKey: ResourceKey,
  resourceForm: ResourceForm
) => {
  const state = reactive<State<Resource>>({
    currentDirectory: '/',
    resources: [],
    directories: [],
    showingResourceIndex: undefined,
    selectingResourceId: undefined
  }) as State<Resource>

  const fetchResources = async () => {
    const res: AxiosResponse<ResourcesResponse> = await axios.get(`/api/${resourceKey}?directory=${state.currentDirectory}`)
    const data: ResourcesResponse = res.data
    state.resources = data.resources
    state.directories = data.directories
  }

  const resourceCreating = computed<boolean>(() => resourceForm.action === 'create')
  const resourceEditing = computed<boolean>(() => resourceForm.action === 'edit')

  const selectResource = (id: string) => {
    state.selectingResourceId = id
  }

  const showResource = (id: string) => {
    const index = state.resources.findIndex((r: Resource) => r.id === id)
    if (index < 0) return
    state.showingResourceIndex = index
  }
  const showingResource = computed<Resource | undefined>(() => {
    if (state.showingResourceIndex === undefined) return
    return state.resources[state.showingResourceIndex]
  })

  const breadcrumbs = computed<string[]>(() => {
    return state.currentDirectory.split('/').filter((v: any) => v)
  })

  return {
    state: state as UnwrapRef<State<Resource>>,
    fetchResources,
    resourceCreating,
    resourceEditing,
    selectResource,
    showResource,
    showingResource,
    breadcrumbs
  }
}
