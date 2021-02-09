<template lang="pug">
.console
  el-tabs(type="border-card")
    el-tab-pane(label="Images")
      Images
    el-tab-pane(label="Map")
    el-tab-pane(label="NPC")
    el-tab-pane(label="Enemies")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Images from '@/components/Console/Images.vue'

export default defineComponent({
  components: { Images }
})
</script>

<style lang="stylus" scoped>
.console
  height: 100%
  >>> .el-tabs
    height: 100%
    &__content
      padding: 0
</style>
