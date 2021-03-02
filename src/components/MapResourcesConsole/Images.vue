<template lang="pug">
.images
  Resources(resourceKey="images" :editable="editable" :refs="$refs")

    template(slot="detail")
      ImageDetail(:refs="$refs" :editable="editable")

    template(slot="resourceCreateModal")
      el-dialog.dialog(v-if="resourceCreating" :visible.sync="resourceForm.flag")
        el-upload(
          action=""
          :auto-upload="false"
          :on-change="uploadImage"
          :show-file-list="false"
        )
          el-button(icon="el-icon-plus" type="primary") 画像追加
        el-input(v-model="resourceForm.name" ref="resourceName")
          template(slot="append") {{ resourceForm.extension }}
        .buttons
          el-button(type="primary" @click="createResource" :disabled="!resourceFormValid") 作成

    template(slot="resourceEditModal")
      el-dialog.dialog(v-if="resourceEditing" :visible.sync="resourceForm.flag")
        el-input(v-model="resourceForm.name" ref="resourceName")
          template(slot="append") {{ resourceForm.extension }}
        .buttons
          el-button(type="primary" @click="editResource" :disabled="!resourceFormValid") 更新
</template>
      el-upload.button(
        action=""
        :auto-upload="false"
        :on-change="uploadImage"
        :show-file-list="false"
      )
        el-button(icon="el-icon-plus" type="primary") 画像作成

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
