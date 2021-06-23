<template lang="pug">
.tiles
  Resources(resourceType="tiles" :editable="editable" :refs="$refs")

    template(slot="detail")
      TileDetail(:refs="$refs" :editable="editable")

    template(slot="resourceCreateModal")
      el-dialog.dialog.-tileCreate(v-if="resourceCreating" :visible.sync="resourceForm.flag" width="900px")
        h2(slot="title") Tile作成
        .form__columns
          .left
            h3 Tile
            ImageSetEditor(
              :images="resourceForm.images"
              @input="inputImage"
              @remove="removeImage"
              @toggleCollision="toggleCollision"
            )

            h3 名前
            el-input.row(v-model="resourceForm.name" ref="resourceName")
            .buttons
              el-button(type="primary" :disabled="!resourceFormValid") 作成

          .right
            Images(:editable="false" :selector="true")

    template(slot="resourceEditModal")
      el-dialog.dialog.-tileEdit(v-if="resourceEditing" :visible.sync="resourceForm.flag" width="900px")
        h2(slot="title") Tile変更
        .form__columns
          .left
            h3 Tile
            ImageSetEditor(
              :images="resourceForm.images"
              @input="inputImage"
              @remove="removeImage"
              @toggleCollision="toggleCollision"
            )

            h3 名前
            el-input.row(v-model="resourceForm.name" ref="resourceName")
            .buttons
              el-button(type="primary" @click="editResource" :disabled="!resourceFormValid") 更新

          .right
            Images(:editable="false" :selector="true")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import Resources from '@/components/MapResourcesConsole/Resources.vue'
import TileDetail from '@/components/MapResourcesConsole/detail/TileDetail.vue'
import ImageSetEditor from '@/components/organisms/ImageSetEditor.vue'
import Images from '@/components/MapResourcesConsole/list/Images.vue'
import { ImageChip } from '~domains/index.ts'

export default defineComponent({
  components: { Resources, TileDetail, ImageSetEditor, Images },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup (_, context) {
    const tilesStore = appStores.tilesStore

    const inputImage = (params: { x: number, y: number, id: string, data: string, name: string }) => {
      const images: ImageChip[] | undefined = tilesStore.resourceForm.images
      if (!images) return
      const imageIndex = images.findIndex((ic: ImageChip) => ic.x === params.x && ic.y === params.y)
      if (imageIndex >= 0) {
        images.splice(imageIndex, 1, {
          x: params.x,
          y: params.y,
          id: params.id,
          collision: images[imageIndex].collision
        })
      } else {
        images.push({ x: params.x, y: params.y, id: params.id, collision: false })
      }
      tilesStore.resourceForm.images = images
      const imageData = tilesStore.resourceForm.imageData
      if (!imageData) return
      imageData[params.id] = { name: params.name, data: params.data }
      tilesStore.resourceForm.imageData = imageData
    }

    const removeImage = (params: { x: number, y: number }) => {
      const images: ImageChip[] | undefined = tilesStore.resourceForm.images
      if (!images) return
      const imageIndex = images.findIndex((ic: ImageChip) => ic.x === params.x && ic.y === params.y)
      if (imageIndex >= 0) images.splice(imageIndex, 1)
      tilesStore.resourceForm.images = images
    }

    const toggleCollision = (params: { x: number, y: number }) => {
      const images: ImageChip[] | undefined = tilesStore.resourceForm.images
      if (!images) return
      const imageIndex = images.findIndex((ic: ImageChip) => ic.x === params.x && ic.y === params.y)
      const targetImage: ImageChip | undefined = images[imageIndex]
      if (!targetImage) return
      images.splice(imageIndex, 1, { ...targetImage, collision: !targetImage.collision })
      tilesStore.resourceForm.images = images
    }

    return {
      ...tilesStore,
      inputImage,
      removeImage,
      toggleCollision
    }
  }
})
</script>

<style lang="stylus" scoped>
resource-form(tiles)

.tiles
  .form
    &__columns
      display: flex
      justify-content: space-between
      .left
        width: 400px
      .right
        width: 400px
        border-left: 1px solid lightgray
</style>
