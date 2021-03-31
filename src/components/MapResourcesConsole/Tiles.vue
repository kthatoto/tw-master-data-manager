<template lang="pug">
.tiles
  Resources(resourceKey="tiles" :editable="editable" :refs="$refs")

    template(slot="detail")
      TileDetail(:refs="$refs" :editable="editable")

    template(slot="resourceCreateModal")
      el-dialog.dialog.-tileCreate(v-if="resourceCreating" :visible.sync="resourceForm.flag")
        h2(slot="title") Tile作成
        h3 Tile
        h3 名前
        el-input.row(v-model="resourceForm.name" ref="resourceName")
        .buttons
          el-button(type="primary" @click="createResource" :disabled="!resourceFormValid") 作成

    template(slot="resourceEditModal")
      el-dialog.dialog.-tileEdit(v-if="resourceEditing" :visible.sync="resourceForm.flag")
        h2(slot="title") Tile変更
        h3 Tile
        h3 名前
        el-input.row(v-model="resourceForm.name" ref="resourceName")
        .buttons
          el-button(type="primary" @click="editResource" :disabled="!resourceFormValid") 更新
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import Resources from '@/components/MapResourcesConsole/Resources.vue'
import TileDetail from '@/components/MapResourcesConsole/TileDetail.vue'

export default defineComponent({
  components: { Resources, TileDetail },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup (_, context) {
    const commonStore = appStores.commonStore
    const tilesStore = appStores.tilesStore

    return {
      ...commonStore,
      ...tilesStore
    }
  }
})
</script>

<style lang="stylus" scoped>
.tiles
  .dialog
    .row
      margin-bottom: 10px
    .preview
      margin-bottom: 10px
      width: 200px
      height: 200px
      object-fit: contain
      image-rendering: pixelated
      border: 1px solid gray
    .buttons
      text-align: right
      .el-button
        width: 120px
</style>
