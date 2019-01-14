<template>
  <div class="order_page">
    <headtop head-title="订单列表" goBack="true"></headtop>
      <ul class="order_list_ul">
        <li v-if="orderList&&orderList.length===0" class="img_nodata">
          <img src="../../images/1-04.png">
        </li>
        <li class="order_list_li" v-for="item in orderList" :key="item.id">
          <img :src="imgBaseUrl+item.restaurant_image_url" class="restaurant_image">
          <section class="order_item_right">
            <section>
              <header class="order_item_right_header">
                <section class="order_header">
                  <h4>
                    <span class="ellipsis">{{item.restaurant_name}}</span>
                    <svg fill="#333" class="arrow_right">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                  </h4>
                </section>
                <p class="order_status">
                  {{item.status_bar.title}}
                </p>
              </header>
              <section class="order_basket">
                <p class="order_name ellipsis">{{item.basket.group[0][0].name}}{{item.basket.grounp[0].length>1?' 等'+item.basket.group[0].length+'件商品':''}}</p>
                <p class="order_amount">¥{{item.total_amount.toFixed(2)}}</p>
              </section>
            </section>
          </section>
        </li>
      </ul>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
  import headtop from '../../components/header/header'
  import footGuide from '../../components/footer/footGuide'
  import {imgBaseUrl} from "../../config/env"
  import loading from '../../components/common/loading'
  import {mapState,mapMutations} from 'vuex'
  import {getOrderList} from "../../service/getData";
  export default {
    name: "order",
    components: {
      headtop,
      footGuide,
      loading
    },
    data(){
      return{
        orderList:null,//订单列表
        offset:0,
        preventRepeat:false,//防止重复获取
        showLoading:true,//显示加载动画
        imgBaseUrl
      }
    },
    computed:{
      ...mapState([
        'userInfo','geohash'
      ])
    },
    mounted(){
      this.initData();
    },
    methods:{
      async initData(){
        //获取登陆用户信息
        //console.log(JSON.stringify(this.userInfo));
        //获取当前位置信息
        //console.log(this.geohash);
        if(this.userInfo&&this.userInfo.user_id){
          //如果登陆成功显示订单列表
          let res=await getOrderList(this.userInfo.user_id,this.offset);
          this.orderList=[...res];
          console.log(JSON.stringify(this.orderList))
          this.hideLoading();
        }else{
          this.hideLoading();
        }
      },
      hideLoading(){
        this.showLoading = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .order_page{
    background-color: #f1f1f1;
    margin-bottom: 1.95rem;
    p, span, h4{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .order_list_ul{
    .img_nodata{
      img{
        width: 50%;
        text-align: center;
        padding-top: 25%;
        padding-left: 25%;
      }
    }
    padding-top: 1.95rem;
    .order_list_li{
      background-color: #fff;
      display: flex;
      margin-bottom: 0.5rem;
      padding: .6rem .6rem 0;
      .restaurant_image{
        @include wh(2rem, 2rem);
        margin-right: 0.4rem;
      }
      .order_item_right{
        flex: 5;
        .order_item_right_header{
          border-bottom: 0.025rem solid #f5f5f5;
          padding-bottom: .3rem;
          @include fj;
          .order_header{
            h4{
              display: flex;
              align-items: center;
              justify-content: flex-start;
              @include sc(.75rem, #333);
              line-height: 1rem;
              width: 9rem;
              .arrow_right{
                @include wh(.4rem, .4rem);
                fill: #ccc;
                margin-right: .2rem;
              }
            }
            .order_time{
              @include sc(.55rem, #999);
              line-height: .8rem;
            }
          }
          .order_status{
            @include sc(.6rem, #333);
          }
        }
        .order_basket{
          @include fj;
          line-height: 2rem;
          border-bottom: 0.025rem solid #f5f5f5;
          .order_name{
            @include sc(.6rem, #666);
            width: 10rem;
          }
          .order_amount{
            @include sc(.6rem, #f60);
            font-weight: bold;
          }
        }
        .order_again{
          text-align: right;
          line-height: 1.6rem;
          .buy_again{
            @include sc(.55rem, #3190e8);
            border: 0.025rem solid #3190e8;
            padding: .1rem .2rem;
            border-radius: .15rem;
          }
        }
      }
    }
  }
  .loading-enter-active, .loading-leave-active {
    transition: opacity .7s
  }
  .loading-enter, .loading-leave-active {
    opacity: 0
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
