<template lang="pug">
.console
  el-tabs(type="border-card")
    el-tab-pane(label="Images")
      Images.pane(:editable="true")
    el-tab-pane(label="Tiles")
      Tiles.pane
    el-tab-pane(label="Objects")
      Objects.pane
    el-tab-pane(label="NPCs")
    el-tab-pane(label="Enemies")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Images from '@/components/Console/Images.vue'
import Tiles from '@/components/Console/Tiles.vue'

export default defineComponent({
  components: { Images, Tiles }
})
</script>

<style lang="stylus" scoped>
.console
  height: 100%
  >>> .el-tabs
    height: 60vh
    display: flex
    flex-direction: column
    &__content
      padding: 0
      flex: 1
    &__item
      padding: 0 10px
    .el-tab-pane
      height: 100%
    &--top.el-tabs--border-card>.el-tabs__header .el-tabs__item:nth-child(2)
      padding-left: 10px
  .pane
    height: 100%
</style>
