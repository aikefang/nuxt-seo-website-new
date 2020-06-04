<template>
    <div class="footer">
        <!--<img class="img-bg" src="//static.webascii.cn/webascii/old_pictures/uploads/foot-background.png" alt="">-->
        <div class="technology lin1">
            <span class="title">前端技术栈：</span>
            <div class="list">
                <span class="jb-all">Vue v2.0</span>
                <span class="jb-all">vue-cli v2.9.6</span>
                <span class="jb-all">Element UI v2.3.2</span>
                <span class="jb-all">Nuxt.js</span>
                <span class="jb-all">GitHub</span>
                <span class="jb-all">七牛云CDN</span>
                <span class="jb-all">Service Worker</span>
            </div>
        </div>
        <div class="technology">
            <span class="title">后端技术栈：</span>
            <div class="list">
                <span class="jb-all">Jenkins 自动化部署</span>
                <span class="jb-all">Jenkins 持续集成</span>
                <span class="jb-all">Node.js</span>
                <span class="jb-all">CentOS</span>
                <span class="jb-all">Nginx</span>
                <span class="jb-all">HTTPS</span>
                <span class="jb-all">HTTP 2.0</span>
                <span class="jb-all">MySQL</span>
                <span class="jb-all">Express</span>
            </div>
        </div>
        <div class="Copyright">
            版权所有Copyright 2016-2019, All Rights Reserved <a class="jb-all" href="http://www.miitbeian.gov.cn/">鲁ICP备15001470号</a>
        </div>
    </div>
</template>

<script>
  //  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'Footer',
    data() {
      return {}
    },
    components: {},
    computed: {},
    mounted() {
      // 百度push代码
      (function(){
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
          bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }
        else {
          bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
      })();
    }
  }
</script>
<style scoped lang="less">
    .footer {
        /*position: relative;*/
        padding: 20px 0;
        width: 1200px;
        margin: 0 auto;
        background-image: url("//static.webascii.cn/webascii/old_pictures/uploads/foot-background.png");
        background-size: 765px 172px;
        background-repeat: no-repeat;
        background-position: center;
        /*.img-bg {*/
            /*width: 765px;*/
            /*height: 172px;*/
            /*position: absolute;*/
            /*left: 50%;*/
            /*margin-left: -380px;*/
            /*z-index: -1;*/
        /*}*/
        .lin1{
            margin-top: 50px;
        }
        .technology {
            color: #999999;
            /*text-align: center;*/
            font-size: 14px;
            display: flex;
            margin-bottom: 10px;
            .title {
                /*margin-right: 10px;*/
                font-size: 14px;
            }
            .list {
                display: flex;
                align-items: center;
                span {
                    display: flex;
                    align-items: center;
                    border: 1px solid #999999;
                    height: 18px;
                    border-radius: 18px;
                    padding: 2px 5px 2px 5px;
                    cursor: pointer;
                    margin-right: 5px;
                    &:hover{
                        border: 1px solid #ea6f5a;
                        color: #ea6f5a;
                    }
                }
            }
        }
        .Copyright {
            color: #999999;
            /*text-align: center;*/
            font-size: 14px;
            a {
                color: #999999;
                &:hover {
                    color: #ea6f5a;
                }
            }
        }
    }
</style>
