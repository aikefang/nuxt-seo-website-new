<template>
	<div>
		<!--		<client-only>-->
		<div v-html="html" class="markdown-body" v-lazy-container="{ selector: 'img' }"></div>
		<!--		</client-only>-->
	</div>
</template>

<script>
  import marked from 'marked'
  import hljs from 'highlight.js'
  import {cleanUrl} from 'marked/src/helpers'

  export default {
    name: 'index',
    head() {
      let linkOrigin = [
        {
          rel: 'stylesheet',
          href: 'https://static.webascii.cn/webascii/mavon-editor/highlightjs/styles/github.min.css'
        },
        {rel: 'stylesheet', href: 'https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css'},
      ]

      return {
        link: linkOrigin,
      }
    },
    async asyncData({store, route, params, redirect, $axios}) {
      const res = await $axios.get('/api/doc/content', {
        params: {
          path: params.pathMatch
        }
      })

      let html = ''
      if (res.status === 200) {
        const data = res.data
        let renderer = new marked.Renderer()

        renderer.image = (href, title, text) => {
          href = cleanUrl(renderer.options.sanitize, renderer.options.baseUrl, href)
          if (href === null) {
            return text
          }
          let out = '<img data-src="' + href + '" class="lazy-img-fadein" alt="' + text + '"'
          if (title) {
            out += ' title="' + title + '"'
          }
          out += renderer.options.xhtml ? '/>' : '>'
					console.log(out)
          return out
        }
        marked.setOptions({
          renderer: new marked.Renderer(),
          // gfm: true,
          tables: true,
          // breaks: false,
          // pedantic: false,
          // sanitize: false,
          smartLists: true,
          // smartypants: false,
          highlight: function (code, lang) {
            if (lang && hljs.getLanguage(lang)) {
              return hljs.highlight(lang, code, true).value
            } else {
              return hljs.highlightAuto(code).value
            }
          }
        })

        html = marked('![getbuqiansuccess.png](//static.webascii.cn/webascii/files/get-buqian-success-2l18e1uacudod.png)\n' + data.markdown, {
          sanitize: true,
          renderer: renderer
        })
      }

      return {
        html
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less">
	.markdown-body {
		img {
			display: block;
		}
	}
</style>

<style scoped lang="less">

</style>
