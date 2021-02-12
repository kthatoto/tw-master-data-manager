<template lang="pug">
.tiles
  .tiles__header
    .buttons
      el-button.button(icon="el-icon-plus" type="primary") Tile追加
      el-button.button(icon="el-icon-plus" type="primary") フォルダ追加
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup () {
  }
})
</script>

<style lang="stylus" scoped>
</style>
