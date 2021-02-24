<template lang="pug">
.detail
  ConsoleImage(:raw="showingItem.raw" width="100%")
  h3 {{ showingItem.name }}
  p サイズ：{{ bytes }}
  p 画像：{{ showingItem.imagePath }}
  .buttons
    el-button(type="primary" @click="openItemEditModal(showingItem)") 変更
    el-button(type="danger" @click="confirmDelete(showingItem.name)") 削除
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import bytesCalculate from '@/utils/bytesCalculator'
import ConsoleImage from '@/components/atoms/ConsoleImage.vue'

export default defineComponent({
  components: { ConsoleImage },
  setup () {
    const itemsStore = appStores.itemsStore

    const bytes = computed<string>(() => {
      if (!itemsStore.showingItem.value) return ''
      return bytesCalculate(itemsStore.showingItem.value.size)
    })

    return {
      ...itemsStore,
      bytes
    }
  }
})
</script>

<style lang="stylus" scoped>
console-detail()
</style>
