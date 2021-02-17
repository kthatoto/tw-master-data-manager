<template lang="pug">
.tiles
  .tiles__header
    .buttons
      el-button.button(icon="el-icon-plus" type="primary") Tile追加
      el-button.button(icon="el-icon-plus" type="primary" @click="openCreateModal($refs)") フォルダ追加
    .nav
      icon.home-icon(name="home" @click.native="backToHome")
      .breadcrumb(v-for="(breadcrumb, i) in breadcrumbs" :key="i")
        icon.icon(name="chevron-right")
        span(@click="backDirectory(i)") {{ breadcrumb }}

  .tiles__content.content(v-if="!showingTile")
    .tiles__item(v-for="o in directories" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      Icon.icon(name="folder" @dblclick.native="appendDirectory(o.name)" @click.right.prevent.native="confirmDelete(o.name)")
      span(@dblclick="openEditModal($refs, o)") {{ o.name }}
    .tiles__item(v-for="o in tiles" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      img(:src="o.raw" @dblclick="showTile(o.name)" @click.right.prevent="confirmDelete(o.name)")
      span(@dblclick="openEditModal($refs, o)") {{ o.name }}

  .tiles__detail.content(v-else)
    TileDetail(:refs="$refs")

  el-dialog.dialog(:visible.sync="creating.flag")
    p フォルダの作成
    el-input(v-model="creating.name" ref="createInput")
    .buttons
      el-button(type="primary" @click="createDirectory" :disabled="creating.name.length === 0") 作成

  el-dialog.dialog(:visible.sync="deleting.flag")
    p 「{{ deleting.name }}」削除していい？
    .buttons
      el-button(type="danger" @click="deleteObject") 削除
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import TileDetail from '@/components/Console/TileDetail.vue'

export default defineComponent({
  components: { TileDetail },
  setup () {
    const tilesStore = appStores.tilesStore

    onMounted(() => {
      tilesStore.fetchTiles()
    })

    return { ...tilesStore }
  }
})
</script>

<style lang="stylus" scoped>
console(tiles)
</style>
