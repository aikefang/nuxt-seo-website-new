<template>
	<div v-html="html" class="markdown-body"></div>
</template>

<script>
  import marked from 'marked'
  import hljs from 'highlight.js'
  // import 'highlight.js/styles/default.css';
  export default {
    name: "index",
    head() {
      let scriptOrigin = [
        {src: 'https://static.webascii.cn/webascii/mavon-editor/highlightjs/highlightjs/shell.min.js'},
      ]
      let linkOrigin = [
        {
          rel: 'stylesheet',
          // href: 'https://static.webascii.cn/webascii/mavon-editor/highlightjs/styles/default.min.css'
          href: 'https://static.webascii.cn/webascii/mavon-editor/highlightjs/styles/github.min.css'
        },
        {rel: 'stylesheet', href: 'https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css'},
      ]

      return {
        script: scriptOrigin,
        link: linkOrigin,
      }
    },
    async asyncData({store, route, params, redirect, $axios}) {
      // const noteContent = await $axios.get('/api/biji/article/historyDetails', {
      //   params: {
      //     id: params.id
      //   }
      // })

      let md = `

pwd
===

显示当前工作目录。

## 目录

- [bash内建命令](#内建命令)
- [GNU coreutils中的命令](#外部命令)

## 内建命令

#### 概要
\`\`\`js

import marked from 'marked'
import hljs from 'highlight.js'
marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	highlight: function (code, lang) {
		if (lang && hljs.getLanguage(lang)) {
			return hljs.highlight(lang, code, true).value;
		} else {
			return hljs.highlightAuto(code).value;
		}
	}
})

\`\`\`

\`\`\`shell
pwd [-LP]
\`\`\`

#### 主要用途

- 显示当前工作目录。

#### 选项

\`\`\`shell
-L （默认值）打印环境变量"$PWD"的值，可能为符号链接。
-P 打印当前工作目录的物理位置。
\`\`\`

#### 返回值

返回状态为成功除非给出了非法选项或是当前目录无法读取。

#### 注意

1. 该命令是bash内建命令，相关的帮助信息请查看\`help\`命令。


## 外部命令

#### 概要

\`\`\`shell
pwd [OPTION]...
\`\`\`

#### 主要用途

- 显示当前工作目录。


#### 选项

\`\`\`shell
-L, --logical 打印环境变量"$PWD"的值，可能为符号链接。
-P, --physical （默认值）打印当前工作目录的物理位置。
--help 显示帮助信息并退出。
--version 显示版本信息并退出。
\`\`\`

#### 返回值

返回状态为成功除非给出了非法选项或是当前目录无法读取。

#### 注意

1. 该命令是\`GNU coreutils\`包中的命令，相关的帮助信息请查看\`man pwd\`或\`info coreutils 'pwd invocation'\`。

2. 启动或关闭内建命令请查看\`enable\`命令，关于同名优先级的问题请查看\`builtin\`命令的例子部分的相关讨论。

3. 在不禁用内建且当前环境没有定义\`pwd\`函数的情况下，使用\`/usr/bin/pwd\`指向\`coreutils\`的\`pwd\`，使用\`pwd\`指向bash内建的\`pwd\`。


			`
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code, lang) {
          if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code, true).value;
          } else {
            return hljs.highlightAuto(code).value;
          }
        }
      })

      let html = marked(md, {
        sanitize: true
      })


      return {
        html
      }

    },
    data() {
      return {
        // html: ''
      }
    }
  }
</script>

<style scoped lang="less">

</style>



