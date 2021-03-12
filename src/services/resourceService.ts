import { reactive } from '@vue/composition-api'
import axios, { AxiosResponse } from 'axios'

import { Directory } from '~domains/index.ts'
import { ResourceKey } from '~server/index.ts'

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

export default <Resource, ResourcesResponse extends ResourcesResponseInterface<Resource>>(resourceKey: ResourceKey) => {
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

  return {
    state,
    fetchResources
  }
}
