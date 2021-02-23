<template lang="pug">
.items
  .items__header
    .buttons
      el-button.button(icon="el-icon-plus" type="primary" @click="openItemCreateModal($refs)") Item作成
      el-button.button(icon="el-icon-plus" type="primary" @click="openDirectoryCreateModal($refs)") フォルダ作成
    .nav
      icon.home-icon(name="home" @click.native="backToHome")
      .breadcrumb(v-for="(breadcrumb, i) in breadcrumbs" :key="i")
        icon.icon(name="chevron-right")
        span(@click="backDirectory(i)") {{ breadcrumb }}

  .items__content.content
    .items__item(v-for="o in directories" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      Icon.icon(name="folder" @dblclick.native="appendDirectory(o.name)" @click.right.prevent.native="confirmDelete(o.name)")
      span(@dblclick="openDirectoryNameEditModal($refs, o)") {{ o.name }}
    .items__item(v-for="o in items" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      ConsoleImage(
        :raw="o.raw" @dblclick="showItem(o.name)" @clickRight="confirmDelete(o.name)"
        width="80px" height="80px" lineHeight="80px"
      )
      span(@dblclick="openItemEditModal($refs, o)") {{ o.name }}

  el-dialog.dialog(:visible.sync="directoryCreating.flag")
    p フォルダの作成
    el-input(v-model="directoryCreating.name" ref="directoryCreateInput")
    .buttons
      el-button(type="primary" @click="createDirectory" :disabled="directoryCreating.name.length === 0") 作成

  el-dialog.dialog(:visible.sync="itemCreating.flag" width="700px")
    p Itemの作成
    .form
      .form__column.-left
        el-input(v-model="itemCreating.name" ref="itemCreateInput")
        el-checkbox(v-model="itemCreating.collision") 衝突
        el-button(type="primary" @click="createItem" :disabled="!itemCreatable") 作成
      .form__column.-right
        Images.form__images(:editable="false")

  el-dialog.dialog(:visible.sync="directoryEditing.flag")
    p フォルダの名前変更
    el-input(v-model="directoryEditing.name" ref="directoryNameEditor")
    .buttons
      el-button(type="primary" @click="editDirectoryName" :disabled="directoryEditing.name.length === 0") 更新

  el-dialog.dialog(:visible.sync="itemEditing.flag")
    p Itemの変更
    .form
      .form__column.-left
        el-input(v-model="itemEditing.name" ref="itemNameEditor")
        el-checkbox(v-model="itemEditing.collision") 衝突
        el-button(type="primary" @click="editItem" :disabled="!itemEditable") 変更
      .form__column.-right
        Images.form__images(:editable="false")

  el-dialog.dialog(:visible.sync="deleting.flag")
    p 「{{ deleting.name }}」削除していい？
    .buttons
      el-button(type="danger" @click="deleteObject") 削除
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import Images from '@/components/MapResourcesConsole/Images.vue'
import ConsoleImage from '@/components/atoms/ConsoleImage.vue'

export default defineComponent({
  components: { Images, ConsoleImage },
  setup () {
    const itemsStore = appStores.itemsStore

    onMounted(() => {
      itemsStore.fetchItems()
    })

    return { ...itemsStore }
  }
})
</script>

<style lang="stylus" scoped>
console(items)
.items
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
