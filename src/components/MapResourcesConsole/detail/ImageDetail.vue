<template lang="pug">
.detail
  ConsoleImage(:resource="showingResource" width="100%")
  h3 {{ showingResource.name }}
  .buttons(v-if="editable")
    el-button(type="primary" @click="openResourceEditModal(showingResource)") 変更
    el-button(type="danger" @click="confirmDelete(showingResource)") 削除
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'

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

    return {
      ...imagesStore
    }
  }
})
</script>

<style lang="stylus" scoped>
console-detail()
</style>
