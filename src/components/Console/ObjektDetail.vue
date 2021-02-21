<template lang="pug">
.detail
  img(:src="showingObjekt.raw")
  h3 {{ showingObjekt.name }}
  p サイズ：{{ bytes }}
  p 衝突：{{ showingObjekt.collision ? 'あり' : 'なし' }}
  p 画像：{{ showingObjekt.imagePath }}
  .buttons
    el-button(type="primary" @click="openObjektEditModal(refs, showingObjekt)") 変更
    el-button(type="danger" @click="confirmDelete(showingObjekt.name)") 削除
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
    const objektsStore = appStores.objektsStore

    const bytes = computed<string>(() => {
      if (!objektsStore.showingObjekt.value) return ''
      return bytesCalculate(objektsStore.showingObjekt.value.size)
    })

    return {
      ...objektsStore,
      bytes
    }
  }
})
</script>

<style lang="stylus" scoped>
console-detail()
</style>
