<template lang="pug">
.tiles
  .tiles__header
    .buttons
      el-button.button(icon="el-icon-plus" type="primary") Tile追加
      el-button.button(icon="el-icon-plus" type="primary") フォルダ追加
    .nav
      // icon.home-icon(name="home" @click.native="backToHome")
      icon.home-icon(name="home")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'

export default defineComponent({
  setup () {
    const tilesStore = appStores.tilesStore

    return { ...tilesStore }
  }
})
</script>

<style lang="stylus" scoped>
console(tiles)
</style>
