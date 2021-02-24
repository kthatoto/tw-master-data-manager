<template lang="pug">
.items
  .items__header
    .buttons
      el-button.button(icon="el-icon-plus" type="primary" @click="openItemCreateModal($refs)") Item作成
      el-button.button(icon="el-icon-plus" type="primary" @click="openDirectoryCreateModal($refs)") フォルダ作成
    .nav
      icon.home-icon(name="home" @click.native="backToHome")
      .breadcrumb(v-for="(breadcrumb, i) in breadcrumbs" :key="i")
        icon.icon(name="chevron-right")
        span(@click="backDirectory(i)") {{ breadcrumb }}

  .items__content.content
    .items__item(v-for="o in directories" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      Icon.icon(name="folder" @dblclick.native="appendDirectory(o.name)" @click.right.prevent.native="confirmDelete(o.name)")
      span(@dblclick="openDirectoryNameEditModal($refs, o)") {{ o.name }}
    .items__item(v-for="o in items" :key="o.name" @click="selectingName = o.name" :class="{selected: selectingName === o.name}")
      .focus(v-if="selectingName === o.name")
      ConsoleImage(
        :raw="o.raw" @dblclick="showItem(o.name)" @clickRight="confirmDelete(o.name)"
        width="80px" height="80px" lineHeight="80px"
      )
      span(@dblclick="openItemEditModal($refs, o)") {{ o.name }}

  el-dialog.dialog(:visible.sync="directoryCreating.flag")
    p フォルダの作成
    el-input(v-model="directoryCreating.name" ref="directoryCreateInput")
    .buttons
      el-button(type="primary" @click="createDirectory" :disabled="directoryCreating.name.length === 0") 作成

  el-dialog.dialog(:visible.sync="itemCreating.flag" width="700px")
    p Itemの作成
    .form
      .form__column.-left
        el-input(v-model="itemCreating.name" ref="itemCreateInput")
        p カテゴリ
        el-select(v-model="itemCreating.category" placeholder="カテゴリ")
          el-option(v-for="(label, category) in itemCategoryLabels" :key="category" :label="label" :value="category")
        p サブカテゴリ
        el-select(v-model="itemCreating.subCategory" placeholder="サブカテゴリ")
          el-option(v-for="(label, subCategory) in itemSubCategoryLabels" :key="subCategory" :label="label" :value="subCategory")
        p 価値
        el-input-number(v-model="itemCreating.value.amount" placeholder="価値")
        el-select(v-model="itemCreating.value.currency" placeholder="通貨")
          el-option(v-for="currency in valueCurrencies" :key="currency" :label="currency" :value="currency")
        p 効果
        el-input-number(v-model="itemCreating.effect.amount" placeholder="効果量")
        el-select(v-model="itemCreating.effect.amountType" placeholder="効果量単位")
          el-option(v-for="(label, key) in itemEffectAmountTypeLabels" :key="key" :label="label" :value="key")
        p 効果時間(秒)
        el-input-number(v-model="itemCreating.effect.durationSecond" placeholder="効果時間")
        el-button(type="primary" @click="createItem" :disabled="!itemCreatable") 作成
      .form__column.-right
        Images.form__images(:editable="false")

  el-dialog.dialog(:visible.sync="directoryEditing.flag")
    p フォルダの名前変更
    el-input(v-model="directoryEditing.name" ref="directoryNameEditor")
    .buttons
      el-button(type="primary" @click="editDirectoryName" :disabled="directoryEditing.name.length === 0") 更新

  el-dialog.dialog(:visible.sync="itemEditing.flag")
    p Itemの変更
    .form
      .form__column.-left
        el-input(v-model="itemEditing.name" ref="itemNameEditor")
        p カテゴリ
        el-select(v-model="itemEditing.category" placeholder="カテゴリ")
          el-option(v-for="(label, category) in itemCategoryLabels" :key="category" :label="label" :value="category")
        p サブカテゴリ
        el-select(v-model="itemEditing.subCategory" placeholder="サブカテゴリ")
          el-option(v-for="(label, subCategory) in itemSubCategoryLabels" :key="subCategory" :label="label" :value="subCategory")
        p 価値
        el-input-number(v-model="itemEditing.value.amount" placeholder="価値")
        el-select(v-model="itemEditing.value.currency" placeholder="通貨")
          el-option(v-for="currency in valueCurrencies" :key="currency" :label="currency" :value="currency")
        p 効果
        el-input-number(v-model="itemEditing.effect.amount" placeholder="効果量")
        el-select(v-model="itemEditing.effect.amountType" placeholder="効果量単位")
          el-option(v-for="(label, key) in itemEffectAmountTypeLabels" :key="key" :label="label" :value="key")
        p 効果時間(秒)
        el-input-number(v-model="itemEditing.effect.durationSecond" placeholder="効果時間")

        el-button(type="primary" @click="editItem" :disabled="!itemEditable") 変更
      .form__column.-right
        Images.form__images(:editable="false")

  el-dialog.dialog(:visible.sync="deleting.flag")
    p 「{{ deleting.name }}」削除していい？
    .buttons
      el-button(type="danger" @click="deleteObject") 削除
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import { appStores } from '@/stores/appStores.ts'
import Images from '@/components/MapResourcesConsole/Images.vue'
import ConsoleImage from '@/components/atoms/ConsoleImage.vue'
import { valueCurrencies } from '~domains/index.ts'
import { itemCategoryLabels, itemSubCategoryLabels, itemEffectAmountTypeLabels } from '~domains/items.ts'

export default defineComponent({
  components: { Images, ConsoleImage },
  setup () {
    const itemsStore = appStores.itemsStore

    onMounted(() => {
      itemsStore.fetchItems()
    })

    return {
      ...itemsStore,
      valueCurrencies,
      itemCategoryLabels,
      itemSubCategoryLabels,
      itemEffectAmountTypeLabels
    }
  }
})
</script>

<style lang="stylus" scoped>
console(items)
.items
  .form
    display: flex
    justify-content: space-between
    &__column
      &.-left
        flex: 1
        padding-right: 20px
        border-right: 1px solid lightgray
        p, .el-select
          margin-bottom: 10px
      &.-right
        width: 400px
    &__images
      height: 600px
    .el-checkbox
      display: block
      margin-bottom: 20px
</style>
