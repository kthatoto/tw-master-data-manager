<template lang="pug">
.image-selector
  h3(slot="title") Image選択
  Images(:editable="false")
  div(slot="footer")
    el-button(type="primary" @click="selectImage" :disabled="!selectable") 選択
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import Images from '@/components/MapResourcesConsole/Images.vue'

export default defineComponent({
  components: { Images },
  setup (_, context) {
    const imagesStore = appStores.imagesStore

    const selectImage = () => {
      context.emit('select', imagesStore.selectingResource.value)
    }

    const selectable = computed<boolean>(() =>
      !!imagesStore.selectingResource.value
    )

    return {
      selectImage,
      selectable
    }
  }
})
</script>

<style lang="stylus" scoped>
</style>
