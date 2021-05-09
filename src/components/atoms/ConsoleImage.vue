<template lang="pug">
img(v-if="imageData" :src="'data:image;base64,' + imageData" @dblclick="dblclick" @click.right.prevent="clickRight"
  :style="{ width, height }")
.noimage(v-else @dblclick="dblclick" @click.right.prevent="clickRight"
  :style="{ width, height, lineHeight }") No Image
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
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

    return {
      dblclick, clickRight, imageData
    }
  }
})
</script>

<style lang="stylus" scoped>
img
  image-rendering: pixelated
img, .noimage
  border: 1px solid lightgray
  object-fit: contain
  z-index: 1
  cursor: pointer
.noimage
  background-color: gray
  color: white
  text-align: center
  font-weight: bold
  font-size: 12px
  height: 100px
  line-height: 100px
</style>
