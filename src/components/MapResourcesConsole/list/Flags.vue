<template lang="pug">
.flags
  Resources(resourceType="flags" :editable="editable" :refs="$refs")

    template(slot="detail")
      FlagDetail(:refs="$refs" :editable="editable")

    template(slot="resourceCreateModal")
      el-dialog.dialog.-flagCreate(v-if="resourceCreating" :visible.sync="resourceForm.flag")
        h2(slot="title") Flag Create
        h3 Name
        el-input.row(v-model="resourceForm.name" ref="resourceName")
        h3 Key
        el-input.row(v-model="resourceForm.key")
        h3 Description
        el-input(type="textarea" v-model="resourceForm.description")
        .buttons
          el-button(type="primary" @click="createResource" :disabled="!resourceFormValid") Create

    template(slot="resourceEditModal")
      el-dialog.dialog.-flagEdit(v-if="resourceEditing" :visible.sync="resourceForm.flag")
        h2(slot="title") Flag Edit
        h3 Name
        el-input.row(v-model="resourceForm.name" ref="resourceName")
        h3 Key
        el-input.row(v-model="resourceForm.key")
        h3 Description
        el-input(type="textarea" v-model="resourceForm.description")
        .buttons
          el-button(type="primary" @click="editResource" :disabled="!resourceFormValid") Edit
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'
import Resources from '@/components/MapResourcesConsole/Resources.vue'
import FlagDetail from '@/components/MapResourcesConsole/detail/FlagDetail.vue'

export default defineComponent({
  components: { Resources, FlagDetail },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup () {
    const flagsStore = appStores.flagsStore

    return {
      ...flagsStore
    }
  }
})
</script>

<style lang="stylus" scoped>
resource-form(flags)
</style>
