<template lang="pug">
img(v-if="raw" :src="raw" @dblclick="dblclick" @click.right.prevent="clickRight"
  :style="{ width: `${size}px`, height: `${size}px` }")
.noimage(v-else @dblclick="dblclick" @click.right.prevent="clickRight"
  :style="{ width: `${size}px`, height: `${size}px`, lineHeight: `${size}px` }") No Image
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    raw: {
      type: String as () => string | null,
      default: null
    },
    dblclick: {
      type: Function as () => Function | null,
      default: null
    },
    clickRight: {
      type: Function as () => Function | null,
      default: null
    },
    size: {
      type: Number,
      required: true
    }
  }
})
</script>

<style lang="stylus" scoped>
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
</style>
