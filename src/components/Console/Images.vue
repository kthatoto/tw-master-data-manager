<template lang="pug">
.images
  .images__header
    el-upload.button(
      action=""
      :auto-upload="false"
      :on-change="handleUpload"
      :show-file-list="false"
    )
      el-button(icon="el-icon-plus" type="primary") 画像追加
    el-button.button(icon="el-icon-plus" type="primary") フォルダ追加
  .images__content
    img(v-for="image in images" :src="image")
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "@vue/composition-api"
import axios from "axios"

export default defineComponent({
  setup() {
    const state = reactive<{
      currentDirectory: "."
      images: any[]
      creatingFolder: boolean
    }>({
      images: [],
      creatingFolder: false
    })

    onMounted(async () => {
      const imagesRes = await axios.get("/api/images")
      imagesRes.data.forEach(async (filename: string) => {
        const image = (await import(`~data/images/${filename}`)).default
        state.images.push(image)
      })
    })

    const handleUpload = async (file: any) => {
      const params = new FormData()
      params.append("file", file.raw)
      params.append("filename", file.name)
      await axios.post("/api/images", params, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
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
    .button
      margin-right: 10px
  &__content
    padding: 10px
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    &::before
      order: 1
    &::before, &::after
      content: ""
      display: block
      width: 80px
      height: 0
    img
      width: 80px
      height: 80px
      border: 1px solid lightgray
      margin-bottom: 20px
</style>
