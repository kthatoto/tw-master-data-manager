<template lang="pug">
.images
  .images__header
    .buttons(v-if="editable")
      el-upload.button(
        action=""
        :auto-upload="false"
        :on-change="uploadImage"
        :show-file-list="false"
      )
        el-button(icon="el-icon-plus" type="primary") 画像追加
      el-button.button(icon="el-icon-plus" type="primary" @click="openCreateModal($refs)") フォルダ追加
    .nav
      icon.home-icon(name="home" @click.native="backToHome")
      .breadcrumb(v-for="(breadcrumb, i) in breadcrumbs" :key="i")
        icon.icon(name="chevron-right")
        span(@click="backDirectory(i)") {{ breadcrumb }}
  .images__content.content(v-if="!showingImage")
    .images__item(v-for="o in directories" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      Icon.icon(name="folder" @dblclick.native="appendDirectory(o.name)" @click.right.prevent.native="editable && confirmDelete(o.name)")
      span(@dblclick="editable && openEditModal($refs, o)") {{ o.name }}
    .images__item(v-for="o in images" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      img(:src="o.raw" @dblclick="showImage(o.name)" @click.right.prevent="editable && confirmDelete(o.name)")
      span(@dblclick="editable && openEditModal($refs, o)") {{ o.name }}
  .images__detail.content(v-else)
    ImageDetail(:refs="$refs")

  el-dialog.dialog(v-if="editable" :visible.sync="creating.flag")
    p フォルダの作成
    el-input(v-model="creating.name" ref="createInput")
    .buttons
      el-button(type="primary" @click="createDirectory" :disabled="creating.name.length === 0") 作成

  el-dialog.dialog(v-if="editable" :visible.sync="editing.flag")
    el-input(v-model="editing.name" ref="nameEditor")
      template(v-if="editing.isFile" slot="append") {{ editing.extension }}
    .buttons
      el-button(type="primary" @click="editName" :disabled="editing.name.length === 0") 更新

  el-dialog.dialog(v-if="editable" :visible.sync="deleting.flag")
    p 「{{ deleting.name }}」削除していい？
    .buttons
      el-button(type="danger" @click="deleteObject") 削除
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import ImageDetail from '@/components/Console/ImageDetail.vue'

export default defineComponent({
  components: { ImageDetail },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup (_, context) {
    const imagesStore = appStores.imagesStore

    onMounted(async () => {
      imagesStore.fetchImages()
    })

    return { ...imagesStore }
  }
})
</script>

<style lang="stylus" scoped>
.images
  display: flex
  flex-direction: column
  &__header
    padding: 10px
    border-bottom: 1px solid lightgray
    .buttons
      display: flex
      margin-bottom: 10px
      .button
        margin-right: 10px
    .nav
      display: flex
      flex-wrap: wrap
      .home-icon
        width: 20px
        height: 20px
        color: lightblue
        cursor: pointer
      .breadcrumb
        height: 20px
        .icon
          color: black
          width: 15px
          height: 15px
          vertical-align: text-top
        span
          font-size: 12px
          vertical-align: text-bottom
          margin-right: 3px
          cursor: pointer
          &:hover
            text-decoration: underline
  &__content
    padding: 10px
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    align-content: flex-start
    &::before
      order: 1
    &::before, &::after
      content: ""
      display: block
      width: 80px
      height: 0

  &__item
    width: 80px
    display: flex
    flex-direction: column
    margin-bottom: 20px
    position: relative
    focusColor = #05d
    .focus
      position: absolute
      focusPadding = -7px
      top: focusPadding
      left: focusPadding
      right: focusPadding
      bottom: focusPadding
      background-color: focusColor
      border-radius: 3px
      z-index: 0
    .icon
      color: lightblue
    img
      border: 1px solid lightgray
      object-fit: contain
    .icon, img
      width: 80px
      height: 80px
      z-index: 1
      cursor: pointer
    span
      $font-size = 12px
      $line-height = 1.4
      $lines-to-show = 3

      display: inline-block
      width: 100%
      font-size: $font-size
      word-break: break-all
      max-height: $font-size * $line-height * $lines-to-show
      line-height: $line-height
      position: relative
      overflow: hidden
      cursor: pointer
      &:before, &:after
        position: absolute
        background-color: white
      &:before
        content: "..."
        top: $font-size * $line-height * ($lines-to-show - 1)
        right: 0
      &:after
        content: ""
        height: 100%
        width: 100%
      &:hover
        opacity: 0.8
    &.selected
      span
        color: white
        &:before, &:after
          background-color: focusColor

  &__detail
    height: 100%

  .content
    flex: 1
    overflow-y: scroll

  .dialog
    .el-input
      margin-bottom: 10px
    .buttons
      text-align: right
</style>
