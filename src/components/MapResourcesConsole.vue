<template lang="pug">
.console
  el-tabs(type="border-card" :value="tab" :before-leave="beforeTabLeave")
    el-tab-pane(label="Images" name="images")
    el-tab-pane(label="Tiles" name="tiles")
    el-tab-pane(label="Flags" name="flags")
    NuxtChild.pane(:editable="true")
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'

export default defineComponent({
  setup (_, context) {
    const tab = ref<string>('images')

    const routeName = context.root.$route.name!
    if (routeName.split('-').length === 2) {
      tab.value = routeName.split('-')[1].toLowerCase()
    }

    const beforeTabLeave = (newTabName: string, oldTabName: string) => {
      if (tab.value === newTabName) return true
      tab.value = newTabName
      appStores.clearStoreByName(oldTabName)
      return new Promise<void>((resolve, reject) => {
        return context.root.$router
          .push(`/map/${newTabName.toLowerCase()}`)
          .then(() => resolve())
          .catch((err) => reject(err))
      })
    }

    return {
      tab,
      beforeTabLeave
    }
  }
})
</script>

<style lang="stylus" scoped>
.console
  height: 100%
  >>> .el-tabs
    &__content
      padding: 0
    &__item
      padding: 0 10px
    &--top.el-tabs--border-card>.el-tabs__header .el-tabs__item:nth-child(2)
      padding-left: 10px
  .pane
    height: 60vh
</style>
