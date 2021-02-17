<template lang="pug">
.editor
  #container
    .large-box
      canvas#mapCanvas
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

export default defineComponent({
  setup () {
    const padding = 300
    const makeCanvasFullScreen = () => {
      const container = document.getElementById('container')
      const canvas = document.getElementById('mapCanvas')
      canvas.width = container.clientWidth + padding * 2
      canvas.height = container.clientHeight + padding * 2
    }
    window.addEventListener('resize', () => {
      makeCanvasFullScreen()
    })

    const draw = (ctx: any, dx: number, dy: number) => {
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, 2000, 2000)
      ctx.fillStyle = '#333'
      ctx.fillRect(50 - dx, 50 - dy, 300, 300)
    }

    onMounted(() => {
      makeCanvasFullScreen()
      const canvas = document.getElementById('mapCanvas')
      const ctx = canvas.getContext('2d')
      draw(ctx, 0, 0)

      const scrollContainer: any = document.getElementById('container')
      const repositionCanvas = () => {
        const dx = scrollContainer.scrollLeft - padding
        const dy = scrollContainer.scrollTop - padding
        const canvas = document.getElementById('mapCanvas')
        canvas.style.transform = `translate(${dx}px, ${dy}px)`
        const ctx = canvas.getContext('2d')
        draw(ctx, dx, dy)
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
