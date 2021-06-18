<template lang="pug">
Images(:editable="editable")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Images from '@/components/MapResourcesConsole/list/Images.vue'

export default defineComponent({
  components: { Images },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  }
})
</script>
