<template>
  <div>
    <navBar></navBar>
    <div class="sign">
      <div class="main">
        <h4 class="title">
          <div class="normal-title">
            <a href="/login" class="cur jb-all">登录</a>
            <b>·</b>
            <!--<el-tooltip class="item" effect="dark" content="暂未开放注册" placement="top">-->
            <a class="js-sign-up-btn jb-all cur active">注册</a>
            <!--</el-tooltip>-->
          </div>
        </h4>
        <div class="js-sign-in-container">
          <div class="input-prepend">
            <input placeholder="手机号或邮箱" v-model="account" type="text" class="account" name="account">
            <i class="iconfont icon-yonghu"></i>
          </div>
          <div class="input-prepend restyle">
            <input placeholder="密码" v-model="password" type="password" name="session[password]"
                   id="session_password">
            <i class="iconfont icon-icon"></i>
          </div>
          <div class="remember-btn">
            <!--<input type="checkbox" value="true" checked="checked" name="remember" id="remember"-->
            <!--class="remember-me">-->
            <!--<label for="remember">记住我</label>-->
          </div>
          <input name="commit" @click="register" type="button" value="登录" class="sign-in-button">
          <MoreSign></MoreSign>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  import NavBar from '~/components/NavBar.vue'
  import MoreSign from '~/components/MoreSign.vue'
  // import md5 from 'js-md5';
  import { Md5 } from "ts-md5/dist/md5";
  export default {
    name: 'Register',
    async asyncData({store, route, params}) {
      // store.state.navStatus = -1
      return {
        url: route.query.url
      }
    },
    components: {
      NavBar,
      MoreSign
    },
    data() {
      return {
        account: '',
        password: '',
      }
    },
    methods: {
      async register() {
        const registerData = {
          account: this.account,
          password: Md5.hashStr(this.password).toString(),
          userType: 2,
        }

        const res = await this.$axios.post(`/api/user/register`, registerData)
        if (res.status === 200) {
          this.$message.success('注册成功')
          window.location.href = '/'
        } else {
          this.$message.error(res.message)
        }
      }
    },
    computed: {},
    mounted() {}
  }


</script>
<style scoped lang="less">

  input:-webkit-autofill, select:-webkit-autofill {
    /*-webkit-box-shadow: 0 0 0px 1000px #40a6f5 inset !important;*/
    -webkit-text-fill-color: #333333 !important; //设置字体颜色
  }

  .sign {
    height: 100%;
    /*min-height: 750px;*/
    text-align: center;
    font-size: 14px;
    padding-top: 56px;
    .main {
      width: 400px;
      margin: 150px auto 0;
      padding: 50px 50px 30px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 0 8px rgba(0, 0, 0, .1);
      vertical-align: middle;
      display: inline-block;
      .title {
        font-family: -apple-system, SF UI Display, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
        margin: 0 auto 50px;
        padding: 10px;
        font-weight: 400;
        color: #969696;
        font-size: 18px;
        .normal-title {

        }
        .active {
          font-weight: 700;
          color: #ea6f5a;
          border-bottom: 2px solid #ea6f5a;
        }
        b {
          padding: 10px;
        }
        a {
          padding: 10px;
          color: #969696;
        }
        a:hover {
          border-bottom: 2px solid #ea6f5a;
        }
      }
      .js-sign-in-container {
        .input-prepend {
          position: relative;
          width: 100%;
          input {
            border-radius: 4px 4px 0 0;
            width: 100%;
            height: 50px;
            margin-bottom: 0;
            padding: 4px 12px 4px 35px;
            border: 1px solid #c8c8c8;
            border-bottom: none;
            background-color: hsla(0, 0%, 71%, .1);
            vertical-align: middle;
          }
          i {
            position: absolute;
            top: 14px;
            left: 10px;
            font-size: 18px;
            color: #969696;
          }
        }
        .input-prepend.restyle {
          input {
            border-radius: 0 0 4px 4px;
            border-bottom: 1px solid #c8c8c8;
          }

        }
      }
    }
    .remember-btn {
      float: left;
      margin: 15px 0;
      input {
        font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
        margin: 4px 0 0;
        line-height: normal;
        box-sizing: border-box;
        padding: 0;
        font-size: inherit;
        color: inherit;
      }
      label {
        padding-left: 5px;
      }
    }
    .sign-in-button {
      width: 100%;
      padding: 9px 18px;
      font-size: 18px;
      border: none;
      border-radius: 25px;
      color: #fff;
      background: #3194d0;
      text-align: center;
      font-weight: bold;
      cursor: pointer;
      outline: none;
      display: block;
      clear: both;
    }
  }
</style>
