import { reactive } from '@vue/composition-api'
import axios, { AxiosResponse } from 'axios'

import { Directory } from '~domains/index.ts'
import { ResourceKey } from '~server/index.ts'

interface ResourcesResponseInterface<Resource> {
  resources: Resource[]
  directories: Directory[]
}

export default <Resource, ResourcesResponse extends ResourcesResponseInterface<Resource>>(resourceKey: ResourceKey) => {
  const state = reactive<{
    currentDirectory: string
    resources: Resource[]
    directories: Directory[]
    showingResourceIndex: number | undefined
    selectingName: string | undefined
  }>({
    currentDirectory: '/',
    resources: [],
    directories: [],
    showingResourceIndex: undefined,
    selectingName: undefined
  })

  const fetchResources = async () => {
    const res: AxiosResponse<ResourcesResponse> = await axios.get(`/api/${resourceKey}?directory=${state.currentDirectory}`)
    const data: ResourcesResponse = res.data
    state.resources = data.resources
    state.directories = data.directories
  }

  return {
    state,
    fetchResources
  }
}
