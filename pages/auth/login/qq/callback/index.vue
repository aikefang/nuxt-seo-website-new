<template>
  <div class="qq">
    <div class="qq-box">
      <div class="user-info">
        <div class="bind-box">
          <div class="head-box">
            <div class="head-img">
              <img :src="qq.figureurl_qq" alt="">
            </div>
            <p class="user-name">
              {{qq.nickname}}
            </p>
          </div>
          <i class="iconfont icon-guanlian"></i>
          <div class="head-box">
            <div class="head-logo-img">
              <img src="//static.webascii.cn/webascii/old_pictures/uploads/logo-min.png" alt="">
            </div>
            <p class="user-name">
              webascii.cn
            </p>
          </div>
        </div>
      </div>
      <div class="tips">
        <p>
          亲爱的 {{qq.nickname}} 您好，首次使用QQ账户登录，请选择一种登录方式!
        </p>
      </div>
      <div class="account-password">
        <el-tabs v-model="activeName" :stretch="true" @tab-click="changePattern">
          <el-tab-pane label="注册新账号" name="first">
            <el-form :model="autoAccountForm" :rules="autoAccountFormRules" ref="autoAccountForm" class="">
              <el-form-item prop="account">
                <el-input
                  placeholder="请输入账号"
                  v-model="autoAccountForm.account">
                  <!--<el-button @click="refreshAccount" slot="append" icon="el-icon-refresh"></el-button>-->
                  <el-tooltip slot="suffix" class="random-tip" effect="dark" content="随机生成账号" placement="top">
                    <i
                      class="refresh-btn el-icon-refresh"
                      @click="refreshAccount">
                    </i>
                  </el-tooltip>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="autoAccountForm.password" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="medium" @click="submitRegister('autoAccountForm')">确认注册新用户</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="绑定旧账号" name="second">
            <el-form :model="oldAccountForm" :rules="oldAccountFormRules" ref="oldAccountForm" class="">
              <el-form-item prop="account">
                <el-input placeholder="请输入账号" v-model="oldAccountForm.account"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="oldAccountForm.password" show-password></el-input>
              </el-form-item>
              <el-form-item style="text-align: right">
                <el-button size="medium" @click="submitBinding('oldAccountForm')">确认绑定旧用户</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  // import md5 from 'js-md5';
  import { Md5 } from 'ts-md5/dist/md5'

  export default {
    name: 'qqLogin',
    async asyncData({store, route, params, redirect}) {
      let qqUserInfo = await store.dispatch('qqUserInfo', {
        code: route.query.code
      })

      if (qqUserInfo.status != 200) {
        redirect(`/login`)
//        return {
//          hasLogin: false,
//          qq: {}
//        }
      } else {
        let hasLogin = qqUserInfo.data.hasLogin
        let userInfo = qqUserInfo.data.qq
        return {
          hasLogin,
          qq: userInfo
        }
      }
    },
    data() {
      // 验证旧用户
      let validateOldAccount = async (rule, value, callback) => {
        let checkRegister = await this.$store.dispatch('checkRegister', {
          account: value
        })
        if (checkRegister.data.hasUser === false) {
          callback(new Error('此账号不存在'))
        } else {
          callback()
        }
      }
      // 验证新用户
      let validateNewAccount = async (rule, value, callback) => {
        let checkRegister = await this.$store.dispatch('checkRegister', {
          account: value
        })
        if (checkRegister.data.hasUser === false) {
          callback()

        } else {
          callback(new Error('此账号已被注册'))
        }
      }
      return {
        activeName: 'first',
        oldAccountForm: {
          account: '',
          password: '',
        },
        oldAccountFormRules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'},
            {validator: validateOldAccount, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
        },
        autoAccountForm: {
          account: '',
          password: '',
        },
        autoAccountFormRules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'},
            {validator: validateNewAccount, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
        },
      }
    },
    methods: {
      /**
       * 绑定用户
       * @param type
       * new：新用户
       * old：旧用户
       */
      async bindUser(type) {
        let account = {}
        if (type == 'old') {
          account = {
            account: this.oldAccountForm.account,
            password: Md5.hashStr(this.oldAccountForm.password).toString()
          }
        } else if (type == 'new') {
          account = {
            account: this.autoAccountForm.account,
            password: Md5.hashStr(this.autoAccountForm.password).toString()
          }
        }
        let param = {
          ...this.qq,
          ...account,
          bindType: type
        }

        // let bindDate = await this.$store.dispatch('bindQqUser', param)
        // if (bindDate.status != 200) {
        //   this.$message.error(bindDate.error)
        // } else {
        //   this.$cookie.set('loginToken', bindDate.data.user.loginToken)
        //   this.$cookie.set('userId', bindDate.data.user.id)
        //   this.$cookie.set('nickname', bindDate.data.user.nickname)
        //   this.$store.state.Cookies.loginToken = bindDate.data.user.loginToken
        //   this.$store.state.Cookies.nickname = bindDate.data.user.id
        //   this.$store.state.Cookies.userId = bindDate.data.user.nickname
        //   window.location.href = '/'
        // }
      },
      // 确认绑定旧账号
      submitBinding(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.bindUser('old')
//            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      // 确认注册新用户
      submitRegister(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.bindUser('new')
//            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      // 变更注册模式
      changePattern(tab, event) {
        if (tab.index == 0) { // 自动生成账号

        } else if (tab.index == 1) { // 绑定旧账号

        }
      },
      // 重新生成账号
      refreshAccount() {
        this.autoAccountForm.account = this.github.login + '-' + this.getRandomAccount()
      },
      getRandomAccount() {
        return Math.random().toString(36).substr(8)
      }
    },
    components: {},
    computed: {},
    async mounted() {
      let qqData = await this.$store.dispatch('qqAutoLogin', {
        id: this.qq.openid
      })
      if (qqData.status == 200) {
        this.$cookie.set('loginToken', qqData.data.user.loginToken)
        this.$cookie.set('userId', qqData.data.user.id)
        this.$cookie.set('nickname', qqData.data.user.nickname)
        this.$store.state.Cookies.loginToken = qqData.data.user.loginToken
        this.$store.state.Cookies.nickname = qqData.data.user.id
        this.$store.state.Cookies.userId = qqData.data.user.nickname
        window.location.href = '/'
      }
    }
  }
</script>
<style>
  input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px #ffffff inset !important;
    /*填充字体颜色*/
    -webkit-text-fill-color: #3E3E3E !important;
    /*光标颜色*/
    caret-color: #3E3E3E;
  }
</style>
<style scoped lang="less">
  .qq {
    background-color: #f6f8fa;
    padding-top: 100px;
    height: 100%;
    .qq-box {
      display: flex;
      flex-direction: column;
      width: 400px;
      background-color: #fff;
      border: 1px solid #d8dee2;
      margin: 0 auto;
      border-radius: 5px;
      padding: 20px;
      .user-info {
        display: flex;
        /*justify-content: center;*/
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        font-size: 18px;
        color: #24292e;
        border-bottom: 1px solid #e1e4e8;
        padding-bottom: 16px;
        .bind-box {
          display: flex;
          .iconfont {
            display: flex;
            align-items: center;
            margin: 0 20px 30px 20px;
            font-size: 30px;
            color: #999999;
          }
          .head-box {
            .head-img {
              height: 96px;
              width: 96px;
              border-radius: 50%;
              box-shadow: 0 1px 5px rgba(27, 31, 35, .15);
              display: flex;
              justify-content: center;
              background-color: #f6f8fa;
              img {
                height: 96px;
                width: 96px;
                border-radius: 50%;
              }
            }
            .head-logo-img {
              width: 100px;
              height: 96px;
              display: flex;
              align-items: center;
              img {
                width: 100px;
                /*border-radius: 50%;*/
              }
            }
            .user-name {
              margin: 10px 0;
              text-align: center;
            }
          }

        }
      }
      .tips {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          background-color: #f0f9eb;
          color: #67c23a;
          border-radius: 4px;
          display: flex;
          font-size: 13px;
          line-height: 18px;
          align-items: center;
          padding: 8px 16px;
        }
      }
      .account-password {
        width: 100%;
        .refresh-btn {
          width: 30px;
          cursor: pointer;
          outline: none;
        }
        .random-tip {
          user-select: none;
        }
      }
    }
  }
</style>
