<template lang="pug">
.editor
  #container
    .large-box
      canvas#mapCanvas
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from '@vue/composition-api'

export default defineComponent({
  setup () {
    const padding = 300
    const state = reactive<{
      container: any
      canvas: any
      ctx: any
    }>({
      container: undefined,
      canvas: undefined,
      ctx: undefined
    })

    const makeCanvasFullScreen = () => {
      state.container = document.getElementById('container')
      state.canvas.width = state.container.clientWidth + padding * 2
      state.canvas.height = state.container.clientHeight + padding * 2
    }
    window.addEventListener('resize', () => {
      makeCanvasFullScreen()
    })

    const draw = (dx: number, dy: number) => {
      const ctx: any = state.ctx
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, 2000, 2000)
      ctx.fillStyle = '#333'
      ctx.fillRect(50 - dx, 50 - dy, 300, 300)
    }

    onMounted(() => {
      state.canvas = document.getElementById('mapCanvas')
      state.ctx = state.canvas.getContext('2d')
      makeCanvasFullScreen()
      draw(0, 0)

      const scrollContainer: any = document.getElementById('container')
      const repositionCanvas = () => {
        const dx = scrollContainer.scrollLeft - padding
        const dy = scrollContainer.scrollTop - padding
        state.canvas.style.transform = `translate(${dx}px, ${dy}px)`
        draw(dx, dy)
      }
      scrollContainer.addEventListener('scroll', repositionCanvas)
    })
  }
})
</script>

<style lang="stylus" scoped>
.editor
  background-color: lightgray
  #container
    width: calc(100% - 22px)
    height: calc(100% - 22px)
    border: 1px solid gray
    margin: 10px
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
    width: 10000px
    height: 10000px
    overflow: hidden
</style>
