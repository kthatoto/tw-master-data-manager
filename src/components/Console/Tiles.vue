<template lang="pug">
.tiles
  .tiles__header
    .buttons
      el-button.button(icon="el-icon-plus" type="primary" @click="openCreateModal($refs, 'tile')") Tile作成
      el-button.button(icon="el-icon-plus" type="primary" @click="openCreateModal($refs, 'directory')") フォルダ作成
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

  el-dialog.dialog(:visible.sync="creating.flag" :width="creating.mode === 'tile' ? '700px' : '50%'")
    template(v-if="creating.mode === 'directory'")
      p フォルダの作成
      el-input(v-model="creating.name" ref="createInput")
      .buttons
        el-button(type="primary" @click="createDirectory" :disabled="creating.name.length === 0") 作成

    template(v-else-if="creating.mode === 'tile'")
      p Tileの作成
      .form
        .form__column.-left
          el-input(v-model="creating.name" ref="createInput")
          el-checkbox(v-model="creating.collision") 衝突
          el-button(type="primary" @click="createTile" :disabled="!tileCreatable") 作成
        .form__column.-right
          Images.form__images(:editable="false")

  // el-dialog.dialog(v-if="editable" :visible.sync="editing.flag")
  //   el-input(v-model="editing.name" ref="nameEditor")
  //     template(v-if="editing.isFile" slot="append") {{ editing.extension }}
  //   .buttons
  //     el-button(type="primary" @click="editName" :disabled="editing.name.length === 0") 更新

  el-dialog.dialog(:visible.sync="deleting.flag")
    p 「{{ deleting.name }}」削除していい？
    .buttons
      el-button(type="danger" @click="deleteObject") 削除
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import TileDetail from '@/components/Console/TileDetail.vue'
import Images from '@/components/Console/Images.vue'

export default defineComponent({
  components: { TileDetail, Images },
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
.tiles
  .form
    display: flex
    justify-content: space-between
    &__column
      &.-left
        flex: 1
        padding-right: 20px
        border-right: 1px solid lightgray
      &.-right
        width: 400px
    &__images
      height: 600px
    .el-checkbox
      display: block
      margin-bottom: 20px
</style>
