<template>
    <div class="slide">
        <el-carousel trigger="click" height="300px" :interval="5000">
            <el-carousel-item v-for="item in global.bannerList" :key="item.id">
                <router-link to="/">
                    <img :src="item.urlPath2" alt="">
                </router-link>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'Slide',
    data() {
      return {}
    },
    components: {},
    computed: {
        ...mapState(['global']),
    },
    mounted() {
        console.log(this.banner)
//      console.log(this.apiData)
      // 改变api的数据
//      this.$store.commit('setApiData', {
//        key: 'aList',
//        data: '123aaaaaa'
//      })
    }
  }
</script>
<style>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
<style scoped lang="less">
    .slide {
        margin-bottom: 35px;
        border-radius: 6px;
        overflow: hidden;
        z-index: 1000;
        position: relative;
        background-color: #d3dce6;
        width: 840px;
        height: 300px;
        .el-carousel__item {
            a {
                display: block;
                height: 100%;
                img{
                    display: block;
                    height: 100%;
                }
            }
        }

        /*float: left;*/
    }
</style>
