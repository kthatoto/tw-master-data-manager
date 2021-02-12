<template lang="pug">
.detail
  img(:src="image.raw")
  h3 {{ image.name }}
  p サイズ：{{ bytes }}
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

// import { appStores } from '@/stores/appStores.ts'
import bytesCalculate from '@/utils/bytesCalculator'

export default defineComponent({
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const bytes = computed<string>(() => {
      return bytesCalculate(props.image.size)
    })

    return {
      bytes
    }
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
