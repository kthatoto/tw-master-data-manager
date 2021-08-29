<template lang="pug">
.images
  Resources(resourceType="images" :editable="editable" :selector="selector" :refs="$refs")

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

import { appStores } from '@/stores/appStores'
import Resources from '@/components/MapResourcesConsole/Resources.vue'
import ImageDetail from '@/components/MapResourcesConsole/detail/ImageDetail.vue'

export default defineComponent({
  components: { Resources, ImageDetail },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: true
    },
    selector: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup (props) {
    const imagesStore = props.selector ? appStores.imagesSelectorStore : appStores.imagesStore

    return {
      ...imagesStore
    }
  }
})
</script>

<style lang="stylus" scoped>
resource-form(images)
</style>
