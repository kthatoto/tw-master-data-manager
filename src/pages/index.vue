<template lang="pug">
.index
  MapEditor.editor
  MapResourcesConsole.console
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import MapEditor from '@/components/MapEditor.vue'
import MapResourcesConsole from '@/components/MapResourcesConsole.vue'

export default defineComponent({
  components: { MapEditor, MapResourcesConsole }
})
</script>

<style lang="stylus" scoped>
.index
  display: flex
  justify-content: space-between

  .editor
    width: calc(100% - 400px)
    background-color: white

  .console
    width: 400px
    height: 100%
    background-color: lightgray
</style>
