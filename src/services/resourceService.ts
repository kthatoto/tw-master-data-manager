import { reactive, computed } from '@vue/composition-api'
import axios, { AxiosResponse } from 'axios'

import { Directory } from '~domains/index.ts'
import { ResourceKey } from '~server/index.ts'

interface ResourceInterface {
  name: string
}

interface ResourcesResponseInterface<Resource> {
  resources: Resource[]
  directories: Directory[]
}

interface State<Resource> {
    currentDirectory: string
    resources: Resource[]
    directories: Directory[]
    showingResourceIndex: number | undefined
    selectingName: string | undefined
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
    selectingName: undefined
  })

  const fetchResources = async () => {
    const res: AxiosResponse<ResourcesResponse> = await axios.get(`/api/${resourceKey}?directory=${state.currentDirectory}`)
    const data: ResourcesResponse = res.data
    // @ts-ignore
    state.resources = data.resources
    // @ts-ignore
    state.directories = data.directories
  }

  const resourceCreating = computed<boolean>(() => resourceForm.action === 'create')
  const resourceEditing = computed<boolean>(() => resourceForm.action === 'edit')

  const showResource = (name: string) => {
    const index = state.resources.findIndex((r: Resource) => r.name === name)
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
    state,
    fetchResources,
    resourceCreating,
    resourceEditing,
    showResource,
    showingResource,
    breadcrumbs
  }
}
