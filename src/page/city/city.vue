<template>
  <div class="city_container">
    <headtop><span class="head_logo"  :head-title="cityname" @click="reload">ele.me</span></headtop>

    <headtop :head-title="cityname" go-back='true'>
      <!--<router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>-->
    </headtop>
    <form class="city_form">
      <div>
        <input type="search" name="city" placeholder="输入搜索的名字" class="city_input input" required v-modal='inputValue'/>
      </div>
      <div>
        <input type="submit" name="submit" class="city_submit input_style" value="提交">
      </div>
    </form>
    <header v-if="historytitle" class="pois_search_history">
      搜索历史
    </header>
    <ul class="getpois_ul">
      <!--<li v-for="(item,index) in placelist"></li>-->

    </ul>
    <footer v-if="historytitle&&placelist.length" class="clear_all_history"></footer>
    <div class="search_none_place" v-if="placeNone">很抱歉，无搜索结果</div>
  </div>

</template>

<script>
  import headtop from '../../components/header/header';
  import {currentcity} from '../../service/getData';
  export default {
    name: "city",
    data() {
      return{
        inputValue:'',//搜索地址
        cityid:'',//当前城市id
        cityname:'',//当前城市名字
        placelist:[],//搜索城市列表
        placeHistory:[],//历史搜索记录
        placeNone:false,//搜索无结果，显示提示信息

      }

    },
    components: {
      headtop
    },
    mounted(){
      this.cityid=this.$route.params.cityid;//路由获取cityid
      currentcity(this.cityid).then(res=>{
        console.log("获取当前城市："+JSON.stringify(res));
        this.cityname=res.name;

        console.log("城市名字"+this.cityname);
      });

    }

  }
</script>

<style scoped>

</style>
