<template lang="pug">
.detail
  img(:src="'data:image;base64,' + showingResource.image.data")
  h3 {{ showingResource.name }}

  .row
    label 衝突：
    span(v-if="showingResource.collision") あり
    span(v-else) なし

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
    const commonStore = appStores.commonStore
    const tilesStore = appStores.tilesStore

    return {
      ...commonStore,
      ...tilesStore
    }
  }
})
</script>

<style lang="stylus" scoped>
console-detail()
</style>
