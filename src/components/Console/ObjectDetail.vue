<template lang="pug">
.detail
  img(:src="showingObject.raw")
  h3 {{ showingObject.name }}
  p サイズ：{{ bytes }}
  p 衝突：{{ showingObject.collision ? 'あり' : 'なし' }}
  p 画像：{{ showingObject.imagePath }}
  .buttons
    el-button(type="primary" @click="openObjectEditModal(refs, showingObject)") 変更
    el-button(type="danger" @click="confirmDelete(showingObject.name)") 削除
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
    }
  },
  setup (props) {
    const tilesStore = appStores.tilesStore

    const bytes = computed<string>(() => {
      if (!tilesStore.showingObject.value) return ''
      return bytesCalculate(tilesStore.showingObject.value.size)
    })

    return {
      ...tilesStore,
      bytes
    }
  }
})
</script>

<style lang="stylus" scoped>
console-detail()
</style>
