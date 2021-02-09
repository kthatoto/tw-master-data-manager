<template lang="pug">
.images
  .images__header
    el-upload.button(
      action=""
      :auto-upload="false"
      :on-change="handleUpload"
      :show-file-list="false"
    )
      el-button(icon="el-icon-plus" type="primary") 画像追加
    el-button.button(icon="el-icon-plus" type="primary") フォルダ追加
  .images__content
    .images__item(v-for="o in directories" :key="o.name")
      Icon.icon(name="folder")
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
      creatingFolder: boolean
    }>({
      creatingFolder: false
    })

    onMounted(async () => {
      imagesStore.fetchImages()
    })

    return {
      ...toRefs(state),
      handleUpload: imagesStore.uploadImage,
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
    display: flex
    .button
      margin-right: 10px
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
