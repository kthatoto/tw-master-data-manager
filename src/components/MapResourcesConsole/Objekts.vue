<template lang="pug">
.objekts
  .objekts__header
    .buttons
      el-button.button(icon="el-icon-plus" type="primary" @click="openObjektCreateModal($refs)") Objekt作成
      el-button.button(icon="el-icon-plus" type="primary" @click="openDirectoryCreateModal($refs)") フォルダ作成
    .nav
      icon.home-icon(name="home" @click.native="backToHome")
      .breadcrumb(v-for="(breadcrumb, i) in breadcrumbs" :key="i")
        icon.icon(name="chevron-right")
        span(@click="backDirectory(i)") {{ breadcrumb }}

  .objekts__content.content(v-if="!showingObjekt")
    .objekts__item(v-for="o in directories" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      Icon.icon(name="folder" @dblclick.native="appendDirectory(o.name)" @click.right.prevent.native="confirmDelete(o.name)")
      span(@dblclick="openDirectoryNameEditModal($refs, o)") {{ o.name }}
    .objekts__item(v-for="o in objekts" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      ConsoleImage(
        :raw="o.raw" @dblclick="showObjekt(o.name)" @clickRight="confirmDelete(o.name)"
        width="80px" height="80px" lineHeight="80px"
      )
      span(@dblclick="openObjektEditModal($refs, o)") {{ o.name }}

  .objekts__detail.content(v-else)
    ObjektDetail(:refs="$refs")

  el-dialog.dialog(:visible.sync="directoryCreating.flag")
    p フォルダの作成
    el-input(v-model="directoryCreating.name" ref="directoryCreateInput")
    .buttons
      el-button(type="primary" @click="createDirectory" :disabled="directoryCreating.name.length === 0") 作成

  el-dialog.dialog(:visible.sync="objektCreating.flag" width="700px")
    p Objektの作成
    .form
      .form__column.-left
        el-input(v-model="objektCreating.name" ref="objektCreateInput")
        el-checkbox(v-model="objektCreating.collision") 衝突
        el-button(type="primary" @click="createObjekt" :disabled="!objektCreatable") 作成
      .form__column.-right
        Images.form__images(:editable="false")

  el-dialog.dialog(:visible.sync="directoryEditing.flag")
    p フォルダの名前変更
    el-input(v-model="directoryEditing.name" ref="directoryNameEditor")
    .buttons
      el-button(type="primary" @click="editDirectoryName" :disabled="directoryEditing.name.length === 0") 更新

  el-dialog.dialog(:visible.sync="objektEditing.flag")
    p Objektの変更
    .form
      .form__column.-left
        el-input(v-model="objektEditing.name" ref="objektNameEditor")
        el-checkbox(v-model="objektEditing.collision") 衝突
        el-button(type="primary" @click="editObjekt" :disabled="!objektEditable") 変更
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
import ObjektDetail from '@/components/MapResourcesConsole/ObjektDetail.vue'
import Images from '@/components/MapResourcesConsole/Images.vue'
import ConsoleImage from '@/components/atoms/ConsoleImage.vue'

export default defineComponent({
  components: { ObjektDetail, Images, ConsoleImage },
  setup () {
    const objektsStore = appStores.objektsStore

    onMounted(() => {
      objektsStore.fetchObjekts()
    })

    return { ...objektsStore }
  }
})
</script>

<style lang="stylus" scoped>
console(objekts)
.objekts
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
