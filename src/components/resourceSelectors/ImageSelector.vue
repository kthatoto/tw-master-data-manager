<template lang="pug">
el-dialog(:visible="visible" append-to-body @close="close" width="440px")
  h3(slot="title") Image選択
  .image-selector
    Images(:editable="false" :selector="true")
  div(slot="footer")
    el-button(type="primary" @click="selectImage" :disabled="!selectable") 選択
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import Images from '@/components/MapResourcesConsole/list/Images.vue'

export default defineComponent({
  components: { Images },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  setup (_, context) {
    const imagesStore = appStores.imagesStore

    const selectImage = () => {
      context.emit('select', imagesStore.selectingResource.value)
    }

    const close = () => {
      context.emit('close')
    }

    const selectable = computed<boolean>(() =>
      !!imagesStore.selectingResource.value
    )

    return {
      selectImage,
      close,
      selectable
    }
  }
})
</script>

<style lang="stylus" scoped>
.image-selector
  position: relative
  width: 400px
  max-height: 500px
  overflow-y: scroll
</style>
