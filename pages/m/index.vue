<template>
  <div class="index">
    <Header/>
    <div class="list">
      <div class="flow-list-container">
        <ul class="flow-list-ul">
          <li
            v-for="item in article.articleList"
            :key="item.id"
            class="note-flow">
            <div class="summary">
              <a
                :href="'/m/article/' + item._id + '/'"
                class="summary-box">
                <h6 class="title">{{ item.title }}</h6>
                <p class="abstract">
                  {{ item.articleDescribe }}
                </p>
              </a>
              <div class="meta">
                <span>{{ item.nickname }} {{ item.simplifyCTime }}</span>
                <i class="iconfont icon-browse">{{ item.views }}</i>
              </div>
            </div>
            <a
              :class="{'have-img':!!item.articleImageView}"
              class="wrap-img">
              <img
                v-lazy="item.articleImageViewMobile"
                class="lazy-img-fadein"
                :alt="item.title">
            </a>
          </li>
        </ul>
        <div
          v-show="article.more"
          class="flow-list-placeholder-load-more"
          @click="loadMore">
          展开更多文章
          <i class="iconfont icon-Group-"/>
        </div>
        <div
          v-show="!article.more"
          class="flow-list-placeholder-load-more"
          @click="loadMore">
          没有更多了
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  import Header from '~/components/m/Header.vue'
  //  import FlowList from '~/components/FlowList.vue'

  // let getNote = (dispatch, data) => {
  //   return dispatch('note', {
  //     ...data
  //   })
  // }
  export default {
    async asyncData({store, route, params}) {
      await store.dispatch('article/getList')
      // // 获取最新笔记列表
      // let note = getNote(store.dispatch, {
      //   pageSize: 20,
      //   pageNum: 1
      // })
      // await Promise.all([note])
      //   .then(info => {
      //     // 初始化存储note数据
      //     store.dispatch('setApiData', {
      //       key: 'note',
      //       data: info[0].data.note
      //     })
      //   })
      //   .catch(e => {
      //
      //   })
      return {
        pageSize: 20,
        pageNum: 1,
      }
    },
    components: {
      Header
    },
    data() {
      return {
        load: true
      }
    },
    computed: {
      ...mapState(['article']),
    },
    methods: {
      async loadMore() {
        await this.$store.dispatch('article/getList')
        // if (this.load == false) {
        //   return
        // }
        // let info = await getNote(this.$store.dispatch, {
        //   pageSize: 20,
        //   pageNum: ++this.pageNum
        // })
        // // 初始化存储note数据
        // this.$store.dispatch('setApiDataPush', {
        //   key: 'note',
        //   value: info.data.note
        // })
        // if (info.data.len < 20) {
        //   this.load = false
        // }
      }
    },
//    mounted() {
////      console.log(this.$store.commit('changeA', '111111111'))
////      console.log(this.$store.state.aa = '111')
////      window.onscroll = () => {
////        console.log(123)
////      }
//    }
  }
</script>
<style scoped lang="less">
  .index {
    width: 100%;
    .list {
      padding-top: 48px;
    }
    .flow-list-container {
      .flow-list-ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        .note-flow {
          display: flex;
          padding: 15px 18px;
          border-bottom: 1px solid;
          border-color: #f0f0f0;
          .summary {
            flex: 1;
            margin-right: 10px;
            .summary-box {
              display: flex;
              flex-direction: column;
              text-decoration: none;
              .title {
                font-size: 18px;
                color: #333;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
              .abstract {
                margin-top: 6px;
                font-size: 13px;
                color: #999;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
            }
            .meta {
              margin-top: 8px;
              font-size: 12px;
              color: #b1b1b1;
              display: flex;
              align-items: center;
              i {
                font-size: 12px;
                display: flex;
                align-items: center;
                margin-left: 5px;
                &:before {
                  margin-right: 2px;
                }
              }
            }
          }
          .wrap-img {
            display: none;
            align-items: center;
            width: 80px;
            height: 45px;
            background: rgba(234,234,234, .6);
            box-shadow: 0 1px 1px 1px rgba(0, 34, 77, 0.1);
            &.have-img {
              display: flex;
            }
            img {
              width: 80px;
              height: 45px;
            }
          }
        }
      }
      .flow-list-placeholder-load-more {
        margin: auto 0;
        padding: 15px 0 15px 7px;
        text-align: center;
        font-size: 15px;
        color: #969696;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      hr {
        border-width: 0;
        height: 10px;
        background-color: #f5f5f5;
      }
    }
  }
</style>
