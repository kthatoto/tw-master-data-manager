<template lang="pug">
.console
  el-tabs(type="border-card" v-model="tab")
    el-tab-pane(label="Images" name="images" :lazy="true")
      Images.pane(:editable="true")
    el-tab-pane(label="Tiles" name="tiles" :lazy="true")
      Tiles.pane(:editable="true")
    el-tab-pane(label="Flags" name="flags" :lazy="true")
      Flags.pane(:editable="true")
    el-tab-pane(label="Objekts" name="objekts" :lazy="true")
    el-tab-pane(label="NPCs" name="npcs" :lazy="true")
    el-tab-pane(label="Enemies" name="enemies" :lazy="true")
</template>

<script lang="ts">
import { defineComponent, ref, provide } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import Images from '@/components/MapResourcesConsole/Images.vue'
import Tiles from '@/components/MapResourcesConsole/Tiles.vue'
import Flags from '@/components/MapResourcesConsole/Flags.vue'

export default defineComponent({
  components: { Images, Tiles, Flags },
  setup () {
    const tab = ref<string>('images')
    provide('commonStore', appStores.commonStore)
    return { tab }
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
</style>
