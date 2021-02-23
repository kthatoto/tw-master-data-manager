<template lang="pug">
.resources
  .resources__wrapper
    ResourcesEditor.resources__content
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import ResourcesEditor from '@/components/ResourcesEditor.vue'

export default defineComponent({
  components: { ResourcesEditor }
})
</script>

<style lang="stylus" scoped>
.resources
  display: flex
  &__wrapper
    display: flex
    flex-direction: column
  &__content
    flex: 1
    width: 600px
    border-right: 1px solid gray
</style>
