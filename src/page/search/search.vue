<template>
  <div class="paddingTop search_page">
    <headtop head-title="搜索" goBack="true"></headtop>
    <form class="search_form">
      <input type="search_form" name="search" placeholder="请输入商家或美食名称" class="search_input" v-model="searchValue" @input="checkInput">
      <input type="submit" name="submit" class="search_submit" @click="searchTarget('')">
    </form>
    <foot-guide></foot-guide>
  </div>

</template>

<script>
  import FootGuide from "../../components/footer/footGuide";
  import headtop from '../../components/header/header';
  import {imgBaseUrl} from "../../config/env";
  import {searchRestaurant} from '../../service/getData';
  export default {
    name: "search",
    components: {FootGuide, headtop},
    data() {
      return {
        geohash: '',//msite传来的地址信息
        searchValue: '',//搜索内容
        restaurantList: [],//搜索返回的结果
        imgBaseUrl,
        searchHistory: [],//搜索历史记录
        showHistory: true,//是否显示历史记录，只有返回搜索结果后隐藏
        emptyResult: false,//搜索结果为空时显示
      }
    },
    mounted() {
      this.geohash = this.$route.params.geohash;
      console.log("地址信息" + this.geohash);
    },
    methods:{
      //input置空
      checkInput(){
        if(this.searchValue===''){
          this.showHistory=true;
          this.restaurantList=[];
          this.emptyResult=false;
        }
      },
      async searchTarget(historyValue){
        if(historyValue){
          this.searchValue=historyValue;
        }else if(!this.searchValue){
          return;
        }
        //隐藏历史记录
        this.showHistory=false;
        this.restaurantList=await searchRestaurant(this.geohash,this.searchValue);
        this.emptyResult=!this.restaurantList.length;
      }


    }


  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .paddingTop {
    padding-top: 2.95rem;
  }  .search_page{
    margin-bottom: 2rem;
  }
  .search_form{
    background-color: #fff;
    padding: 0.5rem;
    display: flex;
    input{
      height: 1.5rem;
    }
    .search_input{
      flex: 4;
      border: 0.025rem solid $bc;
      @include sc(0.65rem, #333);
      border-radius: 0.125rem;
      background-color: #f2f2f2;
      font-weight: bold;
      padding: 0 0.25rem;
    }
    .search_submit{
      flex: 1;
      border: 0.025rem solid $blue;
      margin-left: .2rem;
      @include sc(0.65rem, #fff);
      border-radius: 0.125rem;
      background-color: $blue;
      font-weight: bold;
      padding: 0 0.25rem;
    }
  }
  .title_restaurant{
    font-size: 0.6rem;
    line-height: 2rem;
    text-indent: 0.5rem;
    font-weight: bold;
    color: #666;
  }
  .list_container{
    background-color: #fff;
  }
  .list_li{
    display: flex;
    justify-content: 'center';
    padding: 0.5rem;
    border-bottom: 0.025rem solid $bc;
    .item_left{
      margin-right: 0.25rem;
      .restaurant_img{
        @include wh(1.7rem, 1.7rem);
      }
    }
    .item_right{
      font-size: 0.55rem;
      flex: 1;
      .item_right_text{
        padding-bottom: 0.25rem;
        border-bottom: 0.025rem solid $bc;
        p{
          line-height: .9rem;
        }
        .pay_icon{
          margin-bottom: -0.08rem;
        }
      }
      .item_right_detail{
        margin-top: 0.25rem;
        li{
          font-size: 0;
          span{
            font-size: .5rem;
            vertical-align: middle;
            display: inline-block;
            margin-bottom: 0.2rem;
          }
          .activities_icon{
            @include sc(.5rem, #fff);
            font-weight: bold;
            padding: .04rem;
            border-radius: 0.15rem;
            margin-right: 0.125rem;
          }
          .only_phone{
            color: #FF6000;
          }
        }
      }
    }
  }
  .search_history{
    .history_list{
      background-color: #fff;
      border-bottom: 0.025rem solid $bc;
      @include font(0.7rem, 2rem);
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .history_text{
        display: inline-block;
        width: 80%;
      }
      .delete_icon{
        @include wh(1rem, 1rem);
      }
    }
    .clear_history{
      background-color: #fff;
      color: $blue;
      @include font(.7rem, 2rem);
      font-weight: bold;
      text-align: center;
    }
  }
  .search_none{
    margin: 0 auto;
    @include font(0.65rem, 1.75rem);
    color: #333;
    background-color: #fff;
    text-align: center;
    margin-top: 0.125rem;
  }

</style>

