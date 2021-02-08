<template lang="pug">
.images
  .images__header
    el-upload(
      action=""
      :auto-upload="false"
      :on-change="handleUpload"
      :show-file-list="false"
    )
      el-button(icon="el-icon-plus" type="primary") 追加
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  setup() {
    const handleUpload = (files) => {
      console.log(files)
    }

    return {
      handleUpload
    }
  }
})
</script>

<style lang="stylus" scoped>
.images
  &__header
    padding: 10px
    border-bottom: 1px solid lightgray
    display: flex
    justify-content: flex-end
</style>
