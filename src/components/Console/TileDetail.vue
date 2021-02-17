<template lang="pug">
.detail
  img(:src="showingTile.raw")
  h3 {{ showingTile.name }}
  p サイズ：{{ bytes }}
  .buttons
    el-button(type="primary" @click="openEditModal(refs, showingTile)") 名前変更
    el-button(type="danger" @click="confirmDelete(showingTile.name)") 削除
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
      if (!tilesStore.showingTile.value) return ''
      return bytesCalculate(tilesStore.showingTile.value.size)
    })

    return {
      ...tilesStore,
      bytes
    }
  }
})
</script>

<style lang="stylus" scoped>
.detail
  padding: 10px
  height: 100%
  img
    width: 100%
    border: 1px solid lightgray
  h3
    word-break: break-all
    margin-bottom: 10px
  .buttons
    text-align: right
</style>
