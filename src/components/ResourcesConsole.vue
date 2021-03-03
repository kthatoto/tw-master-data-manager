<template lang="pug">
.console
  el-tabs(type="border-card")
    el-tab-pane(label="Items")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// import { appStores } from '@/stores/appStores.ts'

export default defineComponent({
  components: {},
  setup () {
    return {}
  }
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
    display: flex
  .list
    width: 400px
    border-right: 1px solid lightgray
  .detail
    flex: 1
    padding: 10px
</style>
