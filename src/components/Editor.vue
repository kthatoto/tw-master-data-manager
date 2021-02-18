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
    const padding = 50
    const state = reactive<{
      container: any
      canvas: any
      ctx: any
      width: number
      height: number
      dx: number
      dy: number
    }>({
      container: undefined,
      canvas: undefined,
      ctx: undefined,
      width: 0,
      height: 0,
      dx: 0,
      dy: 0
    })

    const makeCanvasFullScreen = () => {
      state.container = document.getElementById('container')
      state.width = state.container.clientWidth
      state.height = state.container.clientHeight
      state.canvas.width = state.container.clientWidth + padding * 2
      state.canvas.height = state.container.clientHeight + padding * 2
    }
    window.addEventListener('resize', () => {
      makeCanvasFullScreen()
      draw()
    })

    const draw = () => {
      const { dx, dy } = state
      const ctx: any = state.ctx
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, 2000, 2000)
      ctx.fillStyle = '#333'
      ctx.fillRect(350 - dx, 350 - dy, 300, 300)

      // ruler
      const rulerSize = 30
      ctx.fillStyle = '#555'
      ctx.fillRect(padding, padding + rulerSize, rulerSize, state.height - rulerSize)
      ctx.fillRect(padding + rulerSize, padding, state.width - rulerSize, rulerSize)

      const origin = { x: dx + padding, y: dy + padding }
      const rulerOrigin = { x: origin.x + rulerSize, y: origin.y + rulerSize }
      const tileSize = 30
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = rulerOrigin.x; x < rulerOrigin.x + state.width - rulerSize; x++) {
        if (x % tileSize !== 0) continue
        ctx.moveTo(x - dx, rulerOrigin.y - dy)
        ctx.lineTo(x - dx, origin.y - dy)
        ctx.strokeStyle = '#fff'
        ctx.stroke()

        ctx.moveTo(x - dx, rulerOrigin.y - dy)
        ctx.lineTo(x - dx, rulerOrigin.y - dy + state.height - rulerSize)
        ctx.strokeStyle = '#333'
        ctx.stroke()
      }
      for (let y = rulerOrigin.y; y < rulerOrigin.y + state.height - rulerSize; y++) {
        if (y % tileSize !== 0) continue
        ctx.moveTo(rulerOrigin.x - dx, y - dy)
        ctx.lineTo(origin.x - dx, y - dy)
        ctx.strokeStyle = '#fff'
        ctx.stroke()

        ctx.moveTo(rulerOrigin.x - dx, y - dy)
        ctx.lineTo(rulerOrigin.x - dx + state.width - rulerSize, y - dy)
        ctx.strokeStyle = '#333'
        ctx.stroke()
      }
    }

    onMounted(() => {
      state.canvas = document.getElementById('mapCanvas')
      state.ctx = state.canvas.getContext('2d')
      makeCanvasFullScreen()

      const scrollContainer: any = document.getElementById('container')
      const repositionCanvas = () => {
        state.dx = scrollContainer.scrollLeft - padding
        state.dy = scrollContainer.scrollTop - padding
        state.canvas.style.transform = `translate(${state.dx}px, ${state.dy}px)`
        draw()
      }
      repositionCanvas()
      scrollContainer.addEventListener('scroll', repositionCanvas)
    })
  }
})
</script>

<style lang="stylus" scoped>
.editor
  editorPadding = 100px
  background-color: lightgray
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
    width: 10000px
    height: 10000px
    overflow: hidden
</style>
