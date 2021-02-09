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
      icon.home-icon(name="home" @click.native="changeDirectory('')")
      .breadcrumb(v-for="(breadcrumb, i) in breadcrumbs" :key="i")
        icon.icon(name="chevron-right")
        span(@click="backDirectory(i)") {{ breadcrumb }}
  .images__content
    .images__item(v-for="o in directories" :key="o.name")
      Icon.icon(name="folder" @click.native="appendDirectory(o.name)")
      span {{ o.name }}
    .images__item(v-for="o in images" :key="o.name")
      img(:src="o.image")
      span {{ o.name }}
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
      changeDirectory: imagesStore.changeDirectory,
      appendDirectory: imagesStore.appendDirectory,
      backDirectory: imagesStore.backDirectory,
      breadcrumbs: imagesStore.breadcrumbs,
      directories: imagesStore.directories,
      images: imagesStore.images
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
    span
      display: inline-block
      width: 100%
      font-size: 12px
      word-wrap: break-word
</style>
