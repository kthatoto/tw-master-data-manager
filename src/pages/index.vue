<template lang="pug">
.index
  MapEditor.editor
  Console.console
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import MapEditor from '@/components/MapEditor.vue'
import Console from '@/components/Console.vue'

export default defineComponent({
  components: { MapEditor, Console }
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
