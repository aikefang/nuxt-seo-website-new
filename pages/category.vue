<template>
  <div class="category-page">
    <div class="category-content">
      <NavBar></NavBar>
      <div class="content-main">
        <div class="note-content">
          <div class="column-left">
            <h3 class="titlebar">笔记</h3>
            <div class="cat-nav-area">
              <dl class="cat-nav cat-bg cat-primarybright">
                <dt>分类：</dt>
                <dd>
                  <div class="clear">
                    <!--                    <router-link to="/" class="logo">-->
                    <router-link
                      :to="'/category/'"
                      :class="{'selected':(!categoryType && !categoryChildType) || (categoryType === '0' && categoryChildType === '0')}"
                      class="cur jb-all">
                      全部
                    </router-link>

                    <router-link class="cur jb-all"
                                 v-for="item in category"
                                 :to="'/category/'+item.seo + '/'"
                                 :key="item._id"
                                 :class="{selected: item.seo === categoryType}">
                      {{item.title}}
                    </router-link>
                  </div>
                  <div style="display: block" class="category-children-box"
                       v-for="item in category"
                       :key="item._id"
                       v-show="categoryType === item.seo">
                    <router-link
                      class="cur jb-all"
                      :to="'/category/' + item.seo + '/' + cItem.seo + '/'"
                      :key="cItem._id"
                      v-for="cItem in item.children"
                      :class="{selected: cItem.seo === categoryChildType}">
                      {{cItem.title}}
                    </router-link>
                  </div>
                </dd>
              </dl>
              <dl class="cat-nav cat-bg cat-primarybright">
                <dt class="search-text">搜索：</dt>
                <dd>
                  <div class="search">
                    <el-input id="searchInput" v-model="keyword" ref="sv"
                              @keyup.enter.native="search" style="width: 500px">
                      <el-button @click="search" slot="append" icon="search">搜索</el-button>
                    </el-input>
                  </div>
                </dd>
              </dl>
            </div>
            <div class="note-category boxs">
              <div class="article-empty" v-show="list.length <= 0">
                <i class="iconfont icon-kong"></i>
                <span>暂无相关笔记</span>
              </div>
              <div class="node-box"
                   v-for="item in list" :key="item._id">
                <a class="article-image-view" :title="item.originTitle" :href="'/article/' + item._id + '/'" target="_blank">
                  <img v-lazy="item.articleImageViewPc" class="lazy-img-fadein" :alt="item.title">
                </a>
                <div class="noteinfo">
                  <h2 class="media-heading">
                    <a
                      :href="'/article/' + item._id + '/'"
                      v-html="item.title"
                      :title="item.originTitle"
                      target="_blank"
                      class="title tof cur jb-col blue"></a>
                  </h2>
                  <div class="media">
                    <p class="media-body">
                      {{item.articleDescribe || '作者很懒，什么都没有留下。。'}}
                    </p>
                  </div>
                  <div class="media-info">
                    <em class="ml0">浏览：</em>
                    <span>{{item.views}}</span>
                    <em>分类：</em>
                    <span>
                        <a
                          :href="'/category/' + item.levelFirst.seo + '/' + item.levelSecond.seo + '/'"
                          class="cur jb-all">
                            {{item.levelSecond.title}}
                        </a>
                    </span>
                    <em>作者：</em>
                    <span>
                        <a href="javascript:;" class="author_name tof author_link jb-all">
                            {{item.author.nickname}}
                        </a>
                    </span>
                  </div>
                </div>
              </div>
              <SearchArticleList v-show="isLoading && hasMore"></SearchArticleList>
              <div class="article-empty" v-show="!isLoading && !hasMore && list.length > 0">
                <i class="iconfont icon-kong"></i>
                <span>暂无更多~</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-menu-right">
        <ul>
          <li class="jb-all bg-cb top no-number" @click="goTop">
            <i class="iconfont icon-huidaodingbu"></i>
            <span class="name">Top</span>
          </li>
        </ul>
      </div>
    </div>
    <BottomFooter></BottomFooter>
  </div>
</template>

<script>
  import NavBar from '~/components/NavBar.vue'
  import BottomFooter from '~/components/Footer.vue'
  import SearchArticleList from '~/components/skeleton/SearchArticleList.vue'
  import _ from 'lodash'


  const noteSearchFn = async ({keyword, page, category, params, $axios}) => {
    const firstId = category.find(data => {
      if (data.seo === params.level1) {
        return true
      }
    })
    let secondId = null
    if (firstId && firstId.children) {
      secondId = firstId.children.find(data => {
        if (data.seo === params.level2) {
          return true
        }
      })
    }

    const listRes = await $axios.get(`/api/biji/article/search`, {
      params: {
        keyword,
        pageNum: page,
        levelFirst: firstId ? firstId._id : null,
        levelSecond: secondId ? secondId._id : null
      }
    })

    return listRes
  }


  export default {
    name: 'CategoryClass',
    head() {
      let title = ''
      if (this.categoryTitle === null && this.categoryChildTitle === null) {
        title = '技术文档_全部文档_webascii.cn'
      } else if (this.categoryTitle !== null && this.categoryChildTitle === null) {
        title = `${this.categoryTitle}技术文档_笔记网_webascii.cn`
      } else {
        title = `${this.categoryTitle}技术_${this.categoryChildTitle}技术文档_笔记网_webascii.cn`
      }

      const meta = [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.seoKeywords.toString()
        },
        {
          hid: 'description',
          name: 'description',
          content: `笔记网(webascii.cn)技术文档，包括${this.seoKeywords.toString()}等技术文档，让你全面学习前端、后端、数据库等开发知识，快速掌握开发技能。`
        }
      ]

      return {
        title,
        meta
      }
    },
    components: {
      NavBar,
      BottomFooter,
      SearchArticleList
    },
    async asyncData({store, route, params, redirect, $axios}) {
      if (Number(params.level1) || Number(params.level2)) {
        const ids = []
        if (Number(params.level1)) {
          ids.push(Number(params.level1))
        }
        if (Number(params.level2)) {
          ids.push(Number(params.level2))
        }
        const redirectRes = await $axios.get(`/api/biji/category/redirect`, {
          params: {
            ids
          }
        })
        // console.log(redirectRes)
        if (redirectRes.status === 200 && redirectRes.data.needRedirect) {
          const pathArr = route.path.split('/')
          if (pathArr[2]) {
            pathArr[2] = redirectRes.data.redirect[pathArr[2]]
          }
          if (pathArr[3]) {
            pathArr[3] = redirectRes.data.redirect[pathArr[3]]
          }
          redirect(pathArr.join('/'))
        }
      }
      store.commit('global/setNavStatus', 'article')


      const categoryRes = await $axios.get(`/api/biji/category/list`, {
        params: {
          type: 'all'
        }
      })


      const listRes = await noteSearchFn({
        route,
        params,
        category: categoryRes.data.list,
        $axios,
        keyword: route.query.keyword,
        page: route.query.page,
      })

      const data = {
        list: listRes.data.note.list,
        category: categoryRes.data.list,
        keyword: '',
        page: 1,
        categoryType: null,
        categoryChildType: null,
        categoryTitle: null,
        categoryChildTitle: null,
        hasMore: listRes.data.note.list.length === 20 ? true : false,
        seoKeywords: []
      }

      if (!params.level1 && !params.level2) {
        categoryRes.data.list.forEach(cData => {
          data.seoKeywords.push(cData.title)
        })
      }

      let categoryParent
      if (params.level1) {
        data.categoryType = params.level1
        categoryParent = categoryRes.data.list.find(data => data.seo === params.level1)
        data.categoryTitle = categoryParent.title
        data.seoKeywords.push(categoryParent.title + '技术文档')
        categoryParent.children.forEach(cData => {
          data.seoKeywords.push(cData.title)
        })
      }
      if (params.level2) {
        data.categoryChildType = params.level2

        const categoryChild = categoryParent.children.find(data => data.seo === params.level2)
        data.categoryChildTitle = categoryChild.title

      }
      if (route.query.keyword) {
        data.keyword = route.query.keyword
      }
      if (route.query.page) {
        data.page = route.query.page
      }
      return data
    },
    data() {
      return {
        isLoading: false
      }
    },
    watch: {
      async '$route'(to, from) {
        if (to.params.level1) {
          this.categoryType = to.params.level1
        }
        if (to.params.level2) {
          this.categoryChildType = to.params.level2
        }

        if (!to.params.level1 && !to.params.level2) {
          this.categoryType = null
          this.categoryChildType = null
        }

        if (to.query.keyword) {
          this.keyword = to.query.keyword
        }

        if (!to.query.page) {
          this.$router.push({
            query: {
              ...to.query,
              page: 1
            }
          })
        }
      },
      keyword() {
        clearTimeout(this.lastSearch)
        if (!this.keyword) {
          // console.log(this.$route.query)
          const query = this.$route.query
          // delete query.keyword
          // console.log(query)
          // console.log(this.$route.query)
          this.$router.push({
            query: {
              ...this.$route.query,
              keyword: ''
            }
          })
        }
        this.lastSearch = setTimeout(() => {
          const query = {
            ...this.$route.query,
            page: 1,
          }
          if (this.keyword) {
            query.keyword = this.keyword
          }
          this.$router.push({
            query: query
          })
          this.searchData()
        }, 500)
      },
      categoryType() {
        this.page = 1
        this.searchData()
      },
      categoryChildType() {
        this.page = 1
        this.searchData()
      },
    },
    computed: {},
    methods: {
      async searchData(type) {
        const that = this
        const listRes = await noteSearchFn({
          keyword: this.keyword,
          page: this.page,
          category: this.category,
          params: {
            level1: that.categoryType,
            level2: that.categoryChildType,
          },
          $axios: this.$axios
        })
        if (type === 'push') {
          this.list.push(...listRes.data.note.list)
          const query = {
            ...this.$route.query,
            page: this.page,
          }
          if (this.keyword) {
            query.keyword = this.keyword
          }
          this.$router.push({
            query: query
          })
        } else {
          this.list = listRes.data.note.list
          const query = {
            ...this.$route.query,
            page: 1,
          }
          if (this.keyword) {
            query.keyword = this.keyword
          }
          this.$router.push({
            query: query
          })
        }

        this.hasMore = listRes.data.note.list.length === 20 ? true : false

        this.isLoading = false
      },
      // 搜索
      search() {
        const query = {
          page: 1
        }
        if (this.keyword) {
          query.keyword = this.keyword
        }
        this.$router.push({
          path: this.$route.path,
          query: query
        })
      },
    },
    async mounted() {
      this.isLoading = false
      window.onscroll = () => {
        // 距离底部200px时加载一次
        let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 200
        if (bottomOfWindow && this.isLoading === false && this.hasMore) {
          this.isLoading = true
          this.page++
          setTimeout(() => {
            this.searchData('push')
          }, 300)
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .category-page {
    background: #f4f5f5;
    overflow: hidden;
    .category-content {
      border-radius: 2px;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
      background: #ffffff;
      min-width: 1000px;
      width: 1200px;
      margin: 70px auto 0 auto;
      padding: 20px;
    }
  }
  .article-empty {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #999;

    > i {
      font-size: 26px;
      margin-right: 10px;
      color: #999;
    }

    > span {
      padding-top: 5px;
    }
  }

  .titlebar {
    height: 30px;
    font-size: 18px;
    line-height: 30px;
    font-weight: 700;
    text-indent: 10px;
    position: relative;
    color: #333;
    margin-bottom: 16px;

    &:before {
      top: 5px;
      width: 5px;
      height: 20px;
      background: #3498db;
      position: absolute;
      display: block;
      left: 0;
      content: '';
    }

    &:after {
      top: 36px;
      width: 100%;
      border-top: 1px #ececec solid;
      display: block;
      left: 0;
      content: '';
      position: absolute;
    }
  }

  .content-main {

    /*padding-top: 46px;*/
  }

  .note-content {
    /*padding-bottom: 20px;*/
    position: relative;
    /*padding-right: 340px;*/
    width: inherit !important;
    overflow: hidden;
    /*min-width: 710px;*/
    /*background-color: #fafafa;*/
  }

  .column-left {
    width: 100%;
    min-width: 700px;
    float: left;
    background-color: #ffffff;

    .cat-nav-area {
      padding: 10px 15px 0px;
      border-radius: 5px;
      background: #f4f5f7;
      position: relative;
      margin-bottom: 10px;

      dd {
        margin: 0;
      }

      /*&:before {*/
      /*right: 0;*/
      /*bottom: -20px;*/
      /*left: 0;*/
      /*height: 0;*/
      /*font-size: 0;*/
      /*border-top: 1px #dfdfdf dashed;*/
      /*content: '';*/
      /*position: absolute;*/
      /*}*/
    }
  }

  .cat-nav {
    /*margin-bottom: 0;*/
    padding: 0 0 0 50px;
    overflow: hidden;
    position: relative;
    margin: 0;

    dt {
      top: 0;
      left: 0;
      height: 20px;
      line-height: 20px;
      font-weight: normal;
      color: #999;
      position: absolute;

      &.search-text {
        padding-top: 8px !important;
      }
    }

    dd {
      display: inline-block;
      max-height: 120px;
      min-height: 20px;
      line-height: 20px;
      overflow-x: hidden;
      overflow-y: auto;
    }

    &.cat-bg {
      &.cat-primarybright {
        .category-children-box {
          margin-left: 48px;
          padding-bottom: 10px;

          .category-children {
            margin-right: 10px;
          }
        }

        dd {
          a.selected {
            color: #fff !important;
            background-color: #3498db;
          }

          a.selected, .cat-nav.cat-bg.cat-primarybright {
            dd {
              a:hover {
                border: 1px #3498db solid;
                color: #3498db;
              }
            }
          }
        }
      }

      dt {
        padding: 2px 0;
        height: 30px;
        line-height: 26px;
      }
    }

  }

  .cat-nav.cat-bg {
    dd {
      a {
        display: block;
        height: 30px;
        line-height: 26px;
        border: 1px transparent solid;
        border-radius: 3px;
        text-decoration: none;
      }
    }
  }

  .cat-nav {
    dd {
      a {
        margin: 0 0 5px 5px;
        padding: 0 6px;
        float: left;
        color: #333;
      }
    }
  }

  .cat-nav-area .cat-nav dt, .cat-nav-area .cat-nav dd a {
    font-size: 14px;
    /*font-weight: 300;*/
  }

  .cat-nav-area .cat-nav dd a {
    color: #666;
  }

  .noteinfo {
    //padding-left: 70px;
    position: relative;
  }

  .noteinfo a.avatar, .noteinfo a.avatar img {
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    padding-left: 0;
    top: 0;
    left: 0;
    position: absolute;
  }

  .noteinfo {
    display: flex;
    flex-direction: column;
    .media-heading {
      height: 20px;
      line-height: 20px;
      font-size: 18px;
      overflow: hidden;
      margin-bottom: 5px;
      margin-top: 20px;
      display: flex;
      max-width: 990px;

      > * {
        vertical-align: middle;
      }

      > span {
        padding: 0 5px;
      }

      a {
        font-weight: 700;
        color: #333;
        display: inline-block;
        height: 20px;
        flex: 1;
      }

      .title {
        /*width: 1100px;*/
        /*max-width: 1100px;*/
        overflow: hidden;
        flex: 1;
      }

      .splitline {
        display: inline-block;
        margin: 0 4px;
        font-size: 12px;
        color: #ccc;
      }
    }

    .media-info {
      margin: 8px 0;
      /*padding: 0 8px;*/
      line-height: 30px;
      border-radius: 4px;
      /*background: #f4f5f7;*/
      color: #ababab;
      overflow: hidden;
      font-size: 12px;

      a.author-link {
        font-size: 14px;
      }

      a.author-name {
        max-width: 60px;
      }
    }
  }

  a.link_blue {
    color: #3498db !important;
  }

  .ml0 {
    margin-left: 0 !important;
  }

  .node-box {
    display: flex;
    border-bottom: 1px #dfdfdf dashed;

    em {
      font-style: normal;
    }

    .article-image-view {
      margin-top: 20px;
      margin-right: 10px;
      height: 90px;
      width: 160px;
      background: rgba(234, 234, 234, .6);
      box-shadow: 0 2px 2px 2px rgba(0, 34, 77, 0.1);
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 90px;
        width: 160px;
        border-radius: 5px;
      }
    }
  }

  .noteinfo {
    flex: 1;
    .media-info {
      em {
        float: left;
        color: #ababab;
        /*font-style: normal;*/
        margin-left: 30px;
      }

      > span {
        float: left;
      }

      a {
        color: #bdc3c7;
        text-decoration: none;
      }

      a:hover {
        color: #3498db;
        text-decoration: underline;
      }
    }
  }

  .media {
    margin-top: 10px;
    overflow: hidden;
    zoom: 1;

    .media-body {
      margin: 0;
      color: #999;
      line-height: 24px;
      word-break: break-all;
      width: 100%;
      display: table-cell;
      vertical-align: top;
      overflow: hidden;
      zoom: 1;
      font-size: 14px;
      /*font-weight: 300;*/
    }
  }

  .nav {
    margin-bottom: 0;
  }

  .column-right {
    padding-top: 20px;
    margin-right: -320px !important;
    width: 300px !important;
    float: right !important;
    word-wrap: break-word;
  }

  .more {
    color: #ccc;
    font-size: 14px;
  }

  .publish {
    margin: 0 0 10px;
    padding: 12px;
    width: 275px;
    font-size: 18px;
    outline: 0 none !important;
    color: #fff;
    background-color: #0275d8;
    /*border-color: #0275d8;*/
    display: inline-block;
    /*padding: 6px 12px;*/
    margin-bottom: 0;
    /*font-size: 14px;*/
    font-weight: normal;
    /*line-height: 1.42857143;*/
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    /*-ms-touch-action: manipulation;*/
    touch-action: manipulation;
    cursor: pointer;
    /*-webkit-user-select: none;*/
    /*-moz-user-select: none;*/
    /*-ms-user-select: none;*/
    user-select: none;
    /*background-image: none;*/
    border: 1px solid transparent;
    border-radius: 4px;
  }

  .search {
    margin-bottom: 10px;
    margin-left: 10px;

    .el-input {
      height: 32px;
      max-width: 500px;

      input {
        height: 32px;
        max-width: 500px;
      }
    }
  }

  .toprank_orange {
    i {
      color: #f60;
      border-color: #f60;
    }
  }

  .article_num {
    margin: 0 0 10px;
    width: 100%;
    overflow: hidden;

    li.toprank_orange {
      i {
        color: #f60;
        border-color: #f60;
      }
    }

    li {
      padding: 0;
      overflow: hidden;

      a {
        font-size: 16px;
        display: inline-block;
        padding-left: 25px;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        position: relative;
        color: #333;
        width: 300px;
        text-decoration: none;

        i {
          display: block;
          top: 5px;
          left: 0;
          width: 18px;
          height: 19px;
          line-height: 19px;
          font-style: normal;
          color: #aab2bd;
          text-align: center;
          font-size: 12px;
          border: 1px solid #aab2bd;
          border-radius: 100%;
          position: absolute;
        }

        -webkit-transition: color 0.2s linear;
        -moz-transition: color 0.2s linear;
        -o-transition: color 0.2s linear;
        transition: color 0.2s linear;

        .col-3498db:hover {
          color: #3498db;
          text-decoration: underline;
        }
      }

      //a:hover {
      //  i {
      //    color: #3498db;
      //    border-color: #3498db;
      //  }
      //}
    }

    li.toprank_blue {
      a {
        i {
          color: #3498db;
          border-color: #3498db;
        }
      }
    }
  }

  .note-category {
    .pagination {
      display: flex;
      justify-content: center;
    }
  }
</style>
