<template>
  <div class="index-page">
    <div
      class="search-center input-center"
      :class="{
      'search-area-fixed': keyword !== '' || hasFirstFeyword
    }"
    >
      <div class="input-area">
        <input
          @keyup.enter="onSubmit()"
          @focus="inputFocus"
          @blur="inputBlur"
          @click="inputClick"
          ref="searchInput"
          v-model="keyword"
          class="key-input"
          :class="{
          'first-focus': keyword === '' && firstFocus,
          focus: focus && list.length > 0,
          'only-focus': focus
        }"
          :autofocus="keyword === ''"
          name="keyword"
          maxlength="100"
          type="text"
          autocomplete="off">
        <input class="key-button" type="submit" value="文档查询">
        <div class="history-area" v-show="focus && list.length > 0">
          <div class="history-box">
            <div class="input-border"></div>
            <ul class="history-list">
              <li v-for="(item, index) in list" :key="index">
              <span
                @click="onSubmit(item)"
                v-html="item"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="content-box">

    </div>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'

  export default {
    name: 'Name',
    async asyncData({store, route, params, redirect, $axios}){
      let keyword = ''
      /**
       * @type {boolean}
       * 空：true
       * 非空： false
       */
      const isEmpty = /^\s*$/.test(route.query.keyword || '')
      keyword = route.query.keyword || ''
      return {
        keyword: keyword,
        firstFocus: isEmpty,
        hasFirstFeyword: !isEmpty
      }
    },
    head() {
      return {
        title: `速查询 - 国内最大技术文档查询平台`,
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: '速查询,suchaxun.com,JavasSript文档,Nodejs文档,Linux文档,Java文档,PHP文档,Python文档,Android文档'
          },
          {
            hid: 'description',
            name: 'description',
            content: '国内最大的中文技术文档搜索、致力于让开发者更便捷地获取技术文档信息，找到所求。'
          }
        ]
      }
    },
    data() {
      return {
        ajaxHasData: false,
        list: [],
        focus: false,
        keywordChange: debounce(() => {
          this.searchData()
        }, 300),
        inputClickRecord: 0
      }
    },
    watch: {
      keyword() {
        if (this.firstFocus) {
          this.focus = true
        }
        this.hasFirstFeyword = true
        this.firstFocus = false
        if (!/^\s*$/.test(this.keyword || '')) {
          this.keywordChange()
        } else {
          this.defaultList()
        }
      }
    },
    methods: {
      onSubmit(key) {
        // 过滤空关键词
        if (/^\s*$/.test(this.keyword || '') && !key) {
          window.location.href = window.location.origin + window.location.pathname
          return
        }
        if (key) {
          this.keyword = key
        }
        const keyword = key || this.keyword
        const hl = window.localStorage.getItem('historyList')
        let list = []

        // push搜索历史
        if (hl) {
          list = [...JSON.parse(hl)]
        }
        const index = list.indexOf(keyword)
        // 头部插入数据
        if (!/^[ ]+$/.test(keyword) && index === -1) {
          list.unshift(keyword)
        } else {
          list.splice(index, 1)
          list.unshift(keyword)
        }
        list = list.slice(0, 10)

        window.localStorage.setItem('historyList', JSON.stringify(list))
        if (!this.ajaxHasData) {
          this.defaultList()
        }
        this.$router.push({
          path: this.$route.path,
          query: {
            keyword
          }
        })
      },
      inputFocus() {
        this.focus = true
      },
      inputBlur() {
        this.firstFocus = false
        setTimeout(() => {
          this.focus = false
        }, 100)
      },
      inputClick() {
        if (this.inputClickRecord === 0) {
          if (!this.focus) {
            this.focus = true
          }
        } else {
          this.inputClickRecord = 1
        }

      },
      async searchData() {
        const res = await this.$axios.get('/api/doc/search', {
          params: {
            keyword: this.keyword
          }
        })

        if (res.status === 200 && res.data.list.length > 0) {
          this.ajaxHasData = true
          this.list = res.data.list.map(data => {
            return data.path
          })
        } else {
          this.ajaxHasData = false
          this.defaultList()
        }
      },
      defaultList() {
        try {
          this.list = JSON.parse(window.localStorage.getItem('historyList')) || []
        } catch (e) {
          this.list = []
        }
      }
    },
    components: {},
    computed: {},
    created() {
      this.defaultList()
    },
    mounted() {
//      setTimeout(() => {
//        this.$refs.searchInput.focus()
//      }, 300)
    }
  }
</script>

<style scoped lang="less">
  .index-page {
    min-height: 100%;
    min-width: 100%;
    position: relative;
    /*background: green;*/
    .search-center {
      height: 100%;
      width: 100%;
      position: relative;
      &.input-center {
        padding-top: 200px;
      }
      .input-area {
        width: 600px;
        margin: 0 auto;
        display: flex;
        position: relative;
        .key-input {
          height: 40px;
          padding: 4px 16px;
          font-size: 16px;
          width: 500px;
          margin: 0;
          vertical-align: top;
          outline: 0;
          box-shadow: none;
          border-radius: 10px 0 0 10px;
          border: 2px solid #c4c7ce;
          /*border-right: none;*/
          border-right-color: #4e6ef2;
          background: #fff;
          color: #222;
          overflow: hidden;
          &.first-focus {
            border-color: #4e6ef2;
          }
          &.focus {
            border-color: #4e6ef2;
            border-bottom: none;
            border-radius: 10px 0 0 0;
          }
          &.only-focus {
            border-color: #4e6ef2;
          }
        }
        .key-button {
          border-left: none;
          border-radius: 0 10px 10px 0;
          width: 98px;
          height: 40px;
          background: #4e6ef2;
          font-size: 17px;
          box-shadow: none;
          font-weight: 400;
          border: 0;
          outline: 0;
          letter-spacing: normal;
          color: #ffffff;
          font-family: Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
          position: relative;
          right: 2px;
          &:hover {
            background: #4662d9;
          }
        }
        .history-area {
          width: 600px;
          position: absolute;
          top: 40px;
          left: 0;
          .history-box {
            width: 500px;
            border: 2px solid #4e6ef2;
            border-top: none;
            border-radius: 0 0 10px 10px;
            position: relative;
            .input-border {
              position: absolute;
              width: 480px;
              top: 0;
              left: 50%;
              margin-left: -240px;
              height: 2px;
              background-color: #f5f5f6;
              border-radius: 2px;
            }
            .history-list {
              /*margin: 0 10px;*/
              /*padding: 5px 0;*/
              /*border-top: 2px solid #f5f5f6;*/
              position: relative;
              bottom: 2px;
              li {
                color: #626675;
                line-height: 28px;
                /*height: 30px;*/
                font-family: Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
                cursor: pointer;
                > span {
                  color: #626675;
                  display: block;
                  height: 36px;
                  line-height: 36px;
                  padding: 5px 10px;

                  &:hover {
                    color: #4e6ef2;
                  }
                }
              }

            }
          }
        }
      }

      &.search-area-fixed {
        position: fixed;
        padding-top: 0;
        height: 70px;
        left: 0;
        top: 0;
        background: #ffffff;
        .input-area {
          margin: 0;
          padding: 15px 20px;
          width: 640px;
          .history-area {
            top: 55px;
            left: 20px;
          }
        }
      }
    }
  }
</style>
