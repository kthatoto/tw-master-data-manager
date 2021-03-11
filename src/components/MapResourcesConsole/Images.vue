<template lang="pug">
.images
  Resources(resourceKey="images" :editable="editable" :refs="$refs")

    template(slot="detail")
      ImageDetail(:refs="$refs" :editable="editable")

    template(slot="resourceCreateModal")
      el-dialog.dialog.-imageCreate(v-if="resourceCreating" :visible.sync="resourceForm.flag")
        h2(slot="title") Image作成
        h3 Image
        el-upload.row(
          action=""
          :auto-upload="false"
          :on-change="uploadImage"
          :show-file-list="false"
        )
          el-button(icon="el-icon-plus" type="primary") Image選択
        img.preview.row(v-if="resourceForm.data" :src="'data:image;base64,' + resourceForm.data")
        h3 名前
        el-input.row(v-model="resourceForm.name" ref="resourceName")
          template(slot="append") {{ resourceForm.extension }}
        .buttons
          el-button(type="primary" @click="createResource" :disabled="!resourceFormValid") 作成

    template(slot="resourceEditModal")
      el-dialog.dialog.-imageEdit(v-if="resourceEditing" :visible.sync="resourceForm.flag")
        h2(slot="title") Image変更
        h3 Image
        el-upload.row(
          action=""
          :auto-upload="false"
          :on-change="uploadImage"
          :show-file-list="false"
        )
          el-button(icon="el-icon-plus" type="primary") Image選択
        img.preview.row(v-if="resourceForm.data" :src="'data:image;base64,' + resourceForm.data")
        h3 名前
        el-input.row(v-model="resourceForm.name" ref="resourceName")
          template(slot="append") {{ resourceForm.extension }}
        .buttons
          el-button(type="primary" @click="editResource" :disabled="!resourceFormValid") 更新
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import Resources from '@/components/MapResourcesConsole/Resources.vue'
import ImageDetail from '@/components/MapResourcesConsole/ImageDetail.vue'

export default defineComponent({
  components: { Resources, ImageDetail },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup (_, context) {
    const commonStore = appStores.commonStore
    const imagesStore = appStores.imagesStore

    return {
      ...commonStore,
      ...imagesStore
    }
  }
})
</script>

<style lang="stylus" scoped>
.images
  .dialog
    .row
      margin-bottom: 10px
    .preview
      margin-bottom: 10px
      width: 200px
      height: 200px
      object-fit: contain
      image-rendering: pixelated
      border: 1px solid gray
    .buttons
      text-align: right
      .el-button
        width: 120px
</style>
