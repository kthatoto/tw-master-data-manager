<template lang="pug">
.image-set-editor
  .buttons
    el-button(size="mini" @click.prevent="toggleCollisionMode" round)
      el-checkbox(:value="collisionMode") 衝突操作
    el-button(size="mini" @click="sizeDown" round)
      icon(name="minus")
    el-button(size="mini" @click="sizeUp" round)
      icon(name="plus")

  .console(ref="console" :style="{ height: `${consoleWidth}px` }")
    .row(v-for="y in size")
      .cell(v-for="x in size" :style="cellStyle" @click="inputImage(x, y)" @click.right.prevent="removeImage(x, y)")
        ImageChipView(v-if="displayableFor(x, y)" :data="imageDataFor(x, y)")
        el-checkbox(v-if="collisionMode && displayableFor(x, y)" :value="collisionFor(x, y)" @input="toggleCollisionFor(x, y)")
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onMounted } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'
import { ImageChip } from '~domains/index'
import ImageChipView from '@/components/molecules/ImageChip.vue'

export default defineComponent({
  components: { ImageChipView },
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

    const collisionMode = ref<boolean>(false)
    const toggleCollisionMode = () => {
      collisionMode.value = !collisionMode.value
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

    const imagesStore = appStores.imagesSelectorStore
    const inputImage = (x: number, y: number) => {
      if (collisionMode.value) return
      const resource = imagesStore.selectingResource.value
      if (!resource) return
      context.emit('input', {
        x,
        y,
        id: resource.id,
        data: resource.data,
        name: resource.name
      })
    }

    const removeImage = (x: number, y: number) => {
      if (collisionMode.value) return
      context.emit('remove', { x, y })
    }

    const tilesStore = appStores.tilesStore
    const inputtedImage = (x: number, y: number) => {
      if (!tilesStore.resourceForm.images) return
      return tilesStore.resourceForm.images.find((ic: ImageChip) => ic.x === x && ic.y === y)
    }

    const displayableFor = (x: number, y: number) => {
      return !!inputtedImage(x, y)
    }
    const imageDataFor = (x: number, y: number) => {
      const ic: ImageChip | undefined = inputtedImage(x, y)
      if (!ic) return
      if (!tilesStore.resourceForm.imageData) return
      const imageData = tilesStore.resourceForm.imageData[ic.id]
      if (!imageData) return
      return imageData.data
    }
    const collisionFor = (x: number, y: number) => {
      const ic: ImageChip | undefined = inputtedImage(x, y)
      if (!ic) return false
      return ic.collision
    }
    const toggleCollisionFor = (x: number, y: number) => {
      const ic: ImageChip | undefined = inputtedImage(x, y)
      if (!ic) return
      context.emit('toggleCollision', { x, y })
    }

    return {
      size,
      sizeUp,
      sizeDown,
      collisionMode,
      toggleCollisionMode,
      consoleWidth,
      cellStyle,
      inputImage,
      removeImage,
      displayableFor,
      imageDataFor,
      collisionFor,
      toggleCollisionFor
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
    display: flex
    flex-direction: column-reverse
    .row
      display: flex
    .cell
      border: 1px solid lightgray
      cursor: pointer
      position: relative
      &:hover
        opacity: 0.8
        background-color: #eee
      img
        width: 100%
        height: 100%
        image-rendering: pixelated
      >>> .el-checkbox
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        &__input
          position: absolute
          top: 2px
          right: 2px
</style>
