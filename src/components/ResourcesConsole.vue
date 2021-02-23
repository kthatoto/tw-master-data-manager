<template lang="pug">
.console
  el-tabs(type="border-card")
    el-tab-pane(label="Items")
      .pane
        Items.list(:editable="true")
        ItemDetail.detail(v-if="showingItem")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Items from '@/components/ResourcesConsole/Items.vue'
import ItemDetail from '@/components/ResourcesConsole/ItemDetail.vue'
import { appStores } from '@/stores/appStores.ts'

export default defineComponent({
  components: { Items, ItemDetail },
  setup () {
    const itemsStore = appStores.itemsStore

    return { ...itemsStore }
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
    border-right: 1px solid lightgray
  .detail
    flex: 1
    padding: 10px
</style>
