import { AppStores } from '@/stores/appStores.ts'

export const buildCommonStore = (stores: AppStores) => {
  return {}
}

export type CommonStore = ReturnType<typeof buildCommonStore>
