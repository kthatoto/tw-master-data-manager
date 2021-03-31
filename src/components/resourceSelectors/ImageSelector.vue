<template lang="pug">
.image-selector
  h3(slot="title") Image選択
  Images(:editable="false")
  template(slot="footer")
    el-button(type="primary" @click="selectImage")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import Images from '@/components/MapResourcesConsole/Images.vue'

export default defineComponent({
  components: { Images },
  setup () {
    const imagesStore = appStores.imagesStore

    const selectImage = () => {
      imagesStore
    }

    return { selectImage }
  }
})
</script>

<style lang="stylus" scoped>
</style>
