<template>
  <div class="home_container">




    <itemcontainer father-component="home"></itemcontainer>
  </div>
</template>

<script>
  import itemcontainer from '../../components/itemcontainer'
  // import TestSlot from '../../components/header/testSlot'

  export default {
    name: 'home',
    components: {
      itemcontainer
    },
    // components: {TestSlot},
    created() {

    }
  }
</script>

<style lang="less" scoped>
  .home_container {
    color: #FFF;
    font-size: 12px;
  }
</style>
