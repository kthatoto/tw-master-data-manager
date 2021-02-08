<template lang="pug">
.index
  .editor
  .console
</template>

<script lang="ts">
</script>

<style lang="stylus" scoped>
.index
  display: flex
  justify-content: space-between

  .editor
    width: calc(100% - 400px)
    background-color: white

  .console
    width: 400px
    height: 100%
    background-color: lightgray
</style>
