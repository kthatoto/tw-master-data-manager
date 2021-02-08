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
  img(v-for="image in images" :src="image")
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "@vue/composition-api"
import axios from "axios"

export default defineComponent({
  setup() {
    const state = reactive<{
      images: any[]
    }>({
      images: []
    })

    onMounted(async () => {
      const imagesRes = await axios.get("/api/images")
      imagesRes.data.forEach(async (filename: string) => {
        const image = (await import(`~data/images/${filename}`)).default
        state.images.push(image)
      })
    })

    const handleUpload = (files: any[]) => {
      console.log(files)
    }

    return {
      ...toRefs(state),
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
