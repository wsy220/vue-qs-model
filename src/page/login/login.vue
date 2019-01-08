<template>
  <div class="loginContainer">
    <headtop :head-title="'登录'"><span class="head_logo" @click="reload">ele.me</span></headtop>
    <form class="loginForm">
      <section class="input_container phone_number">
        <input type="text" placeholder="账号密码随便输入" name="phone" maxlength="11" v-model="phoneNumber">
        <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">
          获取验证码
        </button>
        <button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
      </section>
      <section class="input_container">
        <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
      </section>
    </form>
    <div class="login-box" id="app">
      <el-row>
        <el-col :span="24">
          <el-input id="name" v-model="phoneNumber" placeholder="请输入帐号">
            <template slot="prepend">帐号</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input id="password" v-model="passWord" type="password" placeholder="请输入密码">
            <template slot="prepend">密码</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-input id="yanzhengma" v-model="codeNumber" type="text" placeholder="请输入密码">
            <template slot="prepend">验证码</template>
          </el-input>

        </el-col>
        <el-col :span="12">
          <div class="img_change_img" style="display: flex;padding-left: 10px">
            <img v-show="captchaCodeImg" :src="captchaCodeImg">
            <div class="change_img" @click="getCaptchaCode">
              <p>换一张</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button id="login" v-on:click="mobileLogin" style="width:100%" type="primary">登录</el-button>
        </el-col>
      </el-row>
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
  import headtop from '../../components/header/header'
  import alertTip from '../../components/common/alertTip'
  import ElContainer from "element-ui/packages/container/src/main";
  import {mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin} from '../../service/getData'
  // import alertTip from '../../components/common'
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: "login",
    data() {
      return {
        //短信验证码登录方式
        loginWay: false, //登录方式，默认短信登录
        showPassword: false, // 是否显示密码
        phoneNumber: null, //电话号码
        mobileCode: null, //短信验证码
        validate_token: null, //获取短信时返回的验证值，登录时需要
        computedTime: 0, //倒数记时

        //图片验证码登录方式
        userInfo: null, //获取到的用户信息
        userAccount: null, //用户名
        passWord: null, //密码
        captchaCodeImg: null, //验证码地址
        codeNumber: null, //验证码


        showAlert: false, //显示提示组件
        alertText: null, //提示的内容


      }


    },

    created() {
      this.getCaptchaCode();
    },

    components: {
      ElContainer,
      headtop,
      alertTip
    },
    computed: {
      //判断手机号码
      rightPhoneNumber: function () {
        return /^1\d{10}$/gi.test(this.phoneNumber)
      },
      //弹框
      open() {
        this.$alert(this.alertText, '标题名称', {
          confirmButtonText: '确定'
        });
      }

    },
    methods: {
      ...mapMutations(['RECORD_USERINFO']),
      async getCaptchaCode() {
        let res = await getcaptchas();
        console.log(JSON.stringify(res));
        this.captchaCodeImg = res.code;
      },
      async getVerifyCode() {
        if (this.rightPhoneNumber) {
          this.computedTime = 30;
          this.timer = setInterval(() => {
            this.computedTime--;
            if (this.computedTime == 0) {
              clearInterval(this.timer);
            }
          }, 1000)
        }

        // let exsis=await checkExsis(this.phoneNumber,'mobile');
        // console.log("------->>>>>"+exsis);
        // if(exsis.message){
        //   return
        // }else if(exsis){
        //
        // }

        //发送短信验证码
        // let res = await mobileCode(this.phoneNumber);
        // console.log("------->>>>>"+res);
      },


      //发送登录信息
      async mobileLogin() {
        if (!this.rightPhoneNumber) {
          // this.showAlert = true;
          this.alertText = "手机号码不正确";
          this.open();


          return;
        } else if (!this.passWord) {
          // this.showAlert = true;
          // this.alertText = "请输入密码";
          this.open();
          return;
        } else if (!this.codeNumber) {
          // this.showAlert = true;
          // this.alertText = "请输入验证码";
          this.open();
          return;
        }

        this.userinfo = await accountLogin(this.phoneNumber, this.passWord, this.codeNumber);
        console.log(JSON.stringify(this.userinfo));
        //如果返回不正确则
        if (!this.userinfo.user_id) {
          alert(this.userInfo.message);
          this.getCaptchaCode();
        } else {
          this.$router.go(-1);
        }

      },
      closeTip() {
        this.showAlert = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  .loginContainer {
    padding-top: 1.95rem;
    p, span, input {
      font-family: Helvetica Neue, Tahoma, Arial;
    }
    p {
      font-size: 17px;
    }
  }

  .change_login {
    position: absolute;
    @include ct;
    right: 0.75rem;
    @include sc(.7rem, #fff);
  }

  .loginForm {
    background-color: #fff;
    margin-top: .6rem;
    .input_container {
      display: flex;
      justify-content: space-between;
      padding: .6rem .8rem;
      border-bottom: 1px solid #f1f1f1;
      input {
        @include sc(.7rem, #666);
      }
      button {
        @include sc(.65rem, #fff);
        font-family: Helvetica Neue, Tahoma, Arial;
        padding: .28rem .4rem;
        border: 1px;
        border-radius: 0.15rem;
      }
      .right_phone_number {
        background-color: #4cd964;
      }
    }
    .phone_number {
      padding: .3rem .8rem;
    }
    .captcha_code_container {
      height: 1.2rem;
      .img_change_img {
        display: flex;
        align-items: center;
        img {
          @include wh(1.5rem, .5rem);
          margin-right: .2rem;
        }
        .change_img {
          display: flex;
          flex-direction: 'column';
          flex-wrap: wrap;
          width: 1rem;
          justify-content: center;
          p {
            @include sc(.3rem, #666);
          }
          p:nth-of-type(2) {
            color: #3b95e9;
            margin-top: .2rem;
          }
        }
      }
    }
  }

  .login_tips {
    @include sc(.5rem, red);
    padding: .4rem .6rem;
    line-height: .5rem;
    a {
      color: #3b95e9;
    }
  }

  .login_container {
    margin: 0 .5rem 1rem;
    @include sc(.7rem, #fff);
    background-color: #4cd964;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
  }

  .button_switch {
    background-color: #ccc;
    display: flex;
    justify-content: center;
    @include wh(2rem, .7rem);
    padding: 0 .2rem;
    border: 1px;
    border-radius: 0.5rem;
    position: relative;
    .circle_button {
      transition: all .3s;
      position: absolute;
      top: -0.2rem;
      z-index: 1;
      left: -0.3rem;
      @include wh(1.2rem, 1.2rem);
      box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0, 0, 0, .1);
      background-color: #f1f1f1;
      border-radius: 50%;
    }
    .trans_to_right {
      transform: translateX(1.3rem);
    }
    span {
      @include sc(.45rem, #fff);
      transform: translateY(.05rem);
      line-height: .6rem;
    }
    span:nth-of-type(2) {
      transform: translateY(-.08rem);
    }
  }

  .change_to_text {
    background-color: #4cd964;
  }

  .to_forget {
    float: right;
    @include sc(.6rem, #3b95e9);
    margin-right: .3rem;
  }
  input {
    border: 0px;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .login-box {
    margin-top: 2%;
    /*margin-left: 40%;*/
  }
</style>
