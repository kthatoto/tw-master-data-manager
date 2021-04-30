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
  showingResourceId?: string
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
    showingResourceId: undefined,
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
  const selectingResource = computed<Resource | Directory | undefined>(() =>
    state.resources.find((r: Resource) => r.id === state.selectingResourceId) ||
      state.directories.find((d: Directory) => d.id === state.selectingResourceId)
  )

  const showResource = (id: string) => {
    state.showingResourceId = id
  }
  const showingResource = computed<Resource | undefined>(() =>
    state.resources.find((r: Resource) => r.id === state.showingResourceId)
  )

  const breadcrumbs = computed<string[]>(() => {
    return state.currentDirectory.split('/').filter((v: any) => v)
  })

  return {
    state: state as UnwrapRef<State<Resource>>,
    fetchResources,
    resourceCreating,
    resourceEditing,
    selectResource,
    selectingResource,
    showResource,
    showingResource,
    breadcrumbs
  }
}
