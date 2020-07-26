<template>
	<div class="page-markdown">
		<div class="container">
			<client-only>
				<mavon-editor
					v-model="content"
					ref="md"
					@imgAdd="imgUpload"
					@change="change"

					style="min-height: 600px"
					:subfield="subfield"
					:code_style="code_style"
					:ishljs="true"
					:externalLink="externalLink"
					:toolbars="markdownOption"
					:boxShadow="false"
				/>
			</client-only>
			<button @click="submit">提交</button>
		</div>
	</div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: "index",
    head() {
      let scriptOrigin = [
        {src: 'https://static.webascii.cn/webascii/mavon-editor/highlightjs/highlightjs/shell.min.js'},
      ]
      let linkOrigin = [
        {rel: 'stylesheet', href: 'https://static.webascii.cn/webascii/mavon-editor/highlightjs/styles/github.min.css'},
      ]

      return {
        script: scriptOrigin,
        link: linkOrigin,
      }
    },
    components: {
      mavonEditor,
    },
    data() {
      return {
        content: `
pwd
===

显示当前工作目录。

## 目录

- [bash内建命令](#内建命令)
- [GNU coreutils中的命令](#外部命令)

## 内建命令

#### 概要

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


<!-- Linux命令行搜索引擎：https://jaywcjlove.github.io/linux-command/ -->

        `,
        html: '',
        subfield: true,
        code_style: 'solarized-dark',
        externalLink: {
          markdown_css() {
            return 'https://static.webascii.cn/webascii/mavon-editor/markdown/github-markdown.min.css'
          },
          hljs_js() {
            return 'https://static.webascii.cn/webascii/mavon-editor/highlightjs/highlight.min.js'
          },
          hljs_lang(lang) {
            return 'https://static.webascii.cn/webascii/mavon-editor/highlightjs/languages/' + lang + '.min.js'
          },
          hljs_css(css) {
            return 'https://static.webascii.cn/webascii/mavon-editor/highlightjs/styles/' + css + '.min.css'
          },
          katex_js() {
            return 'https://static.webascii.cn/webascii/mavon-editor/katex/katex.min.js'
          },
          katex_css() {
            return 'https://static.webascii.cn/webascii/mavon-editor/katex/katex.min.css'
          }
        },
        markdownOption: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          // htmlcode: true, // 展示html源码
          // help: true, // 帮助
          /* 1.3.5 */
          // undo: true, // 上一步
          // redo: true, // 下一步
          // trash: true, // 清空
          // save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        }

        // configs: {}
      }
    },
    methods: {
      // 将图片上传到服务器，返回地址替换到md中
      async imgUpload(pos, file) {
        // 大于2M
        if (file.size > 1024 * 1024 * 2) {
          this.$message.error('预览图不得大于2M，请重新上传')
          return
        }
        let formData = new FormData()
        formData.append('file', file)
        try {
          const uploadImg = await this.$axios.post(`/api/upload/files`, formData)

          if (uploadImg.status === 200) {
            this.$refs.md.$img2Url(pos, uploadImg.data.path)
            this.$message.success('预览图上传成功')
          } else {
            this.$message.error('预览图上传失败，请重新上传')
          }
        } catch ({message: msg}) {
          this.$message.error('预览图上传失败，请重新上传')
        }
      },
      // 所有操作都会被解析重新渲染
      change(value, render) {
        // render 为 markdown 解析后的结果[html]
        this.html = render;
      },
      // 提交
      submit() {
        console.log(this.content);
        console.log(this.html);
        this.$message.success('提交成功，已打印至控制台！')
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
<style lang="less">
	.page-markdown {
		.v-note-show {
			p {
				code {
					margin: 0 .4em;
				}
			}
		}
	}
</style>
