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
        el-button(icon="el-icon-plus" type="primary") 画像作成
      el-button.button(icon="el-icon-plus" type="primary" @click="openCreateModal($refs)") フォルダ作成
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
    ImageDetail(:refs="$refs" :editable="editable")

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

    onMounted(() => {
      imagesStore.fetchImages()
    })

    return { ...imagesStore }
  }
})
</script>

<style lang="stylus" scoped>
console(images)
</style>
