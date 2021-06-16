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
}

interface State<Resource> {
  currentDirectoryId?: string
  resources: Resource[]
  directories: Directory[]
  showingResourceId?: string
  selectingResourceId?: string
  breadcrumbs: {
    name: string
    directoryId: string
  }[]
}

interface ResourceForm {
  action?: 'create' | 'edit'
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

  const fetchResources = async () => {
    const res: AxiosResponse<ResourcesResponse> = await axios.get(`/api/${resourceType}?directoryId=${state.currentDirectoryId || ''}`)
    const data: ResourcesResponse = res.data
    state.resources = data.resources
    state.directories = data.directories
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
    history.pushState(null, '', location.pathname + `/${showingResource.value!.name}`)
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
    showingResource
  }
}
