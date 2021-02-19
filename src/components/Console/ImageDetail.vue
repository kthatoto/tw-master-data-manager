<template lang="pug">
.detail
  img(:src="showingImage.raw")
  h3 {{ showingImage.name }}
  p サイズ：{{ bytes }}
  .buttons(v-if="editable")
    el-button(type="primary" @click="openEditModal(refs, showingImage)") 名前変更
    el-button(type="danger" @click="confirmDelete(showingImage.name)") 削除
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
    const imagesStore = appStores.imagesStore

    const bytes = computed<string>(() => {
      if (!imagesStore.showingImage.value) return ''
      return bytesCalculate(imagesStore.showingImage.value.size)
    })

    return {
      ...imagesStore,
      bytes
    }
  }
})
</script>

<style lang="stylus" scoped>
console-detail()
</style>
