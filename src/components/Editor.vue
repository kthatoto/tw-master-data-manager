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
    const makeCanvasFullScreen = () => {
      const editor = document.getElementsByClassName('editor')[0]
      const canvas = document.getElementById('mapCanvas')
      canvas.width = editor.clientWidth - 22
      canvas.height = editor.clientHeight - 22
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
        const dx = scrollContainer.scrollLeft
        const dy = scrollContainer.scrollTop
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
      &-track
        border-radius: 0
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1)
      &-thumb
        background-color: rgba(0, 0, 50, 0.5)
        border-radius: 4px
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3)
  .large-box
    width: 10000px
    height: 10000px
    overflow: hidden
</style>
