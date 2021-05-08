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

            ImageSetEditor(:images="resourceForm.images")

            h3 名前
            el-input.row(v-model="resourceForm.name" ref="resourceName")

            .buttons
              el-button(type="primary" @click="createResource" :disabled="!resourceFormValid") 作成

          .right
            Images(:editable="false")

    template(slot="resourceEditModal")
      el-dialog.dialog.-tileEdit(v-if="resourceEditing" :visible.sync="resourceForm.flag")
        h2(slot="title") Tile変更
        h3 Tile

        h3 名前
        el-input.row(v-model="resourceForm.name" ref="resourceName")

        .buttons
          el-button(type="primary" @click="editResource" :disabled="!resourceFormValid") 更新
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import Resources from '@/components/MapResourcesConsole/Resources.vue'
import TileDetail from '@/components/MapResourcesConsole/TileDetail.vue'
import ImageSetEditor from '@/components/organisms/ImageSetEditor.vue'
import { Image } from '~domains/images.ts'

export default defineComponent({
  components: { Resources, TileDetail, ImageSetEditor },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup (_, context) {
    const state = reactive<{
      imageSelecting: boolean
    }>({
      imageSelecting: false
    })

    const commonStore = appStores.commonStore
    const tilesStore = appStores.tilesStore

    const selectImage = (image: Image) => {
      // tilesStore.resourceForm.imageId = image.id
      // tilesStore.resourceForm.image = image
      state.imageSelecting = false
    }

    return {
      ...toRefs(state),
      ...commonStore,
      ...tilesStore,
      selectImage
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
