<template lang="pug">
.console-image(@dblclick="dblclick" @click.right.prevent="clickRight")
  img(v-if="imageData" :src="'data:image;base64,' + imageData" :style="{ width, height }")
  .image-set(v-else-if="imageSetDisplayable" ref="imageSet" :style="{ width, height }")
    .row(v-for="y in imageSetSize")
      .cell(v-for="x in imageSetSize" :style="cellStyle")
        ImageChipView(v-if="displayableFor(x, y)" :data="imageDataFor(x, y)")
  .flag(v-else-if="resourceType === 'flags'")
    img.flag(src="@/assets/flag.png" :style="{ width, height }")
  .noimage(v-else :style="{ width, height, lineHeight }") No Image
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, onMounted, watch } from '@vue/composition-api'

import { ImageChip } from '~domains/index.ts'
import ImageChipView from '@/components/molecules/ImageChip.vue'
import { ResourceType } from '~server/index.ts'

export default defineComponent({
  components: { ImageChipView },
  props: {
    resource: {
      type: Object,
      required: false,
      default: null
    },
    width: {
      type: String,
      required: false,
      default: null
    },
    height: {
      type: String,
      required: false,
      default: null
    },
    lineHeight: {
      type: String,
      required: false,
      default: null
    },
    resourceType: {
      type: String as PropType<ResourceType>,
      required: false,
      default: null
    }
  },
  setup (props, context) {
    const dblclick = () => {
      context.emit('dblclick')
    }
    const clickRight = () => {
      context.emit('clickRight')
    }

    const imageData = computed(() => {
      if (!props.resource) return
      return props.resource.data
    })

    const imageSetDisplayable = computed(() =>
      !!props.resource.images
    )
    const imageSetSize = computed(() => {
      if (!imageSetDisplayable.value) return
      const ics: ImageChip[] | undefined = props.resource.images
      if (!ics || ics.length === 0) return
      const xs = ics.map((ic: ImageChip) => ic.x)
      const ys = ics.map((ic: ImageChip) => ic.y)
      const maxX = Math.max.apply(undefined, xs)
      const maxY = Math.max.apply(undefined, ys)
      return Math.max(maxX, maxY)
    })

    const cellStyle = ref({})
    const calculateCellStyle = () => {
      if (!imageSetSize.value) return
      // @ts-ignore
      const imageSetWidth = context.refs.imageSet.clientWidth
      const cellWidth = imageSetWidth / imageSetSize.value
      cellStyle.value = {
        width: `${cellWidth}px`,
        height: `${cellWidth}px`
      }
    }
    onMounted(() => {
      if (imageSetDisplayable.value) {
        calculateCellStyle()
      }
    })
    watch(
      () => props.resource,
      () => {
        if (imageSetDisplayable.value) {
          calculateCellStyle()
        }
      }
    )

    const displayableFor = (x: number, y: number) => {
      if (!props.resource.images) return
      return !!props.resource.images.find((ic: ImageChip) => ic.x === x && ic.y === y)
    }
    const imageDataFor = (x: number, y: number) => {
      if (!props.resource.images) return
      if (!props.resource.imageData) return
      const ic = props.resource.images.find((ic: ImageChip) => ic.x === x && ic.y === y)
      if (!ic) return
      const imageData = props.resource.imageData[ic.id]
      if (!imageData) return
      return imageData.data
    }

    return {
      dblclick,
      clickRight,
      imageData,
      imageSetDisplayable,
      imageSetSize,
      cellStyle,
      displayableFor,
      imageDataFor
    }
  }
})
</script>

<style lang="stylus" scoped>
.console-image
  z-index: 1
  img
    image-rendering: pixelated
  img, .noimage, .image-set
    border: 1px solid lightgray
    object-fit: contain
    cursor: pointer
  img.flag
    image-rendering: auto
    background-color: white
  .noimage
    background-color: gray
    color: white
    text-align: center
    font-weight: bold
    font-size: 12px
    height: 100px
    line-height: 100px

  .image-set
    display: flex
    flex-direction: column-reverse
    .row
      display: flex
      .cell
        position: relative
        img
          border: none
          width: 100%
          height: 100%
          position: absolute
          top: 0
</style>
