<template lang="pug">
.objects
  .objects__header
    .buttons
      el-button.button(icon="el-icon-plus" type="primary" @click="openObjectCreateModal($refs)") Object作成
      el-button.button(icon="el-icon-plus" type="primary" @click="openDirectoryCreateModal($refs)") フォルダ作成
    .nav
      icon.home-icon(name="home" @click.native="backToHome")
      .breadcrumb(v-for="(breadcrumb, i) in breadcrumbs" :key="i")
        icon.icon(name="chevron-right")
        span(@click="backDirectory(i)") {{ breadcrumb }}

  .objects__content.content(v-if="!showingObject")
    .objects__item(v-for="o in directories" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      Icon.icon(name="folder" @dblclick.native="appendDirectory(o.name)" @click.right.prevent.native="confirmDelete(o.name)")
      span(@dblclick="openDirectoryNameEditModal($refs, o)") {{ o.name }}
    .objects__item(v-for="o in objects" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      img(:src="o.raw" @dblclick="showObject(o.name)" @click.right.prevent="confirmDelete(o.name)")
      span(@dblclick="openObjectEditModal($refs, o)") {{ o.name }}

  .objects__detail.content(v-else)
    ObjectDetail(:refs="$refs")

  el-dialog.dialog(:visible.sync="directoryCreating.flag")
    p フォルダの作成
    el-input(v-model="directoryCreating.name" ref="directoryCreateInput")
    .buttons
      el-button(type="primary" @click="createDirectory" :disabled="directoryCreating.name.length === 0") 作成

  el-dialog.dialog(:visible.sync="objectCreating.flag" width="700px")
    p Objectの作成
    .form
      .form__column.-left
        el-input(v-model="objectCreating.name" ref="objectCreateInput")
        el-checkbox(v-model="objectCreating.collision") 衝突
        el-button(type="primary" @click="createObject" :disabled="!objectCreatable") 作成
      .form__column.-right
        Images.form__images(:editable="false")

  el-dialog.dialog(:visible.sync="directoryEditing.flag")
    p フォルダの名前変更
    el-input(v-model="directoryEditing.name" ref="directoryNameEditor")
    .buttons
      el-button(type="primary" @click="editDirectoryName" :disabled="directoryEditing.name.length === 0") 更新

  el-dialog.dialog(:visible.sync="objectEditing.flag")
    p Objectの変更
    .form
      .form__column.-left
        el-input(v-model="objectEditing.name" ref="objectNameEditor")
        el-checkbox(v-model="objectEditing.collision") 衝突
        el-button(type="primary" @click="editObject" :disabled="!objectEditable") 変更
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
import ObjectDetail from '@/components/Console/ObjectDetail.vue'
import Images from '@/components/Console/Images.vue'

export default defineComponent({
  components: { ObjectDetail, Images },
  setup () {
    const objectsStore = appStores.objectsStore

    onMounted(() => {
      objectsStore.fetchObjects()
    })

    return { ...objectsStore }
  }
})
</script>

<style lang="stylus" scoped>
console(objects)
.objects
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
