<template lang="pug">
.default
  .header
    nuxt-link(to="/") Home
  Nuxt.main
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
a:visited {
  color: inherit;
}

.header {
  width: 100%;
  height: 50px;
  background-color: #333333;
  display: flex;
  align-items: center;
}
.header a {
  color: white;
  display: inline-block;
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-right: 1px solid white;
}

.main {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: lightgray;
}
</style>
