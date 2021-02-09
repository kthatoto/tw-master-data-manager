<template lang="pug">
.index
  Editor.editor
  Console.console
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Editor from '@/components/Editor.vue'
import Console from '@/components/Console.vue'

export default defineComponent({
  components: { Editor, Console }
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
