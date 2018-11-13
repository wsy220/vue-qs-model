<template>
  <div class="home_container">
    <headtop><span class="head_logo" @click="reload">ele.me</span></headtop>
    <el-container style="padding-top: 100px;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <p>{{count}}</p>
            <p>
              <button @click="increment">+</button>
              <button @click="decrement">-</button>
            </p>
          </div>
        </el-col>
      </el-row>
    </el-container>

    <div>
      <a href="javascript:;" @click="$store.state.dialog.show=true">点击</a>
      <!--<a href="javascript:;" @click="$store.commit('switch_dialog')">点击</a>&lt;!&ndash;mutations&ndash;&gt;-->
      <!--<a href="javascript:;" @click="$store.dispatch('switch_dialog')">点击</a>&lt;!&ndash; actions&ndash;&gt;-->

      <t-dialog></t-dialog>
    </div>


  </div>


</template>

<script>
  import headtop from '../../components/header/header'
  import store from '../../store/index'
  import dialog from '../../components/dialog/dialog'

  export default {
    data() {
      return {
        // count: store2.state.count
        show: false
      }
    },
    computed: {
      count() {
        return this.$store.state.count
      }
    },
    name: 'home',
    components: {
      headtop,
      't-dialog': dialog
    },
    mounted() {
      // getfenlei().then(res => {
      //   console.log(JSON.stringify(res));
      // })
    },
    created() {

    },
    methods: {
      increment() {
        store.commit('increment');
      },
      decrement() {
        store.commit('decrement');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
