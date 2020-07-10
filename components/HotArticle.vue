<template>
  <div class="hot-article">
    <div class="left">
      <div class="row">
        <a
          class="item"
          :href="'/article/' + global.hotArticleList[3]._id + '/'"
          :title="global.hotArticleList[3].title"
          target="_blank">
          <img class="lazy-img-fadein"
               v-lazy="global.hotArticleList[3].articleImageView + '?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80|imageView2/1/w/180/h/150'"
               :alt="global.hotArticleList[3].title">
          <span class="bottom-bar">
            <span class="tof">{{ global.hotArticleList[3].title }}</span>
          </span>
        </a>
        <a
          class="item"
          :href="'/article/' + global.hotArticleList[1]._id + '/'"
          :title="global.hotArticleList[1].title"
          target="_blank">
          <img class="lazy-img-fadein"
               v-lazy="global.hotArticleList[1].articleImageView + '?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80|imageView2/1/w/270/h/150'"
               :alt="global.hotArticleList[1].title">
          <span class="bottom-bar">
            <span class="tof">{{ global.hotArticleList[1].title }}</span>
          </span>
        </a>
      </div>
      <div class="row">
        <a
          class="item"
          :href="'/article/' + global.hotArticleList[2]._id + '/'"
          :title="global.hotArticleList[2].title"
          target="_blank">
          <img class="lazy-img-fadein"
               v-lazy="global.hotArticleList[2].articleImageView + '?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80|imageView2/1/w/270/h/150'"
               :alt="global.hotArticleList[2].title">
          <span class="bottom-bar">
            <span class="tof">{{ global.hotArticleList[2].title }}</span>
          </span>
        </a>
        <a
          class="item" :href="'/article/' + global.hotArticleList[4]._id + '/'"
          :title="global.hotArticleList[4].title"
          target="_blank">
          <img class="lazy-img-fadein"
               v-lazy="global.hotArticleList[4].articleImageView + '?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80|imageView2/1/w/180/h/150'"
               :alt="global.hotArticleList[4].title">
          <span class="bottom-bar">
            <span class="tof">{{ global.hotArticleList[4].title }}</span>
          </span>
        </a>
      </div>
    </div>
    <div class="right">
      <div class="row">
        <a
          class="item" :href="'/article/' + global.hotArticleList[5]._id + '/'"
          :title="global.hotArticleList[5].title"
          target="_blank">
          <img class="lazy-img-fadein"
               v-lazy="global.hotArticleList[5].articleImageView + '?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80|imageView2/1/w/170/h/120'"
               :alt="global.hotArticleList[5].title">
          <span class="bottom-bar">
            <span class="tof">{{ global.hotArticleList[5].title }}</span>
          </span>
        </a>
        <a
          class="item"
          :href="'/article/' + global.hotArticleList[6]._id + '/'"
          :title="global.hotArticleList[6].title"
          target="_blank">
          <img class="lazy-img-fadein"
               v-lazy="global.hotArticleList[6].articleImageView + '?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80|imageView2/1/w/170/h/120'"
               :alt="global.hotArticleList[6].title">
          <span class="bottom-bar">
            <span class="tof">{{ global.hotArticleList[6].title }}</span>
          </span>
        </a>
      </div>
      <a
        class="row" :href="'/article/' + global.hotArticleList[0]._id + '/'"
        :title="global.hotArticleList[0].title"
        target="_blank">
        <img class="lazy-img-fadein"
             v-lazy="global.hotArticleList[0].articleImageView + '?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80|imageView2/1/w/340/h/180'"
             :alt="global.hotArticleList[0].title">
        <span class="bottom-bar">
          <span class="tof">{{ global.hotArticleList[0].title }}</span>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'HotArticle',
    data() {
      return {}
    },
    components: {},
    computed: {
      ...mapState(['global']),
    }
  }
</script>
<style scoped lang="less">
  .hot-article {
    display: flex;
    margin-bottom: 30px;
    .left {
      flex: 4;
      height: 300px;
      /*background: red;*/
      margin-right: 5px;
      display: flex;
      flex-direction: column;
      .row {
        display: flex;
        flex: 1;
        font-size: 14px;
        &:first-child {
          margin-bottom: 10px;
          .item {
            overflow: hidden;
            position: relative;
            &:first-child {
              background: rgba(234, 234, 234, .6);
              flex: 2;
              margin-right: 5px;
              img {
                position: absolute;
                left: 50%;
                margin-left: -90px;
                top: 50%;
                margin-top: -75px;
              }
            }
            &:last-child {
              background: rgba(234, 234, 234, .6);
              flex: 3;
              margin-left: 5px;
              img {
                position: absolute;
                left: 50%;
                margin-left: -135px;
                top: 50%;
                margin-top: -75px;
              }
            }
          }
        }
        &:last-child {
          .item {
            overflow: hidden;
            position: relative;
            &:first-child {
              background: rgba(234, 234, 234, .6);
              flex: 3;
              margin-right: 5px;
              img {
                position: absolute;
                left: 50%;
                margin-left: -135px;
                top: 50%;
                margin-top: -75px;
              }
            }
            &:last-child {
              background: rgba(234, 234, 234, .6);
              flex: 2;
              margin-left: 5px;
              img {
                position: absolute;
                left: 50%;
                margin-left: -90px;
                top: 50%;
                margin-top: -75px;
              }
            }
          }
        }
      }
    }
    .right {
      flex: 3;
      height: 300px;
      margin-left: 5px;
      display: flex;
      flex-direction: column;
      .row {
        display: flex;
        &:first-child {
          margin-bottom: 10px;
          flex: 2;
          font-size: 12px;
          .item {
            overflow: hidden;
            position: relative;
            &:first-child {
              background: rgba(234, 234, 234, .6);
              flex: 1;
              margin-right: 5px;
            }
            &:last-child {
              background: rgba(234, 234, 234, .6);
              flex: 1;
              margin-left: 5px;
            }
            img {
              position: absolute;
              left: 50%;
              margin-left: -85px;
              top: 50%;
              margin-top: -60px;
            }
          }
        }
        &:last-child {
          flex: 3;
          background: rgba(234, 234, 234, .6);
          overflow: hidden;
          position: relative;
          font-size: 16px;
          img {
            position: absolute;
            left: 50%;
            margin-left: -170px;
            top: 50%;
            margin-top: -90px;
          }
        }
      }
    }
    a {
      box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.05);
      .bottom-bar {
        position: absolute;
        width: 100%;
        height: 25%;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        padding: 0 10px;
        background: rgba(0, 0, 0, 0.6);
        color: #ffffff;
      }
    }
  }
</style>
