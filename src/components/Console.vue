<template lang="pug">
.console
  el-tabs(type="border-card")
    el-tab-pane(label="Images")
      Images.pane(:editable="true")
    el-tab-pane(label="Tiles")
    el-tab-pane(label="NPCs")
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
    display: flex
    flex-direction: column
    &__content
      padding: 0
      flex: 1
    .el-tab-pane
      height: 100%
  .pane
    height: 100%
</style>
