<template>
  <div class="shoplist_container">
    <ul v-load-more="loaderMore" type="1"></ul>

  </div>
</template>

<script>
  import loaderMore from './mixin';
    export default {
        name: "shoplist"
    }
</script>

<style scoped>

</style>
