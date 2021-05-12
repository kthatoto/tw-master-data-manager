<template lang="pug" functional>
img(:src="'data:image;base64,' + props.data")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    data: {
      type: String,
      required: true
    }
  }
})
</script>
