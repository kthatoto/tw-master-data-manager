<template lang="pug">
.image-set-editor
  .buttons
    el-button(size="mini" @click="sizeDown" round)
      icon(name="minus")
    el-button(size="mini" @click="sizeUp" round)
      icon(name="plus")

  .console(ref="console" :style="{ height: `${consoleWidth}px` }")
    .row(v-for="y in size")
      .cell(v-for="x in size" :style="cellStyle")
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onMounted } from '@vue/composition-api'

import { ImageChip } from '~domains/index.ts'

export default defineComponent({
  props: {
    images: {
      type: Array as PropType<ImageChip[]>,
      required: true
    }
  },
  setup (props, context) {
    const xs = props.images.map((ic: ImageChip) => ic.x)
    const ys = props.images.map((ic: ImageChip) => ic.y)
    const size = ref<number>(5)

    if (xs.length > 0 && ys.length > 0) {
      const maxX = Math.max.apply(undefined, xs)
      const maxY = Math.max.apply(undefined, ys)
      size.value = Math.max(maxX, maxY)
    }

    const sizeUp = () => {
      size.value++
    }

    const sizeDown = () => {
      size.value--
    }

    const consoleWidth = ref<number>(100)
    const cellStyle = computed(() => {
      const cellWidth = consoleWidth.value / size.value
      return {
        width: `${cellWidth}px`,
        height: `${cellWidth}px`
      }
    })
    onMounted(() => {
      // @ts-ignore
      consoleWidth.value = context.refs.console.clientWidth
    })

    return {
      size,
      sizeUp,
      sizeDown,
      consoleWidth,
      cellStyle
    }
  }
})
</script>

<style lang="stylus" scoped>
.image-set-editor
  margin-bottom: 10px
  .buttons
    display: flex
    justify-content: flex-end
    margin-bottom: 10px

  .console
    width: 100%
    .row
      display: flex
    .cell
      border: 1px solid lightgray
</style>
