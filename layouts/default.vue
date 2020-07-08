<template>
  <div class="nuxt-box">
    <nuxt />
  </div>
</template>

<style lang="less">
  /* ------- This is the CSS Reset ------- */
  @import "normalize.css";
  @import "~/static/iconfont/iconfont.css";
  article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section, summary {
    display: block;
  }

  audio, canvas, video {
    display: inline-block;
  }

  audio:not([controls]) {
    display: none;
    height: 0;
  }

  [hidden] {
    display: none;
  }

  template {
    display: none;
  }

  html {
    /*min-width: 768px;*/
    font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    font-size: 16px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    display: flex;
    min-height: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
    overflow-x: hidden;
    width: 100%;
    display: flex;
    #__nuxt {
      min-height: 100%;
      width: 100%;
      display: flex;
      #__layout {
        min-height: 100%;
        width: 100%;
        .nuxt-box {
          min-height: 100%;
          width: 100%;
        }
      }
    }
  }

  a {
    text-decoration: none;
    color: #333;
    cursor: pointer;
  }

  a:focus {
    outline: none;
    -moz-outline: none;
  }

  a:active, a:hover {
    outline: 0;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  abbr[title] {
    border-bottom: 1px dotted;
  }

  b, strong {
    font-weight: bold;
  }

  dfn {
    font-style: italic;
  }

  hr {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    height: 0;
  }

  mark {
    background: #ff0;
    color: #000;
  }

  code, kbd, pre, samp {
    font-family: monospace, serif;
    font-size: 1em;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  pre {
    white-space: pre-wrap;
    position: relative;
    margin-bottom: 24px;
    background: #f3f4f5 !important;
    overflow: hidden;
    /*display: flex;*/
    padding: 10px 20px 10px 20px!important;
    &.has-numbering-parent {
      padding: 10px 0 10px 20px!important;
    }
    .pre-numbering {
      position: absolute;
      top: 0;
      left: 0;
      width: 46px;
      padding: 11px 5px 0 0;
      border-right: 1px solid #C3CCD0;
      border-radius: 3px 0 0 3px;
      background-color: #f3f4f5;
      text-align: right;
      font-size: 1rem;
      /*font-family: Menlo, monospace;*/
      color: #AAA;
      height: 100%;
      user-select: none;
    }
    code {
      overflow-x: auto;
      overflow-y: auto;
      word-break: keep-all;
      white-space: pre;
      display: block;
      overflow-y: auto;
      padding: 0 !important;
      font-weight: 300;
      font-size: 1rem;
      /*font-family: Menlo, monospace;*/
      background: #f3f4f5 !important;
      &.has-numbering {
        padding: 0 20px 0 36px!important;
      }
      &::-webkit-scrollbar {
        width: 0;   /* 滚动条宽度为0 */
        height: 0; /* 滚动条高度为0 */
        display: none; /* 滚动条隐藏 */
      }
    }
  }


  q {
    quotes: "\201C" "\201D" "\2018" "\2019";
  }

  small {
    font-size: 80%;
  }

  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  img {
    border: 0;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  figure {
    margin: 0;
  }

  fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
  }

  legend {
    border: 0;
    padding: 0;
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: 100%;
    margin: 0;
  }

  button, input {
    line-height: normal;
  }

  button, select {
    text-transform: none;
  }

  button, html input[type="button"], input[type="reset"], input[type="submit"] {
    -webkit-appearance: button;
    cursor: pointer;
  }

  button[disabled], html input[disabled] {
    cursor: default;
  }

  input[type="checkbox"], input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  input[type="search"] {
    -webkit-appearance: textfield;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
  }

  input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  button::-moz-focus-inner, input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  textarea {
    overflow: auto;
    vertical-align: top;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* 背景逐渐放大 */
  .bg-cb {
    position: relative;
    &:before {
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      opacity: 1;
      /*background: red;*/
      -webkit-transform: scale(0,0);
      transform: scale(0,0);
      -webkit-transition: -webkit-transform .5s cubic-bezier(.3,0,0,1.5);
      transition: transform .5s cubic-bezier(.3,0,0,1.5);
      content: '';
      position: absolute;
      z-index: 1;
    }
    &:hover {
      &:before {
        opacity: 1;
        -webkit-transform: scale(1,1);
        transform: scale(1,1);
        width: 100%;
        height: 100%;
        -webkit-transition: -webkit-transform .5s cubic-bezier(.3,0,0,1.5);
        transition: transform .5s cubic-bezier(.3,0,0,1.5);
      }
    }
    * {
      z-index: 1;
    }
  }

  /*字体渐变*/
  .jb-col {
    -webkit-transition: color 0.2s linear;
    -moz-transition: color 0.2s linear;
    -o-transition: color 0.2s linear;
    transition: color 0.2s linear;
  }

  /*背景渐变*/
  .jb-bg {
    -webkit-transition: background 0.2s linear;
    -moz-transition: background 0.2s linear;
    -o-transition: background 0.2s linear;
    transition: background 0.2s linear;
  }

  .jb-all {
    -webkit-transition: all 0.2s linear;
    -moz-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }

  .green:hover {
    color: #6bc30d !important;
  }

  .blue:hover {
    color: #3498db !important;
  }

  .bg-block:hover {
    background: #333 !important;;
  }

  .white:hover {
    color: #ffffff;
  }

  .clear:after {
    content: ' ';
    clear: both;
    display: block;
  }

  .pull-left {
    float: left;
  }

  .pull-right {
    float: right;
  }

  /*处理记住密码后的背景颜色*/
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    -webkit-text-fill-color: #ededed !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent;
    background-image: none;
    /*背景色透明  生效时长  过渡效果  启用时延迟的时间*/
    transition: background-color 50000s ease-in-out 0s;
    color: rgb(0, 0, 0);
  }

  input {
    background-color: transparent;
    outline: none;
  }

  /*自定义通用样式*/
  .cur {
    cursor: pointer !important;
  }

  .tof {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden
  }

  *, :after, :before {
    box-sizing: border-box;
  }

  /*quote下的syntaxhighlighter用于呈现文章详情内评论中的引用的样式*/
  .quote {
    .syntaxhighlighter {
      font-size: 12px !important;
    }
  }

  .syntaxhighlighter {
    /*border-left: 3px solid #3d7e9a !important;*/
    background: #f3f4f5 !important;
    /*padding: 5px 5px 5px 0 !important;*/
    overflow: auto;
    font-size: 17px !important;
    padding: 20px 0 !important;
    div.bar {
      display: none !important;
    }
    div.bar.show {
      display: none !important;
    }
    table {
      width: 100% !important;
    }
    code {
      box-sizing: content-box !important;
    }
    .lines {
      .line {
        white-space: pre !important;
        .number {
          user-select: none;
        }
        .content {
          border-left: 3px solid #3d7e9a !important;
        }
        &.highlighted {
          .number {
            background-color: #ea6f5a !important;
            color: #ffffff !important;
            /*color: black !important;*/
          }
          .content {
            border-left: 3px solid #ea6f5a !important;
            /*background-color: red !important;*/
          }
        }
        &.alt1 {
          background-color: inherit !important;
        }
        &.alt2 {
          background-color: inherit !important;
        }
      }
    }
  }
  .syntaxhighlighter::-webkit-scrollbar{
    width:4px !important;
    height:4px !important;
    /*background-image: linear-gradient(-180deg, #53E2C0 0%, #31CAC4 100%) !important;*/
    /*background-color: #ea6f5a !important;*/
  }
  .syntaxhighlighter::-webkit-scrollbar-track{
    background: #b4b4b4 !important;
    /*background-image: linear-gradient(-90deg, #ea6f5a 0%, #ff8300 40%, #00d8a3 100%) !important;*/
    border-radius:2px !important;
  }
  .syntaxhighlighter::-webkit-scrollbar-thumb{
    /*background: #ea6f5a !important;*/
    background-image: linear-gradient(-90deg, #ea6f5a 0%, #ff8300 40%, #00d8a3 100%) !important;
    border-radius:2px !important;
  }
  .syntaxhighlighter::-webkit-scrollbar-thumb:hover{
    /*background: #ea6f5a !important;*/
    background-image: linear-gradient(-90deg, #ea6f5a 0%, #ff8300 40%, #00d8a3 100%) !important;
  }
  .syntaxhighlighter::-webkit-scrollbar-corner{
    /*background: #ea6f5a !important;*/
    background-image: linear-gradient(-90deg, #ea6f5a 0%, #ff8300 40%, #00d8a3 100%) !important;
  }
  .fr-view {
    table {
      th {
        padding: 5px 10px;
      }
      td {
        padding: 5px 10px;
        word-break: break-all;
        word-wrap: break-word;
      }
    }
    .fr-img-caption {
      /*margin-top: 20px !important;*/
      margin-bottom: 40px !important;
      .fr-img-wrap {
        &>span {
          display: initial;
          padding: 6px 30px 9px 30px;
          position: relative;
          &:after {
            position: absolute;
            bottom: 0;
            left: 0;
            content: ' ';
            height: 1px;
            width: 100%;
            border-radius: 50%;
            background: -webkit-linear-gradient(180deg, #d9d9d9, #999999, #d9d9d9); /* Safari 5.1-6.0 */
          }
        }
        &>img {
          box-shadow: 0 0.0625rem 0.1875rem 0 rgba(0, 34, 77, .1);
        }
      }
    }
    .fr-file {
      border: 1px solid #ececed;
      background: #f7f7f7;
      border-radius: 2px;
      margin: 5px auto;
      padding: 10px 10px 10px 16px;
      display: inline-flex;
      align-items: center;
      font-family: "iconfont" !important;
      font-size: 16px;
      /*font-style: normal;*/
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-transition: all 0.1s linear;
      -moz-transition: all 0.1s linear;
      -o-transition: all 0.1s linear;
      transition: all 0.1s linear;
      &:after {
        margin-left: 5px;
        content: "\e632";
        color: #333;
      }
      &:hover {
        &:after {
          margin-left: 5px;
          content: "\e648";
          color: #333;
        }
      }
    }
  }


  .flex-menu-left {
    left: 50%;
    width: 50px;
    margin-left: -680px;
    ul {
      li {
        &.edit-fast {
          &.bg-cb {
            &:before {
              background: #dc143c;
            }
            &:hover {
              color: #FFFFFF;
            }
          }
          i.iconfont {
            font-size: 34px;
            padding-top: 5px;
          }
        }
        &.submit {
          &.bg-cb {
            &:before {
              background: #dc143c;
            }
            &:hover {
              color: #FFFFFF;
            }
          }
          i.iconfont {
            font-size: 36px;
            padding-top: 5px;
          }
        }
        &.edit {
          &.bg-cb {
            &:before {
              background: #0366d6;
            }
            &:hover {
              color: #FFFFFF;
            }
          }
          i.iconfont {
            font-size: 34px;
            padding-top: 5px;
          }
        }
        &.pinglun {
          &.bg-cb {
            &:before {
              background: #ff8a00;
            }
            &:hover {
              color: #FFFFFF;
            }
          }
          i.iconfont {
            font-size: 36px;
            padding-top: 5px;
          }
        }
        &.zan {
          &.bg-cb {
            &:before {
              background: #1abc9c;
            }
            &:hover {
              color: #FFFFFF;
            }
          }
          i.iconfont {
            font-size: 36px;
            padding-top: 5px;
          }
        }
      }
    }
    .nice-in {
      -webkit-animation: niceIn 0.8s .2s ease;
      -moz-animation: niceIn 0.8s .2s ease;
      -o-animation: niceIn 0.8s .2s ease;
      animation: niceIn 0.8s .2s ease;
    }
  }

  .flex-menu-right {
    left: 50%;
    width: 50px;
    margin-left: 610px;
    ul {
      li {
        &.top {
          &.bg-cb {
            &:before {
              background: #9266f9;
            }
            &:hover {
              color: #FFFFFF;
            }
          }
          i.iconfont {
            font-size: 34px;
            padding-top: 5px;
          }
        }
      }
    }
  }

  .flex-menu-left, .flex-menu-right {
    display: flex;
    position: fixed;
    bottom: 100px;
    color: #999;
    user-select: none;
    .no-number {
      height: 75px;
    }
    ul {
      display: flex;
      flex-direction: column;
      width: 100%;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 95px;
        /*background: #f7f7f7;*/
        cursor: pointer;
        /*border-bottom: 1px #ececec solid;*/
        a {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          color: inherit;
        }
        &:last-child {
          border-bottom: none;
        }
        .name {
          font-size: 12px;
          padding-top: 5px;
        }
        .number {
          font-size: 12px;
          padding-top: 8px;
        }
      }
    }
  }

  @-webkit-keyframes niceIn {
    0% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1)
    }
    50% {
      opacity: 1;
      -webkit-transform: scale(1.5);
      transform: scale(1.5)
    }
    70% {
      -webkit-transform: scale(.8);
      transform: scale(.8)
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1)
    }
  }

  @keyframes niceIn {
    0% {
      opacity: 1;
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1)
    }
    50% {
      opacity: 1;
      -webkit-transform: scale(1.5);
      -ms-transform: scale(1.5);
      transform: scale(1.5)
    }
    70% {
      -webkit-transform: scale(.8);
      -ms-transform: scale(.8);
      transform: scale(.8)
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1)
    }
  }

  @-o-keyframes niceIn {
    0% {
      opacity: 1;
      -o-transform: scale(1);
      transform: scale(1)
    }
    50% {
      opacity: 1;
      -o-transform: scale(1.5);
      transform: scale(1.5)
    }
    70% {
      -o-transform: scale(.8);
      transform: scale(.8)
    }
    100% {
      opacity: 1;
      -o-transform: scale(1);
      transform: scale(1)
    }
  }

  @-moz-keyframes niceIn {
    0% {
      opacity: 1;
      -moz-transform: scale(1);
      transform: scale(1)
    }
    50% {
      opacity: 1;
      -moz-transform: scale(1.5);
      transform: scale(1.5)
    }
    70% {
      -o-transform: scale(.8);
      transform: scale(.8)
    }
    100% {
      opacity: 1;
      -moz-transform: scale(1);
      transform: scale(1)
    }
  }


  /*懒加载CSS Start*/
  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .lazy-img-fadein[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }

  .lazy-img-fadein[lazy=loading] {
    width: 40px !important;
    margin: auto;
  }

  .lazy-img-fadein[lazy-progressive=true] {
    width: 100% !important;
    margin: auto;
  }

  .lazy-img-fadein[lazy=error] {
    border-radius: 2px;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }
  /*懒加载CSS End*/
</style>
