<template lang="pug">
.detail
  img(:src="'data:image;base64,' + showingResource.raw")
  h3 {{ showingResource.name }}
  p サイズ：{{ bytes }}
  .buttons(v-if="editable")
    el-button(type="primary" @click="openResourceEditModal(showingResource)") 変更
    el-button(type="danger" @click="confirmDelete(showingResource.name)") 削除
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import bytesCalculate from '@/utils/bytesCalculator'

export default defineComponent({
  props: {
    refs: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup (props) {
    const commonStore = appStores.commonStore
    const imagesStore = appStores.imagesStore

    const bytes = computed<string>(() => {
      if (!imagesStore.showingResource.value) return ''
      return bytesCalculate(imagesStore.showingResource.value.size)
    })

    return {
      ...commonStore,
      ...imagesStore,
      bytes
    }
  }
})
</script>

<style lang="stylus" scoped>
console-detail()
</style>
