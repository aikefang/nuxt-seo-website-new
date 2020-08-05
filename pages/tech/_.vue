<template>
	<div>
		<div v-html="html" class="markdown-body" v-lazy-container="{ selector: 'img' }"></div>
	</div>
</template>

<script>
  import Vue from 'vue'
  import marked from 'marked'
  import hljs from 'highlight.js'
  import {cleanUrl} from 'marked/src/helpers'

  export default Vue.extend({
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
        let renderer = await new marked.Renderer()

        renderer.image = (href, title, text) => {
          href = cleanUrl(renderer.options.sanitize, renderer.options.baseUrl, href)

          if (href === null) {
            return text
          }

          let wh = []

          try {
            const arr = href.split('-')
            const b = arr[arr.length - 1].split('.')[0]

            const whArr = JSON.parse(new Buffer.from(b, 'base64').toString())
            if (Array.isArray(whArr) && whArr.length === 2) {
              wh = whArr
            }
          } catch (e) {
          }

          // let out = '<img data-src="' + href + '" class="lazy-img-fadein" alt="' + text + '"'
          let out = '<img data-src="' + href + '" class="lazy-img-fadein"'
          if (title) {
            out += ' title="' + title + '"'
          }
          out += renderer.options.xhtml ? '/>' : '>'

          let htmlStr = out
          if (wh.length === 2) {

            let w = wh[0]
            let h = wh[1]
            let bl = (h / w * 100).toFixed(2)

            // 当宽度大于840时，做自适应比例缩放
            if (w > 840) {
              let pre = 840 / w
              w = (w * pre).toFixed(2)
              h = (h * pre).toFixed(2)
            }

            htmlStr = `
						<div class="image-container" style="max-width: ${w}px; max-height: ${h}px; background-color: transparent;">
							<div class="image-container-fill" style="padding-bottom: ${bl}%;"></div>
								<div class="image-view">
										${out}
								</div>
							</div>
						</div>
            `
          }
          return htmlStr
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

        html = await marked('![aaa.png](//static.webascii.cn/webascii/book-view/u2csikbww0e-WzI1NiwyNTZd.png) \n\n\n' + '![WX202008051849142x.png](//static.webascii.cn/webascii/files/93jocpdo8tzq-WzMxMTIsMjg4XQ==.png) \n\n\n' + data.markdown, {
          // sanitize: true,
          renderer: await renderer
        })
      }

      return {
        html
      }
    },
    mounted() {

    }
  })
</script>

<style lang="less">
	.markdown-body {
		img {
			display: block;
		}

		.image-container {
			position: relative;
			margin: 0 auto;

			.image-container-fill {
				background: #f2f2f2;
			}

			.image-view {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
		}
	}
</style>

<style scoped lang="less">

</style>
