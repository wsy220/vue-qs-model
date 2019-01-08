<template>
  <div class="shoplist_container">
    <!--<ul v-load-more="loaderMore" type="1" v-if="shopListArr.length">-->
      <!--<router-link :to="{path: 'shop', query:{geohash, id: item.id}}" v-for="item in shopListArr" tag='li'-->
                   <!--:key="item.id" class="shop_li">-->
        <!--<section>-->
          <!--<img :src="imgBaseUrl + item.image_path" class="shop_img">-->
        <!--</section>-->
        <!--<hgroup class="shop_right">-->
          <!--<header class="shop_detail_header">-->
            <!--<h4 :class="item.is_premium? 'premium': ''" class="" class="shop_title ellipsis">{{item.name}}</h4>-->
            <!--<ul class="shop_detail_ul">-->
              <!--<li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>-->
            <!--</ul>-->
          <!--</header>-->


          <!--<h5 class="rating_order_num">-->
            <!--<section class="rating_order_num_left">-->
              <!--<section class="rating_section">-->
                <!--<rating-star :rating="item.rating"></rating-star>-->
                <!--<span class="rating_num">{{item.rating}}</span>-->
              <!--</section>-->
              <!--<section class="order_section">月售{{item.recent_order_num}}</section>-->
            <!--</section>-->
            <!--<section class="rating_order_num_right">-->
              <!--<span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>-->
              <!--&lt;!&ndash;<span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>&ndash;&gt;-->
            <!--</section>-->
          <!--</h5>-->

          <!--<h5 class="fee_distance">-->
            <!--<p class="fee">{{item.float_minimum_order_amount}}起送-->
              <!--<span class="segmentation">/</span>-->
              <!--{{item.piecewise_agent_fee.tips}}-->
            <!--</p>-->
            <!--<p class="distance_time">-->
              <!--<span v-if="Number(item.distance)">{{item.distance>1000?(item.distance/1000).toFixed(2)+'km':item.distance+'m'}}<span-->
                <!--class="segmentation">/</span></span>-->
              <!--<span v-else>{{item.distance}}</span>-->
              <!--<span class="segmentation">/</span>-->
              <!--<span class="order_time">{{item.order_lead_time}}</span>-->

            <!--</p>-->
          <!--</h5>-->
        <!--</hgroup>-->
      <!--</router-link>-->
    <!--</ul>-->
    <!--<ul v-else class="animation_opactiy">-->
      <!--<li class="list_back_li" v-for="item in 10" :key="item">-->
        <!--<img src="../../images/shop_back_svg.svg" class="list_back_svg">-->
      <!--</li>-->
    <!--</ul>-->
    <!--<p v-if="touchend" class="empty_data">没有更多数据了</p>-->
    <!--<aside class="return_top" @click="backTop" v-if="showBackStatus">-->
    <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>-->
    <!--</aside>-->
    <!--<div ref="abc" style="background-color: red;"></div>-->
    <!--<transition name="loading">-->
      <!--<loading v-show="showLoading"></loading>-->
    <!--</transition>-->


    <pull-to
      :bottom-load-method="loadmore" @bottom-state-change="stateChange"
      :top-load-method="refresh"
      @top-state-change="stateChange"
    >
      <!-- vue 2.5 use slot-scope -->
      <template slot="top-block" slot-scope="props">
        <div class="top-load-wrapper">
          <svg class="icon"
               :class="{
                'icon-arrow': props.state === 'trigger',
                'icon-loading': props.state === 'loading'
             }"
               aria-hidden="true">
            <use :xlink:href="iconLink"></use>
          </svg>
          {{ props.stateText }}
        </div>
      </template>
      <template slot="bottom-block" slot-scope="props">
        <div class="bottom-load-wrapper">
          <svg class="icon"
               :class="{
                'icon-arrow-bottom': props.state === 'trigger',
                'icon-loading-bottom': props.state === 'loading'
             }"
               aria-hidden="true">
            <use :xlink:href="iconLink"></use>
          </svg>
          {{ props.stateText }}
        </div>
      </template>
      <ul class="list" v-if="shopListArr.length">
        <!--<li v-for="item in dataList">-->
        <!--{{ item }}-->
        <!--</li>-->


        <router-link :to="{path: 'shop', query:{geohash, id: item.id}}" v-for="item in shopListArr" tag='li'
                     :key="item.id" class="shop_li">
          <section>
            <img :src="imgBaseUrl + item.image_path" class="shop_img">
          </section>
          <hgroup class="shop_right">
            <header class="shop_detail_header">
              <h4 :class="item.is_premium? 'premium': ''" class="" class="shop_title ellipsis">{{item.name}}</h4>
              <ul class="shop_detail_ul">
                <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
              </ul>
            </header>


            <h5 class="rating_order_num">
              <section class="rating_order_num_left">
                <section class="rating_section">
                  <rating-star :rating="item.rating"></rating-star>
                  <span class="rating_num">{{item.rating}}</span>
                </section>
                <section class="order_section">月售{{item.recent_order_num}}</section>
              </section>
              <section class="rating_order_num_right">
                <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                <!--<span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>-->
              </section>
            </h5>

            <h5 class="fee_distance">
              <p class="fee">{{item.float_minimum_order_amount}}起送
                <span class="segmentation">/</span>
                {{item.piecewise_agent_fee.tips}}
              </p>
              <p class="distance_time">
                <span v-if="Number(item.distance)">{{item.distance>1000?(item.distance/1000).toFixed(2)+'km':item.distance+'m'}}<span
                  class="segmentation">/</span></span>
                <span v-else>{{item.distance}}</span>
                <span class="segmentation">/</span>
                <span class="order_time">{{item.order_lead_time}}</span>

              </p>
            </h5>
          </hgroup>
        </router-link>
      </ul>


      <ul v-else class="animation_opactiy">
        <li class="list_back_li" v-for="item in 10" :key="item">
          <img src="../../images/shop_back_svg.svg" class="list_back_svg">
        </li>
      </ul>

      <div ref="abc" style="background-color: red;"></div>
      <transition name="loading">
        <loading v-show="showLoading"></loading>
      </transition>
    </pull-to>


  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {shopList} from '../../../src/service/getData'
  import {imgBaseUrl} from '../../../src/config/env'
  import {showBack, animate} from '../../../src/config/mUtils'
  import {loadMore, getImgPath} from './mixin'
  import loading from './loading'
  import ratingStar from './ratingStar'

  import PullTo from './pullTo/vue-pull-to';

  export default {
    name: "shoplist",
    mixins: [loadMore, getImgPath],
    props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
    data() {
      return {
        offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
        shopListArr: [], // 店铺列表数据
        preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
        showBackStatus: false, //显示返回顶部按钮
        showLoading: true, //显示加载动画
        touchend: false, //没有更多数据
        imgBaseUrl,


        dataList: [
          '(ง •̀_•́)ง', '(´・ω・`) ', '（/TДT)/ ', '>ㅂ<',
          'o(*≧▽≦)ツ', '(≖ ‿ ≖)✧', '(o^∇^o)ﾉ', ' (´・ω・)ﾉ',
          '(´・ω・`)', 'ヽ(･ω･｡)ﾉ', '(｀･ω･´)', '╰(*°▽°*)╯',
          '╮(￣▽￣)╭', '(￣▽￣)~*', '(⊙ˍ⊙)', '(￣0 ￣)y'
        ],
        iconLink: ''
      }
    },
    computed: {
      ...mapState([
        'latitude', 'longitude'
      ]),
    },
    mounted() {
      this.initData();
    },
    components: {
      loading,
      ratingStar,
      PullTo
    },
    methods: {
      async initData() {
        //获取商店列表
        // alert(this.restaurantCategoryId);
        let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
        console.log(JSON.stringify(res));
        console.log("initdata:"+res.length);

        this.shopListArr = [...res];
        if (res.length < 20) {
          this.touchend = true;
        }
        console.log("touchend" + this.touchend);
        this.hideloading();

        //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
        showBack(status => {
          this.showBackStatus = status;
        });
      },
      async loaderMore() {
        if (this.touchend) {
          return;
        }
        if (this.preventRepeatReuqest) {
          return;
        }

        this.showLoading = true;
        this.preventRepeatReuqest = true;
        this.offset += 5;
        let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
        // alert(JSON.stringify(res));
        this.hideloading();
        this.shopListArr = [...this.shopListArr, ...res];
        // alert(this.shopListArr.length);
        if (res.length < 20) {
          this.touchend = true;
        }
        console.log("touchend" + this.touchend);
        this.preventRepeatReuqest = false;
      },
      hideloading() {
        this.showLoading = false;
      },
      //返回顶部
      backTop() {
        animate(document.body, {scrollTop: '0'}, 400, 'ease-out');
      },
//监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
      async listenPropChange() {
        this.showLoading = true;
        this.offset = 0;
        let res = await shopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds);
        this.hideLoading();
        //考虑到本地模拟数据是引用类型，所以返回一个新的数组
        this.shopListArr = [...res];
      },

      zhunshi(supports) {
        let zhunStatus;
        if ((supports instanceof Array) && supports.length) {
          supports.forEach(item => {
            if (item.icon_name === '准') {
              zhunStatus = true;
            }
          })
        } else {
          zhunStatus = false;
        }
        return zhunStatus
      },

      //下拉方法
      refresh(loaded) {
        setTimeout(() => {
         this.shopListArr.reverse();
         //this.initData();


          loaded('done');
        }, 2000);
      },
      async loadmore(loaded) {

         // this.dataList = this.dataList.concat(this.dataList);
          this.offset += 5;
          let res =await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
          // alert(JSON.stringify(res));
          this.hideloading();
          this.shopListArr = [...this.shopListArr, ...res];

          //this.shopListArr=this.shopListArr.concat(res);
          setTimeout(()=>{loaded('done')},2000);

      },
      stateChange(state) {
        if (state === 'pull' || state === 'trigger') {
          this.iconLink = '#icon-arrow-bottom';
        } else if (state === 'loading') {
          this.iconLink = '#icon-loading';
        } else if (state === 'loaded-done') {
          this.iconLink = '#icon-finish';
        }
      }



    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../src/style/mixin';

  .shoplist_container {
    background-color: #fff;
    margin-bottom: 2rem;
  }

  .shop_li {
    display: flex;
    border-bottom: 0.025rem solid #f1f1f1;
    padding: 0.7rem 0.4rem;
  }

  .shop_img {
    @include wh(2.7rem, 2.7rem);
    display: block;
    margin-right: 0.4rem;
  }

  .list_back_li {
    /*height: 4.85rem;*/
    .list_back_svg {
      @include wh(100%, 100%)
    }
  }

  .shop_right {
    flex: auto;
    .shop_detail_header {
      @include fj;
      align-items: center;
      .shop_title {
        /*width: 8.5rem;*/
        color: #333;
        padding-top: .01rem;
        @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
        font-weight: 700;
      }
      .premium::before {
        content: '品牌';
        display: inline-block;
        font-size: 0.5rem;
        line-height: .6rem;
        color: #333;
        background-color: #ffd930;
        padding: 0 0.1rem;
        border-radius: 0.1rem;
        margin-right: 0.2rem;
      }
      .shop_detail_ul {
        display: flex;
        transform: scale(.8);
        margin-right: -0.3rem;
        .supports {
          @include sc(0.5rem, #999);
          border: 0.025rem solid #f1f1f1;
          padding: 0 0.04rem;
          border-radius: 0.08rem;
          margin-left: 0.05rem;
        }
      }
    }
    .rating_order_num {
      @include fj(space-between);
      height: 0.6rem;
      margin-top: 0.52rem;
      .rating_order_num_left {
        @include fj(flex-start);
        .rating_section {
          display: flex;
          .rating_num {
            @include sc(0.4rem, #ff6000);
            margin: 0 0.2rem;
          }
        }
        .order_section {
          transform: scale(.8);
          margin-left: -0.2rem;
          @include sc(0.4rem, #666);
        }
      }
      .rating_order_num_right {
        display: flex;
        align-items: center;
        transform: scale(.7);
        min-width: 5rem;
        justify-content: flex-end;
        margin-right: -0.8rem;
        .delivery_style {
          font-size: 0.4rem;
          padding: 0.04rem 0.08rem 0;
          border-radius: 0.08rem;
          margin-left: 0.08rem;
          border: 1px;
        }
        .delivery_left {
          color: #fff;
          background-color: $blue;
          border: 0.025rem solid $blue;
        }
        .delivery_right {
          color: $blue;
          border: 0.025rem solid $blue;
        }
      }
    }
    .fee_distance {
      margin-top: 0.52rem;
      @include fj;
      @include sc(0.5rem, #333);
      .fee {
        transform: scale(.9);
        @include sc(0.5rem, #666);
      }
      .distance_time {
        transform: scale(.9);
        span {
          color: #999;
        }
        .order_time {
          color: $blue;
        }
        .segmentation {
          color: #ccc;
        }
      }
    }
  }

  .loader_more {
    @include font(0.6rem, 3);
    text-align: center;
    color: #999;
  }

  .empty_data {
    @include sc(0.5rem, #666);
    text-align: center;
    line-height: 2rem;
  }

  .return_top {
    position: fixed;
    bottom: 3rem;
    right: 1rem;
    .back_top_svg {
      @include wh(2rem, 2rem);
    }
  }

  .loading-enter-active, .loading-leave-active {
    transition: opacity 1s
  }

  .loading-enter, .loading-leave-active {
    opacity: 0
  }

  .top-load-wrapper {
    line-height: 50px;
    text-align: center;
  }
  .bottom-load-wrapper {
    line-height: 50px;
    text-align: center;
  }
  .icon-arrow {
    transition: .2s;
    transform: rotate(180deg);
  }

  .icon-loading {
    transform: rotate(0deg);
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  .icon-arrow-bottom {
    transition: .2s;
    transform: rotate(180deg);
  }

  .icon-loading-bottom {
    transform: rotate(0deg);
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }


</style>
