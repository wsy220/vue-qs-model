<template>
  <div class="home_container">
    <headtop><span class="head_logo"  @click="reload">ele.me</span></headtop>
    <div class="mui-content">
      <div class="mui-content-padded">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idcard">
            <el-input v-model="form.idcard"></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="现住址：" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="户籍地址：" prop="huji_address">
            <el-input v-model="form.huji_address"></el-input>
          </el-form-item>
          <el-form-item label="乡镇(街道)名称：" prop="xiangzhen_name">
            <el-input v-model="form.xiangzhen_name"></el-input>
          </el-form-item>
          <el-form-item label="村(居)委会名称：" prop="chunwei_name">
            <el-input v-model="form.chunwei_name"></el-input>
          </el-form-item>
          <el-form-item label="人群分类：" prop="enterpriseId">
            <el-select v-model="form.value5" placeholder="请选择" style="float: left;" @change="changevalue">
              <el-option v-for="(item,index) in options" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>


          <div class="mui-content-padded" id="buttonLi" v-for="(item,index) in type">
            <button type="button" class="button-last" id="buttonid" data-id="">
              <span class="border-line">{{item.value}}</span>
            </button>
          </div>
          <!--<el-form-item label="活动性质" prop="checkboxDemo">-->
          <!--<el-checkbox-group v-model="form.type">-->
          <!--<el-checkbox label="美食/餐厅线上活动" name="type" @selection-change="changeFun"></el-checkbox>-->
          <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
          <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
          <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
          <!--</el-checkbox-group>-->
          <!--</el-form-item>-->

          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>

      </div>

    </div>

  </div>


</template>

<script>
  import headtop from '../../components/header/header'
  import {getfenlei} from "../../service/getData";
  // import mui from '../../../style/mui/mui.min'

  export default {
    data() {
      return {
        visible: false,
        form: {
          name: '',
          idcard: '',
          tel: '',
          address: '',
          huji_address: '',
          xiangzhen_name: '',
          chunwei_name: '',
          options: [],
          type: [],
          value5: [],
        },
        options: [{
          value: '选项1',
          label: '普通人群'
        }, {
          value: '选项2',
          label: '重点人群'
        }],
        type: [
          {
            value: '美食/餐厅线上活动',
            label: '美食/餐厅线上活动'
          }, {
            value: '地推活动',
            label: '地推活动'

          }, {
            value: '线下主题活动',
            label: '线下主题活动'

          }, {
            value: '单纯品牌曝光',
            label: '单纯品牌曝光'
          }]

      }
    },
    name: 'home',
    components: {
      headtop
    },
    mounted() {
      getfenlei().then(res => {
        console.log(JSON.stringify(res));
      })
    },
    created() {

    },
    methods: {
      onSubmit(form) {
        var that = this;
        console.log(that.form.name);
        console.log(that.form.enterpriseId);
        console.log('submit!');
      },
      changevalue(val) {
//						var obj = {};
//						obj = this.options.find((item) => {
//							return item.value === val; //比如：选项2
//						})
        console.log(val);
      },
      selectTime(val) {
        console.log(val);
      },
      reload(){
        window.location.reload();
      }
    }
  }
</script>

<style scoped>
  .home_container {
    color: #FFF;
    font-size: 12px;
  }

  .mui-control-content {
    height: 350px;
    height: 80vh;
    display: block;
  }

  .mui-scroll-wrapper {
    position: absolute;
    z-index: 0;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
  }

  .button-last {
    font-size: 12px !important;
    text-align: center;
    color: #CCCCCC;
    white-space: inherit;
    line-height: 22px;
    border: 1px solid #d1d1d1;
    border-radius: 15px;
    margin-bottom: 10px;
    margin-right: 5px;
  }

  .change-color {
    border: 1px solid #4269B8;
    color: #FFF;
    background: #4269B8;
  }

  #buttonLi {
    margin: 15px;
  }

  button {
    padding: 3px 6px;
  }

  .dibu {
    bottom: 0;
    margin: 0;
    padding: 0;
    padding-left: 15px;
    padding-right: 15px;
  }
</style>
