import { ref, reactive, computed, UnwrapRef } from '@vue/composition-api'
import axios, { AxiosResponse } from 'axios'

import { BasicObject, Directory, ResourceType } from '~domains/index.ts'

import handleResponse from '@/utils/handleResponse.ts'
import useDirectories from '@/hooks/useDirectories.ts'

interface ResourceBasic {
  id: string
  name: string
}

interface ResourcesResponseInterface<Resource> {
  resources: UnwrapRef<Resource[]>
  directories: Directory[]
  parentDirectories?: Directory[]
}

interface ResourceForm {
  action?: 'create' | 'edit'
}

interface FetchParams {
  directoryNames?: string // ":aaa:bbb:ccc"
}

type ObjectType = 'resources' | 'directories'

export default <Resource extends ResourceBasic, ResourcesResponse extends ResourcesResponseInterface<Resource>>(
  resourceType: ResourceType,
  resourceForm: ResourceForm,
  selector: Boolean = false
) => {
  const resources = ref<Resource[]>([])
  const directories = ref<Directory[]>([])
  const breadcrumbs = ref<Directory[]>([])
  const showingResourceId = ref<string | undefined>(undefined)
  const selectingResourceId = ref<string | undefined>(undefined)

  const currentDirectoryId = computed<string | undefined>(() => {
    if (breadcrumbs.value.length === 0) return undefined
    const lastBreadcrumb = breadcrumbs.value[breadcrumbs.value.length - 1]
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
    resources.value = data.resources
    directories.value = data.directories
    if (data.parentDirectories) {
      breadcrumbs.value = data.parentDirectories
    }
  }

  const resourceCreating = computed<boolean>(() => resourceForm.action === 'create')
  const resourceEditing = computed<boolean>(() => resourceForm.action === 'edit')

  const selectResource = (id: string) => {
    selectingResourceId.value = id
  }
  const selectingResource = computed<Resource | undefined>(() =>
    resources.value.find((r: ResourceBasic) => r.id === selectingResourceId.value) as (Resource | undefined)
  )

  const showResource = (id: string) => {
    showingResourceId.value = id

    if (!selector) {
      let newPath = `/map/${resourceType}/:`
      const directoryPath = breadcrumbs.value.map(bc => bc.name).join(':')
      newPath += directoryPath
      history.pushState(null, '', `${newPath}/${showingResource.value!.name}`)
    }
  }
  const showResourceByName = (name: string) => {
    const target: Resource | undefined = resources.value.find((resource: ResourceBasic) => resource.name === name) as (Resource | undefined)
    if (!target) return
    showingResourceId.value = target.id
  }
  const showingResource = computed<Resource | undefined>(() =>
    resources.value.find((r: ResourceBasic) => r.id === showingResourceId.value) as (Resource | undefined)
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
    if (result) showingResourceId.value = undefined
    deleteForm.objectType = undefined
    deleteForm.id = undefined
    deleteForm.name = undefined
  }

  const backToHome = () => {
    showingResourceId.value = undefined
    breadcrumbs.value = []
    fetchResources()
    if (!selector) updatePathForDirectory()
  }
  const backDirectory = (directoryId: string) => {
    const directoryIndex = breadcrumbs.value.findIndex((bc: { id: string }) => bc.id === directoryId)
    if (directoryIndex < 0) {
      backToHome()
      return
    }
    showingResourceId.value = undefined
    breadcrumbs.value = breadcrumbs.value.slice(0, directoryIndex + 1)
    fetchResources()
    if (!selector) updatePathForDirectory()
  }
  const appendDirectory = (directory: Directory) => {
    breadcrumbs.value.push(directory)
    fetchResources()
    if (!selector) updatePathForDirectory()
  }

  const updatePathForDirectory = () => {
    let newPath = `/map/${resourceType}/:`
    const directoryPath = breadcrumbs.value.map(bc => bc.name).join(':')
    newPath += directoryPath
    history.pushState(null, '', newPath)
  }

  return {
    resources,
    directories,
    breadcrumbs,
    showingResourceId,
    selectingResourceId,

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
