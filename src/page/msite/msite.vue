<template>
  <div class="loginContainer">
    <headtop signin-up="msite">
      <router-link to="/search/geohash" class="link_search" slot="search">
        <i class="fa fa-search" style="color: #fff"></i>
      </router-link>
      <router-link to="/home" class="msite_title ellipsis" slot="msite-title">
        <span class="title_text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </headtop>
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
            <router-link :to="{path: '/food', query: {geohash, title: foodItem.title,restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item"
                         :key="foodItem.id" class="link_to_food">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else>
    </nav>
    <div class="shop_list_container  view-wrapper">
      <header class="shop_header app-header">
        <i class="fa fa-university shop_icon"></i>
        <span class="shop_header_title">附近商家</span>
      </header>
      <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>

    </div>
    <!--<foot-guide :idx="0"></foot-guide>-->
    <foot-guide></foot-guide>

  </div>
</template>

<script>
  import headtop from '../../components/header/header';
  import shopList from '../../components/common/shoplist';//商店列表组件
  // import footGuide from '../../components/footer/footGuide';//商店底部组件
  import {msiteFoodTypes, cityGuess, misteAddress} from "../../service/getData";
  import {mapMutations} from 'vuex';
  // import '../../plugins/swiper.min';
  import '../../style/swiper.min.css';
  import FootGuide from "../../components/footer/footGuide";
  import {getRequest,postRequest,uploadFileRequest,putRequest} from '../../config/axios';

  export default {
    name: "msite",
    data() {
      return {
        geohash: '',//city页面传过来的地址geohash
        msiteTitle: '请选择地址...', //miste页面头部
        foodTypes: [],//食品分类列表
        hasGetData: false,//是否已经获取地理位置数据，成功之后再获取商铺信息
        imgBaseUrl: 'https://fuss10.elemecdn.com'//图片域名地址
      }
    },
    async beforeMount() {
      // alert(this.$route.query.geohash);
      if (!this.$route.query.geohash) {//获取city页面传过来的地址经纬度
        //const address = await cityGuess();
        var address={}
        await  getRequest('/v1/cities',{
          type: 'guess'
        }).then(resp=>{
          address = resp.data;
          this.geohash = address.latitude + ',' + address.longitude;
          //alert(this.geohash);
        });
      } else {
        this.geohash = this.$route.query.geohash;
      }
      this.SAVE_GEOHASH(this.geohash);
      //根据经纬度获取地址信息
      //let res = await misteAddress(this.geohash);
      let res = {};
      await getRequest('/v2/pois/'+this.geohash).then(resp=>{
        res=resp.data;
      });
      // alert('地址信息 '+JSON.stringify(res));
      this.msiteTitle = res.name;
      this.RECORD_ADDRESS(res);
      this.hasGetData = true;
    },
    mounted(){
      //获取食品分类
      // msiteFoodTypes(this.geohash).then(res => {
      //   let resLength = res.length;
      //   let resArr = [...res]; // 返回一个新的数组
      //   let foodArr = [];
      //   for (let i = 0, j = 0; i < resLength; i += 8, j++) {
      //     foodArr[j] = resArr.splice(0, 8);
      //   }
      //   this.foodTypes = foodArr;
      // })
      //alert(this.geohash)
      var geohash=this.geohash
      getRequest('/v2/index_entry',{
        geohash,
        group_type:'1',
        'flags[]':'F'
      }).then(res=>{
        let resLength = res.data.length;
        let resArr = [...res.data]; // 返回一个新的数组
        let foodArr = [];
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8);
        }
        this.foodTypes = foodArr;
      })
    },
    components: {
      FootGuide,
      headtop,
      shopList
    },
    methods: {
      ...mapMutations([
        'RECORD_ADDRESS', 'SAVE_GEOHASH'
      ]),
      // 解码url地址，求去restaurant_category_id值
      getCategoryId(url) {
        let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
        if (/restaurant_category_id/gi.test(urlData)) {
          return JSON.parse(urlData).restaurant_category_id.id
        } else {
          return ''
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";
  @import "../../style/common";
  @import "../../../static/font-awesome/css/font-awesome.css";

  .link_search {
    left: .8rem;
    @include wh(.9rem, .9rem);
    @include ct;
    color: #FFF;
  }

  .msite_title {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    margin-left: -0.5rem;
    .title_text {
      @include sc(.8rem, #FFF);
      text-align: center;
      display: block;
    }
  }

  .msite_nav {
    padding-top: 3rem;
    background-color: #fff;
    border-bottom: 0.025rem solid $bc;
    height: 10.6rem;
    .swiper-container {
      @include wh(100%, auto);
      padding-bottom: 0.6rem;
      .swiper-pagination {
        bottom: 0.2rem;
      }
    }
    .fl_back {
      @include wh(100%, 100%);
    }
  }

  .food_types_container {
    display: flex;
    flex-wrap: wrap;
    .link_to_food {
      width: 25%;
      padding: 0.3rem 0rem;
      @include fj(center);
      figure {
        img {
          margin-bottom: 0.3rem;
          @include wh(1.8rem, 1.8rem);
        }
        figcaption {
          text-align: center;
          @include sc(0.55rem, #666);
        }
      }
    }
  }

  .shop_list_container {
    margin-top: .4rem;
    border-top: 0.025rem solid $bc;
    background-color: #fff;
    .shop_header {
      text-align: left;
      .shop_icon {
        font-size: initial;
        color: #999;
        margin-left: 0.6rem;
        margin-right: 0.6rem;
        vertical-align: unset;
        @include wh(0.5rem, 0.5rem);
      }
      .shop_header_title {
        color: #999;
        @include font(0.55rem, 1.6rem);
      }
    }
  }

  .app-header {
    position: absolute;
    left: 0;
    top: 11rem;
    box-sizing: border-box;
    align-items: center;
    width: 100%;
    height: 50px;
    z-index: 500;
    background: #FFF;
    color: #fff;
  }
</style>
