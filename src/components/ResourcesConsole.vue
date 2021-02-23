<template lang="pug">
.console
  el-tabs(type="border-card")
    el-tab-pane(label="Items")
      Items.pane(:editable="true")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Items from '@/components/ResourcesConsole/Items.vue'

export default defineComponent({
  components: { Items }
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
