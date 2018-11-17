<template>
  <div  class="loginContainer">
    <headtop signin-up="msite">
      <router-link to="/search/geohash" class="link_search" slot="search">
        <i class="fa fa-search"></i>
      </router-link>
      <router-link to="/home" class="msite_title" slot="msite-title">
        <span class="title_text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </headtop>




  </div>
</template>

<script>
  import headtop from '../../components/header/header'
  import {cityGuess} from "../../service/getData";

  export default {
    name: "msite",
    data(){
      return{
        geohash:'',//city页面传过来的地址geohash
        msiteTitle:'请选择地址...'//miste页面头部

      }
    },
    async beforeMount(){
      // alert(this.$route.query.geohash);
      if(!this.$route.query.geohash){//获取city页面传过来的地址经纬度
        const address=await cityGuess();
        this.geohash=address.latitude+','+address.longitude;
        // alert(this.geohash);
      }else{
        this.geohash=this.$route.query.geohash;
        alert(this.geohash);
      }

    },
    components: {
      headtop
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";
  .link_search{
    left: .8rem;
    @include wh(.9rem,.9rem);
    @include ct;
    color: #FFF;
  }
  .msite_title{
    @include center;
    width:50%;
    color: #fff;
    text-align: center;
    margin-left: -0.5rem;
    .title_text{
      @include sc(.8rem,#FFF);
      text-align: center;
      display: block;
    }
  }

</style>
