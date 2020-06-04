<template>
<!--  <div class="container">-->
<!--    <NavBar></NavBar>-->
<!--    <div>-->
<!--      <logo />-->
<!--      <h1 class="title">-->
<!--        nuxt-seo-website-->
<!--      </h1>-->
<!--      <h2 class="subtitle">-->
<!--        ssr note web-->
<!--      </h2>-->
<!--      <div class="links">-->
<!--        <a-->
<!--          href="https://nuxtjs.org/"-->
<!--          target="_blank"-->
<!--          class="button&#45;&#45;green"-->
<!--        >-->
<!--          Documentation-->
<!--        </a>-->
<!--        <a-->
<!--          href="https://github.com/nuxt/nuxt.js"-->
<!--          target="_blank"-->
<!--          class="button&#45;&#45;grey"-->
<!--        >-->
<!--          GitHub-->
<!--        </a>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <div>
    <navBar></navBar>
    <div class="collection">
      <div class="row">
        <div class="row-left">
          <keep-alive>
            <Slide></Slide>
          </keep-alive>
          <keep-alive>
<!--            <recommendContent></recommendContent>-->
          </keep-alive>
<!--          <a class="load-more" v-show="load" @click="loadMore">阅读更多</a>-->
<!--          <a class="load-more no-click" v-show="!load">暂无更多</a>-->
        </div>
        <div class="row-right">
          <keep-alive>
            <recommend-collection></recommend-collection>
          </keep-alive>
          <count-down></count-down>
        </div>
      </div>
    </div>
    <bottomFooter></bottomFooter>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo.vue'
import NavBar from "~/components/NavBar.vue";
import Slide from "~/components/Slide.vue";
import bottomFooter from '~/components/Footer.vue'
import recommendCollection from '~/components/RecommendCollection.vue'
// import recommendContent from '~/components/RecommendContent.vue'
import CountDown from '~/components/CountDown.vue'

export default Vue.extend({
  components: {
    Logo,
    NavBar,
    Slide,
    bottomFooter,
    recommendCollection,
    // recommendContent,
    CountDown,
  }
})
</script>

<style lang="less">
  .collection {
    width: 1200px;
    margin: 0 auto;
    padding-top: 46px;
    .row {
      padding-top: 30px;
      &:after {
        content: "";
        display: table;
        clear: both;
      }
      .row-left {
        float: left;
        width: 840px;
      }
      .row-right {
        float: right;
        width: 340px;
      }
    }
    .load-more {
      cursor: pointer;
      height: 40px;
      margin: 30px auto 60px;
      padding: 10px 15px;
      text-align: center;
      font-size: 15px;
      color: #fff;
      display: block;
      width: 100%;
      border-radius: 20px;
      background-color: #a5a5a5;
      &:hover {
        color: #fff;
        background-color: #9b9b9b
      }
      &.no-click {
        cursor: not-allowed;
      }
    }
  }
</style>
