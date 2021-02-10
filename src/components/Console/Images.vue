<template lang="pug">
.images
  .images__header
    .buttons
      el-upload.button(
        action=""
        :auto-upload="false"
        :on-change="handleUpload"
        :show-file-list="false"
      )
        el-button(icon="el-icon-plus" type="primary") 画像追加
      el-button.button(icon="el-icon-plus" type="primary") フォルダ追加
    .nav
      icon.home-icon(name="home" @click.native="backToHome")
      .breadcrumb(v-for="(breadcrumb, i) in breadcrumbs" :key="i")
        icon.icon(name="chevron-right")
        span(@click="backDirectory(i)") {{ breadcrumb }}
  .images__content(v-if="!showingImage")
    .images__item(v-for="o in directories" :key="o.name")
      Icon.icon(name="folder" @click.native="appendDirectory(o.name)")
      span {{ o.name }}
    .images__item(v-for="o in images" :key="o.name")
      img(:src="o.image" @dblclick="showImage(o.name)")
      span {{ o.name }}
  .images__detail(v-else)
    img(:src="showingImage.image")
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'

export default defineComponent({
  setup () {
    const imagesStore = appStores.imagesStore

    const state = reactive<{
      creatingDirectory: boolean
    }>({
      creatingDirectory: false
    })

    onMounted(async () => {
      imagesStore.fetchImages()
    })

    return {
      ...toRefs(state),
      handleUpload: imagesStore.uploadImage,
      showImage: imagesStore.showImage,
      backToHome: imagesStore.backToHome,
      appendDirectory: imagesStore.appendDirectory,
      backDirectory: imagesStore.backDirectory,
      breadcrumbs: imagesStore.breadcrumbs,
      directories: imagesStore.directories,
      images: imagesStore.images,
      showingImage: imagesStore.showingImage
    }
  }
})
</script>

<style lang="stylus" scoped>
.images
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
    .icon
      width: 80px
      height: 80px
      color: lightblue
    img
      width: 80px
      height: 80px
      border: 1px solid lightgray
      object-fit: contain
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

  &__detail
    padding: 10px
    img
      width: 100%
      border: 1px solid lightgray
</style>
