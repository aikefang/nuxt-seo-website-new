<template>
  <div>
    <NavBar></NavBar>
    123123123123
    <BottomFooter></BottomFooter>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  //  import Nuxt from "../../website-bak/.nuxt/components/nuxt";
  import NavBar from '~/components/NavBar.vue'
  import BottomFooter from '~/components/Footer.vue'

//   let noteSearchFn = async ({store, page, categoryFirst, categorySecond, key}) => {
//     let noteSearch = store.dispatch('noteSearch', {
// //      category: 'all',
//       categoryFirst: Number(categoryFirst),
//       categorySecond: Number(categorySecond),
//       pageSize: 20,
//       pageNum: page,
//       key: key,
//     })
//     return await noteSearch
//   }
//   let asyncDefault = async ({store, params}) => {
//     let categoryFirst = 0 // 一级分类
//     let categorySecond = 0 // 二级分类
// //    let categoryId = ''
//     if (!!Number(params.level1) != false && !!Number(params.level1) != false) {
// //      categoryId = `${params.level1},${params.level2}`
//       categoryFirst = params.level1 || categoryFirst
//       categorySecond = params.level2 || categorySecond
//     }
//     if (!!Number(params.level1) != false && !!Number(params.level2) == false) {
// //      categoryId = `${params.level1}`
//       categoryFirst = params.level1 || categoryFirst
//     }
//     let noteSearch = noteSearchFn({
//       store,
//       page: params.page || 1,
// //      category: categoryId,
//       categoryFirst,
//       categorySecond,
//       key: params.keywords || ''
//     })
//     let allCategory = store.dispatch('category', {
//       type: 'all'
//     })
//     let allCategoryArr = []
//     await Promise.all([noteSearch, allCategory])
//       .then(info => {
//         store.dispatch('setApiData', {
//           key: 'noteSearch',
//           value: info[0].data.note
//         })
//         store.dispatch('setApiData', {
//           key: 'allCategory',
//           value: info[1].data.category
//         })
//         allCategoryArr = info[1].data.category
//       })
//       .catch(e => {
//         console.log(e)
//         // 重定向
// //          redirect('/error')
//       })
//     store.dispatch('setState', {
//       key: 'category',
//       value: params.level1 || 0
//     })
//     store.dispatch('setState', {
//       key: 'page',
//       value: params.page || 1
//     })
//     store.dispatch('setState', {
//       key: 'categoryChild',
//       value: params.level2 || 0
//     })
//     store.dispatch('setState', {
//       key: 'keywords',
//       value: params.keywords || ''
//     })
//
//     return {
//       keywords: params.keywords || '',
//       keywordsCache: params.keywords || '',
//       page: params.page || 1,
//       allCategoryArr
//     }
//   }


  export default {
    name: 'CategoryClass',
    head() {
      let title = ''
      if (this.level1Str === '' && this.level2Str === '') {
        title = '笔记网技术文档 - webascii.cn'
      } else if (this.level1Str !== '' && this.level2Str === '') {
        title = `${this.level1Str}技术文档 - 笔记网 - webascii.cn`
      } else {
        title = `${this.level1Str}技术_${this.level2Str}技术文档 - 笔记网 - webascii.cn`
      }
      return {
        title
      }
    },
    components: {
      NavBar,
      BottomFooter,
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
        console.log(redirectRes)
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


      // store.state.navStatus = 1
      // let rel = await asyncDefault({store, params})
      // let level1Str = ''
      // let level2Str = ''
      // for (let i = 0; i < rel.allCategoryArr.length; i++) {
      //   if (rel.allCategoryArr[i].id === Number(store.state.category)) {
      //     level1Str = rel.allCategoryArr[i].title
      //     for (let x = 0; x < rel.allCategoryArr[i].children.length; x++) {
      //       if (rel.allCategoryArr[i].children[x].id === Number(store.state.categoryChild)) {
      //         level2Str = rel.allCategoryArr[i].children[x].title
      //         break
      //       }
      //     }
      //     break
      //   }
      // }
      // return {
      //   level1Str,
      //   level2Str,
      //   ...rel
      // }
      //      return {
      //        keywords: params.keywords || '',
      //        keywordsCache: params.keywords || '',
      //        page: params.page || 1
      //      }
    },
    data() {
      return {
        // lastSearch: null,
        // lastSearchCache: null
      }
    },
//     validate({params, route}) {
// //      console.log(params.page)
//       // 必须为数字
//       return (params.level1 == undefined || /^\d+$/.test(params.level1)) && (params.level1 == undefined || /^\d+$/.test(params.level1)) && (params.page == undefined || /^\d+$/.test(params.page))
//     },
    watch: {
//       async '$route'(to, from) {
//         this.$store.dispatch('setState', {
//           key: 'category',
//           value: to.params.level1 || 0
//         })
//         this.$store.dispatch('setState', {
//           key: 'categoryChild',
//           value: to.params.level2 || 0
//         })
//         this.$store.dispatch('setState', {
//           key: 'keywords',
//           value: to.params.keywords || ''
//         })
//         this.$store.dispatch('setState', {
//           key: 'page',
//           value: to.params.page || 1
//         })
//
//         let categoryFirst = 0 // 一级分类
//         let categorySecond = 0 // 二级分类
// //        let categoryId = ''
//         if (!!Number(to.params.level1) != false && !!Number(to.params.level2) != false) {
// //          categoryId = `${to.params.level1},${to.params.level2}`
//           categoryFirst = to.params.level1
//           categorySecond = to.params.level2
//
//         }
//         if (!!Number(to.params.level1) != false && !!Number(to.params.level2) == false) {
// //          categoryId = `${to.params.level1}`
//           categoryFirst = to.params.level1
//         }
// //        console.log(to.params.keywords)
//         await noteSearchFn({
//           store: this.$store,
//           page: to.params.page || 1,
// //          category: categoryId,
//           categoryFirst,
//           categorySecond,
//           key: to.params.keywords || ''
//         })
//           .then(info => {
//             this.$store.dispatch('setApiData', {
//               key: 'noteSearch',
//               value: info.data.note
//             })
//           })
//           .catch(error => {
//             console.log(error)
//           })
//
//       },
//       keywords(newVal) {
//         clearTimeout(this.lastSearch)
//         this.$store.dispatch('setState', {
//           key: 'keywords',
//           value: newVal
//         })
//         this.lastSearch = setTimeout(() => {
//           this.search({pageNum: 1})
//         }, 500)
//       },
//       // 为了换成用户不断更新关键字触发view更新造成的性能问题
//       keywordsCache(newVal) {
//         clearTimeout(this.lastSearchCache)
//         this.lastSearchCache = setTimeout(() => {
//           this.keywords = newVal
//         }, 500)
//       },
//       categoryType() {
//         this.search({pageNum: 1})
//       },
//       categoryChildType() {
//         this.search({pageNum: 1})
//       }
    },
    computed: {
      ...mapState(['apiData']),
      //主分类
      categoryType() {
        return this.$store.state.category
      },
      //子分类
      categoryChildType() {
        return this.$store.state.categoryChild
      },
//      pageNum () {
//        return this.$store.state.page
//      }
//      // 主分类类型
//      categoryType() {
//        return this.$store.state.page.level1 || null
//      },
//      // 子分类类型
//      categoryChildType() {
//        return this.$store.state.page.level2 || null
//      },
//      // 子分类类型
//      noteList() {
//        return this.$store.state.api.noteList
//      },
//      // 最新笔记
//      newNote() {
//        return this.$store.state.api.newNote
//      },
//      searchVal () {
//        return this.$store.state.keywords
//      },
//      searchVal: {
//        get: function () {
//          return this.$store.state.page.key || ''
//        },
//        set: function (val) {
//          this.$store.commit('setPageData', {
//            key: 'key',
//            data: val
//          })
//        }
//      }
    },
    methods: {
      // 分页
      currentChange(page) {
//        console.log(this.$route)
//        this.$store.dispatch('setState', {
//          key: 'category',
//          value: this.$route.params.level1 || 0
//        })
//        this.$store.dispatch('setState', {
//          key: 'categoryChild',
//          value: this.$route.params.level2 || 0
//        })
        this.search({pageNum: page})
//        let params = this.$route.params;
//        let category = 'all';
//        if (params.level1 == 0 && params.level2 == 0) {
//          category = 'all'
//        } else if (params.level1 != 0 && params.level2 == 0) {
//          category = [params.level1].toString();
//        } else {
//          category = [params.level1, params.level2].toString();
//        }
//        $http
//          .post('/api/biji/search/note', {
//            key: this.$store.state.page.key,
//            pageSize: 10,
//            pageNum: page,
//            category: category
//          })
//          .then(response => {
//            try {
//              let data = response.data.data
//              let reg = new RegExp(params.key, "gi");
//              data.list.map((t) => {
//                t.title = t.title.replace(reg, function (res, val, index) {
//                  return `<span style="color: red">${res}</span>`
//                })
//              });
//              this.$store.commit('setApiData', {
//                key: 'noteList',
//                data: data
//              })
//            } catch (e) {
//              this.$store.commit('setApiData', {
//                key: 'noteList',
//                data: response.data.data
//              })
//            }
//
//          })
//          .catch(e => {
//            console.log(e)
//          })
      },
      // 搜索
      search({pageNum}) {
        clearTimeout(this.lastSearch)
        let category = this.$store.state.category
        let categoryChild = this.$store.state.categoryChild
        let keywords = this.$store.state.keywords
        let page = pageNum || this.$store.state.page
        this.$router.push({
          path: `/category/${category}/${categoryChild}/${page}/${keywords}`,
        })
      },
    },
    async mounted() {
      // let data = await asyncDefault({
      //   store: this.$store,
      //   params: this.$route.params
      // })
      // Object.keys(data).forEach((key) => {
      //   this[key] = data[key]
      // })

//      console.log(123123)
//      setTimeout(() => {
//        this.categoryType = 1
//      }, 1000)
//      console.log(this.$refs.sv)
    },
    //预请求
//    asyncData({store, route, params}) {
//      store.commit('setPageData', {
//        key: 'level1',
//        data: params.level1 || 0
//      });
//      store.commit('setPageData', {
//        key: 'level2',
//        data: params.level2 || 0
//      });
//      store.commit('setPageData', {
//        key: 'key',
//        data: params.key || ''
//      });
//
//      //获取所有分类
//      function getAllCategory() {
//        return $http
//          .post('/api/biji/get/note')
//          .then(response => {
//            let childObj = {};
//            response.data.data.list.forEach(data => {
//              data.checked = false;
//              data.children.forEach(cData => {
//                cData.checked = false;
//              })
//              childObj[data.id] = data.children;
//            });
//
//
//            store.commit('setApiData', {
//              key: 'categoryChild',
//              data: childObj
//            })
//            store.commit('setApiData', {
//              key: 'category',
//              data: response.data.data.list
//            })
//          })
//          .catch(e => {
//            console.log(e)
//          })
//      }
//
//      function searchNote() {
//        let category = 'all';
//        if (params.level1 == 0 && params.level2 == 0) {
//          category = 'all'
//        } else if (params.level1 != 0 && params.level2 == 0) {
//          category = [params.level1].toString();
//        } else {
//          category = [params.level1, params.level2].toString();
//        }
//        return $http
//          .post('/api/biji/search/note', {
//            key: params.key,
//            pageSize: 10,
//            pageNum: 1,
//            category: category
//          })
//          .then(response => {
//            try {
//              let data = response.data.data
//              let reg = new RegExp(params.key, "gi");
//              data.list.map((t) => {
//                t.title = t.title.replace(reg, function (res, val, index) {
//                  return `<span style="color: red">${res}</span>`
//                })
//              })
//              store.commit('setApiData', {
//                key: 'noteList',
//                data: data
//              })
//            } catch (e) {
//              store.commit('setApiData', {
//                key: 'noteList',
//                data: response.data.data
//              })
//            }
//          })
//          .catch(e => {
//            console.log(e)
//          })
//      }
//
//      //获取最新笔记
//      function getNewNode() {
//        return $http
//          .post('/api/biji/get/new/note', {
//            len: 20
//          })
//          .then(response => {
//            store.commit('setApiData', {
//              key: 'newNote',
//              data: response.data.data.list
//            })
//          })
//          .catch(e => {
//            console.log(e)
//          })
//      }
//
//      return Promise.all([getAllCategory(), searchNote(), getNewNode()])
//    }
  }
</script>
<style>
  body {
    min-width: 1100px;
  }
</style>
<style scoped lang="less">
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
    min-width: 1000px;
    width: 1200px;
    margin: 0 auto;
    padding-top: 46px;
  }

  .notecontent {
    /*padding-bottom: 20px;*/
    position: relative;
    /*padding-right: 340px;*/
    width: inherit !important;
    overflow: hidden;
    /*min-width: 710px;*/
    background-color: #fafafa;
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
    .media-heading {
      height: 20px;
      line-height: 20px;
      font-size: 18px;
      overflow: hidden;
      margin-bottom: 5px;
      margin-top: 20px;
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
      }
      .title {
        width: 1100px;
        max-width: 1100px;
        overflow: hidden;
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
    /*margin-bottom: 20px;*/
    position: relative;
    border-bottom: 1px #dfdfdf dashed;
    /*padding-bottom: 20px;*/
    /*display: block;*/
    em {
      font-style: normal;
    }
    .article-image-view {
      display: flex;
      margin-top: 20px;
      margin-right: 10px;
      img {
        height: 90px;
        width: 160px;
        box-shadow: 0 0.0625rem 0.1875rem 0 rgba(0, 34, 77, 0.1);
        border-radius: 5px;
      }
    }
  }

  .noteinfo {
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
