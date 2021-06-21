<template lang="pug">
Flags(:editable="editable")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Flags from '@/components/MapResourcesConsole/list/Flags.vue'

export default defineComponent({
  components: { Flags },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  }
})
</script>
