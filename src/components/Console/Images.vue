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
  .images__content.content(v-if="!showingImage")
    .images__item(v-for="o in directories" :key="o.name")
      Icon.icon(name="folder" @dblclick.native="appendDirectory(o.name)")
      span(@dblclick="editName(o)") {{ o.name }}
    .images__item(v-for="o in images" :key="o.name")
      img(:src="o.raw" @dblclick="showImage(o.name)")
      span(@dblclick="editName(o)") {{ o.name }}
  .images__detail.content(v-else)
    ImageDetail(:image="showingImage")
  el-dialog.name-editor(:visible.sync="editing.flag")
    el-input(v-model="editing.name" ref="nameEditor")
      template(v-if="editing.isFile" slot="append") {{ editing.extension }}
    el-button(type="primary" @click="updateName") 更新
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import { FileObject } from '@/stores/images_store.ts'
import ImageDetail from '@/components/Console/ImageDetail.vue'

export default defineComponent({
  components: { ImageDetail },
  setup (_, context) {
    const imagesStore = appStores.imagesStore

    const state = reactive<{
      creatingDirectory: boolean
    }>({
      creatingDirectory: false
    })

    const editing = reactive<{
      flag: boolean
      isFile: boolean
      beforeName: string
      name: string
      extension: string
    }>({
      flag: false,
      isFile: false,
      beforeName: '',
      name: '',
      extension: ''
    })

    const editName = (o: FileObject) => {
      editing.flag = true
      editing.isFile = o.isFile
      editing.beforeName = o.name
      setTimeout(() => {
        const nameEditor = context.refs.nameEditor
        nameEditor.focus()
        if (o.isFile) {
          const splited: string[] = o.name.split('.')
          editing.extension = '.' + splited.pop()
          editing.name = splited.join('.')
        } else {
          editing.name = o.name
        }
      }, 50)
    }

    const updateName = async () => {
      const afterName = editing.isFile ? editing.name + editing.extension : editing.name
      await imagesStore.updateName(editing.beforeName, afterName)
      editing.flag = false
    }

    onMounted(async () => {
      imagesStore.fetchImages()
    })

    return {
      ...toRefs(state),
      editing,
      handleUpload: imagesStore.uploadImage,
      showImage: imagesStore.showImage,
      backToHome: imagesStore.backToHome,
      appendDirectory: imagesStore.appendDirectory,
      backDirectory: imagesStore.backDirectory,
      breadcrumbs: imagesStore.breadcrumbs,
      directories: imagesStore.directories,
      images: imagesStore.images,
      showingImage: imagesStore.showingImage,
      editName,
      updateName
    }
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
    height: 100%

  .content
    flex: 1
    overflow-y: scroll

  .name-editor
    .el-input
      margin-bottom: 10px
</style>
