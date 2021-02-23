<template lang="pug">
.detail
  ConsoleImage(:raw="showingTile.raw" width="100%" height="300px" lineHeight="300px")
  h3 {{ showingTile.name }}
  p サイズ：{{ bytes }}
  p 衝突：{{ showingTile.collision ? 'あり' : 'なし' }}
  p 画像：{{ showingTile.imagePath }}
  .buttons
    el-button(type="primary" @click="openTileEditModal(refs, showingTile)") 変更
    el-button(type="danger" @click="confirmDelete(showingTile.name)") 削除
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import bytesCalculate from '@/utils/bytesCalculator'
import ConsoleImage from '@/components/atoms/ConsoleImage.vue'

export default defineComponent({
  components: { ConsoleImage },
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
console-detail()
</style>
