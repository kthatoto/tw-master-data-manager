<template lang="pug">
.detail
  img(:src="image.image")
  h3 {{ image.name }}
  p サイズ：{{ image.size }}B
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// import { appStores } from '@/stores/appStores.ts'

export default defineComponent({
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  setup () {
  }
})
</script>

<style lang="stylus" scoped>
.detail
  padding: 10px
  height: 100%
  img
    width: 100%
    border: 1px solid lightgray
  h3
    word-break: break-all
    margin-bottom: 10px
</style>
