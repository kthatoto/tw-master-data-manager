<template lang="pug">
.detail
  ConsoleImage(:resource="showingResource" width="50%")
  h3 {{ showingResource.name }}

  .buttons(v-if="editable")
    el-button(type="primary" @click="openResourceEditModal(showingResource)") 変更
    el-button(type="danger" @click="confirmDelete(showingResource, 'resources')") 削除
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'
import ConsoleImage from '@/components/atoms/ConsoleImage.vue'

export default defineComponent({
  components: { ConsoleImage },
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
    const tilesStore = appStores.tilesStore

    return {
      ...tilesStore
    }
  }
})
</script>

<style lang="stylus" scoped>
console-detail()
</style>
