<template>
    <div class="slide">
        <el-carousel trigger="click" height="300px" :interval="5000">
            <el-carousel-item v-for="item in global.bannerList" :key="item.id">
                <router-link to="/">
                    <img v-lazy="item.urlPath2" class="lazy-img-fadein" alt="Banner图">
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
    }
  }
</script>
<style scoped lang="less">
    .slide {
        margin-bottom: 35px;
        border-radius: 6px;
        overflow: hidden;
        z-index: 1000;
        position: relative;
        /*background-color: #d3dce6;*/
        background: rgba(234,234,234, .6);
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
