<template lang="pug">
.resources
  .resources__header
    .buttons(v-if="editable")
      el-button.button(icon="el-icon-plus" type="primary" @click="openResourceCreateModal") {{ resourceType }}作成
      el-button.button(icon="el-icon-plus" type="primary" @click="openDirectoryCreateModal($refs)") フォルダ作成
    .nav
      icon.home-icon(name="home" @click.native="backToHome(resourceType)")
      .breadcrumb(v-for="breadcrumb in breadcrumbs" :key="breadcrumb.directoryId")
        icon.icon(name="chevron-right")
        span(@click="backDirectory(resourceType, breadcrumb.directoryId)") {{ breadcrumb.name }}

  .resources__content.content(v-if="!showingResource")
    .resources__item(v-for="o in directories" :key="o.name" :class="{selected: selectingResourceId === o.id}")
      .focus(v-if="selectingResourceId === o.id")
      Icon.icon(name="folder" @dblclick.native="appendDirectory(resourceType, o)" @click.right.prevent.native="editable && confirmDelete(o, 'directories')")
      span(@dblclick="editable && openDirectoryEditModal($refs, o)") {{ o.name }}
    .resources__item(v-for="o in resources" :key="o.id" @click="selectResource(o.id)" :class="{selected: selectingResourceId === o.id}")
      .focus(v-if="selectingResourceId === o.id")
      ConsoleImage(
        :resource="o" @dblclick="showResource(o.id)" @clickRight="editable && confirmDelete(o, 'resources')"
        width="80px" height="80px" lineHeight="80px" :resourceType="resourceType"
      )
      span(@dblclick="openResourceEditModal(o)") {{ o.name }}

  .resources__detail.content(v-else)
    slot(name="detail")

  template(v-if="editable")

    el-dialog.dialog(
      :visible.sync="directoryForm.flag"
      :class="{ '-directoryCreate': directoryCreating, '-directoryEdit': directoryEditing }"
    )
      template(slot="title")
        h2(v-if="directoryCreating") フォルダ作成
        h2(v-else-if="directoryEditing") フォルダ名更新
      el-input(v-model="directoryForm.name" ref="directoryName")
      .buttons
        el-button(v-if="directoryCreating" type="primary" @click="createDirectory(resourceType)" :disabled="!directoryFormValid") 作成
        el-button(v-else-if="directoryEditing" type="primary" @click="editDirectory(resourceType)" :disabled="!directoryFormValid") 更新

    el-dialog.dialog.-objectDelete(:visible.sync="deleteForm.flag")
      h2(slot="title") 「{{ deleteForm.name }}」削除していい？
      .buttons
        el-button(type="danger" @click="deleteObject(resourceType)") 削除

    slot(name="resourceCreateModal")
    slot(name="resourceEditModal")
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import { ResourceType } from '~server/index.ts'

export default defineComponent({
  props: {
    resourceType: {
      type: String as PropType<ResourceType>,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    },
    refs: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup (props, context) {
    const commonStore = appStores.commonStore
    const store = commonStore.getStoreByResourceType(props.resourceType)

    onMounted(() => {
      store.fetchResources()
    })

    return {
      ...commonStore,
      ...store
    }
  }
})
</script>

<style lang="stylus" scoped>
console(resources)
</style>
