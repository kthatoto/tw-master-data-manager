<template lang="pug">
.detail
  ConsoleImage(:resource="showingResource" width="50%" resourceType="flags")
  h3 {{ showingResource.name }}

  table
    tr
      th key
      td {{ showingResource.key }}
    tr
      th description
      td {{ showingResource.key }}

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
    const flagsStore = appStores.flagsStore

    return {
      ...flagsStore
    }
  }
})
</script>

<style lang="stylus" scoped>
console-detail()
</style>
