<template>
  <header id="headtop">
    <section class="head_goback" @click="$router.go(-1)" v-if="goBack">
      <!--<i class="fa fa-angle-left"></i>-->
      <i class="el-icon-arrow-left"></i>
    </section>
    <router-link class="head_login" :to="'/login'" v-if="signinUp">
      <span class="login_span" v-if="!userInfo">登录|注册</span>
    </router-link>

    <section class="title_head ellipsis" v-if="headTitle">
      <span class="title_text">{{headTitle}}</span>
    </section>

    <slot name="msite-title"></slot>
    <slot name="search"></slot>
  </header>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
    export default {

      data(){
          return{

          }
      },
      mounted(){
        this.getUserInfo();
      },
      props: ['signinUp', 'headTitle', 'goBack'],
      computed:{
        ...mapState(['userinfo'])
      },
      methods:{
        ...mapActions(['getUserInfo'])
      }



    }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";
  #headtop{
    background-color: $blue;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%,2.95rem);
  }
  .head_goback{
    left:0.4rem;
    @include wh(1.6rem,2rem);
    line-height: 3.2rem;
    margin-left: 0.4rem;
  }
  .el-icon-arrow-left{
    font-size: 1rem;
  }
  .head_login{
    right:0.55rem;
    @include sc(0.65rem,#fff);
    @include ct;
    .login_span{
      color:#fff;
    }
    .user_avatar{
      fill: #fff;
      @include wh(.8rem, .8rem);
    }
  }
  .title_head{
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text{
      @include sc(0.8rem,#fff);
      text-align: center;
      font-weight: bold;
    }
  }

</style>
