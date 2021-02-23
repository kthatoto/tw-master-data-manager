<template lang="pug">
img(v-if="raw" :src="raw" @dblclick="_dblclick" @click.right.prevent="_clickRight"
  :style="{ width, height }")
.noimage(v-else @dblclick="_dblclick" @click.right.prevent="_clickRight"
  :style="{ width, height, lineHeight }") No Image
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    raw: {
      type: String,
      required: false,
      default: null
    },
    dblclick: {
      type: Function,
      required: false,
      default: null
    },
    clickRight: {
      type: Function,
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
  setup (props) {
    const _dblclick = () => {
      if (props.dblclick) props.dblclick()
    }
    const _clickRight = () => {
      if (props.clickRight) props.clickRight()
    }

    return {
      _dblclick, _clickRight
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
  height: 100px
  line-height: 100px
</style>
