<template lang="pug">
Tiles(:editable="editable")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Tiles from '@/components/MapResourcesConsole/list/Tiles.vue'

export default defineComponent({
  components: { Tiles },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  }
})
</script>
