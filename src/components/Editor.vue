<template lang="pug">
.editor
  #container
    .large-box(:style="{ width: `${largeBoxSize}px`, height: `${largeBoxSize}px` }")
      canvas#mapCanvas
  .hud
    .state
      .row(v-for="(value, key) in state")
        .key {{ key }}
        .value {{ value }}
    .position-ui
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
  editorTopPadding = 150px
  editorSizePadding = 10px
  editorBottomPadding = 10px
  background-color: lightgray
  position: relative
  #container
    width: "calc(100% - (%s * 2) - 2px)" % editorSizePadding
    height: "calc(100% - %s - 2px)" % (editorTopPadding + editorBottomPadding)
    border: 1px solid gray
    margin: editorTopPadding editorSizePadding editorBottomPadding
    overflow: auto
    &::-webkit-scrollbar
      width: 8px
      height: 8px
      background-color: gray
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
    top: 10px
    left: editorSizePadding
    width: "calc(100% - (%s * 2) - 2px)" % editorSizePadding
    height: "calc(%s - 20px)" % editorTopPadding
    color: #333
    border: 1px solid #333
    border-radius: 4px
    .state
      position: absolute
      top: 5px
      left: 5px
      width: 200px
      height: calc(100% - 10px)
      overflow-y: scroll
      font-size: 12px
      .row
        display: flex
      .key
        width: 50px
        text-align: right
        padding-right: 10px
        font-weight: bold
      .value
        width: 150px
        overflow: hidden
</style>
