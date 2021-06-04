<template lang="pug">
.flags
  Resources(resourceType="flags" :editable="editable" :refs="$refs")

    template(slot="detail")
      FlagDetail(:refs="$refs" :editable="editable")

    template(slot="resourceCreateModal")
      el-dialog.dialog.-flagCreate(v-if="resourceCreating" :visible.sync="resourceForm.flag")
        h2(slot="title") Flag作成

    template(slot="resourceEditModal")
      el-dialog.dialog.-flagEdit(v-if="resourceEditing" :visible.sync="resourceForm.flag")
        h2(slot="title") Flag変更
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import Resources from '@/components/MapResourcesConsole/Resources.vue'
import FlagDetail from '@/components/MapResourcesConsole/FlagDetail.vue'

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
    const commonStore = appStores.commonStore
    const flagsStore = appStores.flagsStore

    return {
      ...commonStore,
      ...flagsStore
    }
  }
})
</script>
