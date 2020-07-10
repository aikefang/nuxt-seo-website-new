<template>
  <div class="recommend-collection">
    <div class="title">热门分类</div>
    <div class="content">
      <!--        <router-link :to="'category/'+item.parent+'/'+item._id" class="kid jb-all" v-for="item in global.recommendCategoryList" :key="item._id">-->
      <router-link :to="'category/' + item.parent.seo + '/' +item.seo + '/'" class="kid jb-all"
                   v-for="item in global.recommendCategoryList" :key="item._id">
        <!--<i class="iconfont icon-iconfonttag"></i>-->
        <div class="name">{{item.title}}</div>
      </router-link>
      <router-link :to="'category/'" class="kid jb-all more">
        <div class="name">More</div>
      </router-link>
    </div>
  </div>

</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'recommend-collection',
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
	.recommend-collection {
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    background: #ffffff;
    overflow: hidden;
    .title {
      font-size: 14px;
      border-bottom: 1px solid hsla(0, 0%, 58.8%, 0.1);
      padding: 15px;
    }
		.content {
      width: 340px;
      padding: 15px 15px 5px 15px;
      overflow: hidden;

      .kid {
        display: inline-block;
        margin: 0 10px 10px 0;
        min-height: 32px;
        line-height: 32px;
        background-color: #f7f7f7;
        /*border: 1px solid #dcdcdc;*/
        border-radius: 4px;
        vertical-align: top;
        overflow: hidden;
        position: relative;

        > i {
          margin-left: 6px;
          position: absolute;
        }

        .name {
          display: inline-block;
          padding: 0 11px 0 11px;
          font-size: 16px;
          /*margin-left: 22px;*/
        }

        &:hover {
          background-color: #f0f0f0;
        }
      }

      .more {
        /*font-size: 16px;*/
        /*min-height: 32px;*/
        /*line-height: 32px;*/
      }
    }
	}
</style>
