<template>
  <!--更多登录方式-->
  <div class="more-sign">
    <h6>社交帐号登录</h6>
    <div class="sign-list">
<!--      <a href="https://github.com/login/oauth/authorize?client_id=552b7d172a0576884f9a" class="github-icon iconfont icon-GitHub"></a>-->
      <a href="https://github.com/login/oauth/authorize?client_id=8d34af5479edcb806db0" class="github-icon iconfont icon-GitHub"></a>
      <a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101570897&redirect_uri=https://www.webascii.cn/auth/login/qq/callback&state=webascii" class="qq-icon iconfont icon-qq"></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MoreSign',
    data() {
      return {}
    },
    components: {},
    computed: {},
    mounted() {

    }
  }
</script>
<style scoped lang="less">
  .more-sign {
    margin-top: 40px;
    h6 {
      position: relative;
      margin: 0 0 10px;
      font-size: 12px;
      color: #b5b5b5;
      &:before,&:after {
        content: "";
        border-top: 1px solid #b5b5b5;
        display: block;
        position: absolute;
        width: 60px;
        top: 5px;
      }
      &:before {
        left: 30px;
      }
      &:after {
        right: 30px;
      }
    }
    .sign-list {
      display: flex;
      justify-content: center;
      height: 30px;
      a {
        margin: 0 8px;
        position: relative;
        cursor: pointer;
      }
      .github-icon {
        font-size: 26px;
        width: 26px;
        height: 26px;
      }
      .qq-icon {
        font-size: 27px;
        width: 27px;
        height: 27px;
        bottom: 1px;
      }
    }
  }
</style>
