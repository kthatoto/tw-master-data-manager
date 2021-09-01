<template lang="pug">
.console
  el-tabs(type="border-card" :value="resourceTab" :before-leave="beforeTabLeave")
    el-tab-pane(label="Images" name="images")
    el-tab-pane(label="Tiles" name="tiles")
    el-tab-pane(label="Flags" name="flags")
    NuxtChild.resource-pane(:editable="true")
  el-tabs.console-tabs(type="border-card" :value="consoleTab")
    el-tab-pane(label="Select" name="select")
      .console-pane
    el-tab-pane(label="Layers" name="layers")
      .console-pane
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'

export default defineComponent({
  setup (_, context) {
    const resourceTab = ref<string>('images')
    const consoleTab = ref<string>('')

    const routeName = context.root.$route.name!
    if (routeName.split('-').length === 2) {
      resourceTab.value = routeName.split('-')[1].toLowerCase()
    }

    const beforeTabLeave = (newTabName: string, oldTabName: string) => {
      if (resourceTab.value === newTabName) return true
      resourceTab.value = newTabName
      appStores.clearStoreByName(oldTabName)
      return new Promise<void>((resolve, reject) => {
        return context.root.$router
          .push(`/map/${newTabName.toLowerCase()}`)
          .then(() => resolve())
          .catch((err) => reject(err))
      })
    }

    return {
      resourceTab,
      consoleTab,
      beforeTabLeave
    }
  }
})
</script>

<style lang="stylus" scoped>
.console
  height: 100%
  display: flex
  flex-direction: column
  >>> .el-tabs
    &__content
      padding: 0
    &__item
      padding: 0 10px
    &--top.el-tabs--border-card>.el-tabs__header .el-tabs__item:nth-child(2)
      padding-left: 10px

  .resource-pane
    height: 50vh

  .console-tabs
    flex: 1
</style>
