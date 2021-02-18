<template lang="pug">
.editor
  #container
    .large-box(:style="{ width: `${largeBoxSize}px`, height: `${largeBoxSize}px` }")
      canvas#mapCanvas
  .hud {{ state }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import mapCanvas, { largeBoxSize } from '@/canvas/mapCanvas/index'

export default defineComponent({
  setup () {
    const state = mapCanvas()
    return { largeBoxSize, state }
  }
})
</script>

<style lang="stylus" scoped>
.editor
  editorPadding = 100px
  background-color: lightgray
  position: relative
  #container
    width: "calc(100% - (%s * 2) - 2px)" % editorPadding
    height: "calc(100% - (%s * 2) - 2px)" % editorPadding
    border: 1px solid gray
    margin: editorPadding
    overflow: auto
    &::-webkit-scrollbar
      width: 8px
      height: 8px
      &-track
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1)
      &-thumb
        background-color: rgba(0, 0, 50, 0.5)
        border-radius: 0
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3)
  .large-box
    overflow: hidden

  .hud
    position: absolute
    top: 0
    left: 0
    background-color: gray
    color: white
</style>
