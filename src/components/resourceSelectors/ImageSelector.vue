<template lang="pug">
.image-selector
  Images(:editable="false")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// import { appStores } from '@/stores/appStores.ts'
import Images from '@/components/MapResourcesConsole/Images.vue'

export default defineComponent({
  components: { Images },
  setup () {
    // const imagesStore = appStores.imagesStore
  }
})
</script>

<style lang="stylus" scoped>
</style>
