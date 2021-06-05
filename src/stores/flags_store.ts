import { reactive, computed, toRefs } from '@vue/composition-api'
import axios from 'axios'

import { Flag, FlagsResponse } from '~domains/flags.ts'
import handleResponse from '@/utils/handleResponse.ts'
import resourceService from '@/services/resourceService.ts'

export const buildFlagsStore = () => {
  const {
    state,
    fetchResources,
    resourceCreating,
    resourceEditing,
    selectResource,
    selectingResource,
    showResource,
    showingResource
  } = resourceService<Flag, FlagsResponse>('flags', resourceForm)

  return {}
}

export type FlagsStore = ReturnType<typeof buildFlagsStore>
