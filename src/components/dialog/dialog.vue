<template>
  <!--<el-dialog :visible="$store.state.show"></el-dialog>-->
  <!--<el-dialog :visible="show"></el-dialog>-->
  <el-dialog :visible.sync="show"></el-dialog>

  <!--//放在store中-->
  <!--<el-dialog :visible="$store.state.dialog.show"></el-dialog>&lt;!&ndash;放在moduels中 &ndash;&gt;-->

</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: "dialog",
    // props:['show'],
    // computed:{
    //   currentShow:{
    //     get(){
    //       return this.show
    //     },
    //     set(val){
    //       this.$emit("update:show",val)
    //     }
    //   }
    // }
    computed: {
      //扩展运算符
      ...mapState({
        show: state => state.dialog.show
      }),
    }
  }
</script>

<style scoped>

</style>
