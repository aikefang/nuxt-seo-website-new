<template>
  <div class="search-center input-center">
    <div class="input-area">
      <input
        @keyup.enter="onSubmit()"
        @focus="inputFocus"
        @blur="inputBlur"
        v-model="keyword"
        class="key-input"
        :class="{
          focus: focus
        }"
        name="keyword"
        maxlength="100"
        type="text"
        autocomplete="off">
      <input class="key-button" type="submit" value="文档查询">
    </div>
    <div class="history-area" v-show="focus">
      <div class="history-box">
        <ul class="history-list">
          <li
            @click="onSubmit(item)"
            v-for="(item, index) in list"
            :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'Name',
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
        keyword: '',
        list: [],
        focus: false
      }
    },
    methods: {
      onSubmit(key) {
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
        try {
          this.list = JSON.parse(window.localStorage.getItem('historyList')) || []
        } catch (e) {

        }
      },
      inputFocus() {
        this.focus = true
      },
      inputBlur() {
        setTimeout(() => {
          this.focus = false
        }, 200)
      }
    },
    components: {},
    computed: {
    },
    mounted() {
      try {
        this.list = JSON.parse(window.localStorage.getItem('historyList')) || []
      } catch (e) {

      }
    }
  }
</script>

<style scoped lang="less">
  .search-center {
    height: 100%;
    width: 100%;
    position: relative;
    &.input-center {
      padding-top: 200px;
      .input-area {

      }
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
        &.focus {
          border-color: #4e6ef2;
          border-bottom: none;
          border-radius: 10px 0 0 0;
        }
      }
      .key-button {
        /*border: 2px solid #4e6ef2;*/
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
        font-family: Arial,"PingFang SC","Microsoft YaHei",sans-serif;
        position: relative;
        right: 2px;
        &:hover {
          background: #4662d9;
        }
      }
    }
    .history-area {
      width: 600px;
      margin: 0 auto;
    }
    .history-box {
      width: 500px;
      border: 2px solid #4e6ef2;
      border-top: none;
      border-radius: 0 0 10px 10px;
      .history-list {
        margin: 0 10px;
        padding: 5px 0;
        border-top: 2px solid #f5f5f6;
        position: relative;
        bottom: 2px;
        li {
          color: #626675;
          line-height: 28px;
          height: 28px;
          font-family: Arial,"PingFang SC","Microsoft YaHei",sans-serif;
          cursor: pointer;
        }

      }
    }

  }
</style>
