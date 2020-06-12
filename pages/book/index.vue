<template>
	<div class="book">
		<NavBar></NavBar>
		<div class="book-page">
			<ul>
				<li v-for="item in bookList" :key="item._id" class="jb-all">
					<router-link :to="'/book/' + item.id">
						<!--<el-tooltip class="item" effect="dark" content="点击下载PDF" placement="right">-->
						<div class="book-content">
							<img class="book-img"
									 :src="item.bookImg + '?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80'"
									 :alt="item.bookName">
							<div class="info">
								<h3 class="jb-all" v-html="item.bookName"></h3>
								<div class="status-bar">
                                <span class="download">
                                    <i class="iconfont icon-browse"></i>
                                    {{item.views}}
                                </span>
									<span class="date">
                                    <i class="iconfont icon-time"></i>
                                    {{item.cTime | Format('yyyy-MM-dd')}}
                                </span>
								</div>
							</div>
						</div>
						<!--</el-tooltip>-->
					</router-link>
				</li>
			</ul>
			<div class="contributor">
				<el-button class="con-btn" @click="openUploadPopup">
					贡献我的
					<em>PDF</em>
					书籍
				</el-button>
			</div>
		</div>
		<div class="statement">
			<p>免责声明：网站所有作品均由网友上传，仅供读者预览及学习交流使用，下载后请24小时内删除。</p>
			<p>如果喜欢请购买正版资源!原作者如果认为本站侵犯了您的版权,请微信告知,我们会立即删除! 微信：zhuangkai168</p>
		</div>
		<BottomFooter></BottomFooter>
		<!--下载弹窗-->
		<!--<el-dialog-->
		<!--title="请尽快下载，链接将在30分钟后失效"-->
		<!--:visible.sync="downloadPopupShow"-->
		<!--width="30%">-->
		<!--<div>-->
		<!--<div style="margin-top: 15px;">-->
		<!--<el-input v-model="url" ref="copyInput">-->
		<!--<el-button slot="append" @click="copy(url)">复制</el-button>-->
		<!--</el-input>-->
		<!--</div>-->
		<!--</div>-->
		<!--</el-dialog>-->
		<!--上传弹窗-->
		<el-dialog title="上传PDF" class="upload-popup" :show-close="false" :close="uploadClose"
							 :visible.sync="uploadPopupShow"
							 :close-on-click-modal="false">
			<el-form ref="uploadForm" :model="uploadForm" :rules="uploadFormRules" label-width="80px">
				<el-form-item label="书名" prop="bookName">
					<el-input v-model="uploadForm.bookName" placeholder="长度在 1 到 40 个字符"></el-input>
				</el-form-item>
				<el-form-item label="封面图" prop="bookImg">
					<div class="upload-book-box img">
						<el-upload
							ref="upload-book-img"
							class="upload-book-img"
							name="file"
							drag
							:show-file-list="false"
							v-loading="uploadBookImgLoading"
							element-loading-text="正在上传中..."
							accept="image/png, image/jpeg"
							action="/api/upload/bookView"
							:before-upload="uploadBookImgBefore"
							:on-error="uploadBookImgError"
							:on-success="uploadBookImgSuccess">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
							<div class="img-tips">
								<i v-show="!imgTips" class="el-icon-circle-close-outline"></i>
								<i v-show="imgTips" class="el-icon-circle-check-outline"></i>
								使用Ctrl+V可以快速上传图片
							</div>
							<input type="text" style="position: fixed;top: -100000px;" id="img-paste">
						</el-upload>
						<div v-show="bookImgViewShow" class="upload-book-view">
							<img :src="uploadForm.bookImg" alt="">
						</div>
						<div v-show="!bookImgViewShow" class="upload-book-view-tips">
							图片建议尺寸
							<br>
							135px * 175px
						</div>
					</div>
				</el-form-item>
				<el-form-item label="PDF文件" prop="bookPdf">
					<div class="">
						<el-input
							style="width: 360px"
							type="textarea"
							:rows="5"
							placeholder="请输入下载链接，可填写百度云下载地址"
							v-model="uploadForm.bookPdf">
						</el-input>
						<!--accept="application/pdf"-->
						<!--<el-upload-->
						<!--class="upload-book-pdf"-->
						<!--ref="upload-book-pdf"-->
						<!--name="file"-->
						<!--:data="qiniuData"-->
						<!--drag-->
						<!--:show-file-list="false"-->
						<!--accept="application/pdf"-->
						<!--v-loading="uploadBookPdfLoading"-->
						<!--element-loading-text="正在上传中..."-->
						<!--action="//upload-z1.qiniup.com"-->
						<!--:on-progress="pdfUploadProgress"-->
						<!--:before-upload="uploadBookPdfBefore"-->
						<!--:on-error="uploadBookPdfError"-->
						<!--:on-success="uploadBookPdfSuccess">-->
						<!--<i class="el-icon-upload"></i>-->
						<!--<div class="el-upload__text">将PDF文件拖到此处，或<em>点击上传</em></div>-->
						<!--&lt;!&ndash;<div class="img-tips">&ndash;&gt;-->
						<!--&lt;!&ndash;<i v-show="!pdfTips" class="el-icon-circle-close-outline"></i>&ndash;&gt;-->
						<!--&lt;!&ndash;<i v-show="pdfTips" class="el-icon-circle-check-outline"></i>&ndash;&gt;-->
						<!--&lt;!&ndash;使用Ctrl+V可以快速上传PDF文件&ndash;&gt;-->
						<!--&lt;!&ndash;</div>&ndash;&gt;-->
						<!--&lt;!&ndash;<input type="text" @focus="pdfPasteFocus" @blur="pdfPasteBlur" style="position: fixed;top: -100000px;" id="pdf-paste">&ndash;&gt;-->
						<!--</el-upload>-->
						<!--<div v-show="bookNameShow" class="upload-book-view-other">-->
						<!--<i class="el-icon-success"></i>-->
						<!--<p class="file-name">{{bookName}}</p>-->
						<!--</div>-->
					</div>
					<!--<div class="pdf-progress">-->
					<!--<el-progress v-show="pdfProgressShow" :text-inside="true" :stroke-width="18" :percentage="pdfProgress" status="success"></el-progress>-->
					<!--</div>-->

				</el-form-item>
				<el-form-item label="贡献者" prop="contributor">
					<el-input v-model="uploadForm.contributor" placeholder="请输入您的昵称,长度在 1 到 10 个字符"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="uploadClose">取 消</el-button>
				<el-button type="primary" @click="uploadSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  import NavBar from '~/components/NavBar.vue'
  // import slide from '~/components/slide.vue'
  import BottomFooter from '~/components/Footer.vue'
  // import recommendCollection from '~/components/recommend-collection.vue'
  // import recommendContent from '~/components/recommend-content.vue'


  export default {
    name: 'Book',
    async asyncData({store, route, params, $axios}) {
      store.commit('global/setNavStatus', 'book')
			const searchParams = {}
			if (route.query.search) {
        searchParams.search = route.query.search
			}

      const bookList = await $axios.get('/api/book/list', {
        params: searchParams
      })
			// console.log(bookList)

      if (route.query.search) {
        bookList.data.list.map((data) => {
          data.bookName = data.bookName.replace(new RegExp(route.query.search, 'ig'), `<span style="color: red">${route.query.search}</span>`)
        })
      }

			return {
        bookList: bookList.data.list
			}
    },
    head() {
      return {
        script: [
//          { src: '//static.webascii.cn/webascii/global/qiniu-v2.5.1/qiniu.min.js' }
        ],
        link: [
//        { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css' },
        ],
        title: `前端书籍PDF - webascii.cn`,
        meta: [
          {hid: 'keywords', name: 'keywords', content: 'javascript系列、jquery系列、HTML5系列、css系列'},
          {hid: 'description', name: 'description', content: 'js书籍，html书籍，犀牛书，设计书籍'}
        ]
      }
    },
    data() {
      return {
//        load: true
        url: '',
//        downloadPopupShow: false,
        uploadPopupShow: false,
        uploadForm: {
          bookName: '',
          bookImg: '',
          bookPdf: '',
//          贡献者
          contributor: '',
//          bookHash: '',
        },
        uploadFormRules: {
          bookName: [
            {required: true, message: '请输入书名', trigger: 'blur'},
            {min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur'}
          ],
          bookImg: [
            {required: true, message: '请上传封面图', trigger: 'blur'}
          ],
          bookPdf: [
            {required: true, message: '请填写下载地址或者下载说明', trigger: 'blur'},
            {min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'}
          ],
          contributor: [
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ]
        },
//        bookImgView: '',
        bookImgViewShow: false,
        // 上传的文件名
//        bookName: '',
//        bookNameShow: false,
        uploadBookImgLoading: false,
//        uploadBookPdfLoading: false,
        imgTips: false,
//        qiniuData: {
//          key: '',
//          token: ''
//        },
//        qiniuCacheKey: '',
//        pdfProgressShow: false,
//        pdfProgress: 0
//        pdfTips: false
      }
    },
    methods: {
      // 下载
//      async download(id) {
//        let downloadBook = await this.$store.dispatch('downloadBook', {
//          id: id
//        })
//        this.url = downloadBook.data.url
//        this.downloadPopupShow = true
//      },
//      // 复制
//      copy(url) {
//        // 首先获取焦点
//        this.$refs.copyInput.$el.children[0].focus()
//        // 选中
//        this.$refs.copyInput.$el.children[0].setSelectionRange(0, 9999)
//        // 复制
//        if (document.execCommand('copy')) {
//          document.execCommand('copy')
//          this.$message.success('复制成功')
//        } else {
//          this.$message.success('复制失败，请手动复制')
//        }
//      },
      // 打开上传弹窗
      async openUploadPopup() {
        this.uploadPopupShow = true
        this.$nextTick(() => {
          let imgDom = this.$refs['upload-book-img'].$el
//          let pdfDom = this.$refs['upload-book-pdf'].$el
          document.querySelector('#img-paste').onfocus = () => {
            this.imgTips = true
          }
          document.querySelector('#img-paste').onblur = () => {
            this.imgTips = false
          }
//          document.querySelector('#pdf-paste').onfocus = () => {
//            this.pdfTips = true
//          }
//          document.querySelector('#pdf-paste').onblur = () => {
//            this.pdfTips = false
//          }
          imgDom.onmouseenter = () => {
            document.querySelector('#img-paste').focus()
            document.querySelector('#img-paste').onpaste = async (event) => {
              this.pasteUpload(event, 'uploadBookImg')
            }
          }
          imgDom.onmouseleave = () => {
            document.querySelector('#img-paste').blur()
          }

//          pdfDom.onmouseenter = () => {
//            document.querySelector('#pdf-paste').focus()
//            document.querySelector('#pdf-paste').onpaste = async (event) => {
//              this.pasteUpload(event, 'uploadBookPdf')
//            }
//          }
//          pdfDom.onmouseleave = () => {
//            document.querySelector('#pdf-paste').blur()
//          }
        })
//        let createToken = await this.$store.dispatch('createToken', {})
//        if (createToken.status == 200) {
//          this.qiniuCacheKey = createToken.data.key
//          this.qiniuData.token = createToken.data.token
//        } else {
//          this.$message.error('暂时不可上传，请联系管理员')
//        }
      },
      // 确认上传
      uploadSubmit() {
        this.$refs['uploadForm'].validate(async (valid) => {
          if (valid) {
            const addBook = await this.$axios.post(`/api/book/create`, {
              bookName: this.uploadForm.bookName,
              baiduCloudDiskUrl: this.uploadForm.bookPdf,
              bookImg: this.uploadForm.bookImg,
              contributorName: this.uploadForm.contributor,
						})
            if (addBook.status === 200) {
              this.$message.success('添加成功')
              this.uploadClose()
              // const bookList = await this.$axios.get('/api/book/list')
              // this.bookList = bookList.data.list
              this.bookList.unshift(addBook.data)
            } else {
              this.$message.warning('上传失败')
            }
          } else {
            this.$message.warning('完善书籍资料信息')
            return false;
          }
        });
      },
      // 上传封面图之前
      uploadBookImgBefore(file) {
        this.uploadBookImgLoading = true
        // 大于2M
        if (file.size > 1024 * 1024 * 2) {
          this.uploadBookImgLoading = false
          this.$message.error('图片不得大于2M，请重新上传')
          return false
        }
      },
      // 上传封面图成功
      uploadBookImgSuccess(response, file, fileList) {
        this.uploadBookImgLoading = false
        if (response.status == 200) {
          this.bookImgViewShow = true
          this.uploadForm.bookImg = response.data.path
          this.$message.success('封面图上传成功')
          this.$refs['uploadForm'].validateField('bookImg')
        } else if (response.status == 90002) {
          this.$message.error('图片不得大于2M，请重新上传')
        }
      },
      // 上传封面图失败
      uploadBookImgError(response, file, fileList) {
        this.uploadBookImgLoading = false
        this.bookImgViewShow = false
        this.$message.error('封面图上传失败，请重新上传')
      },
      // 上传PDF之前
//      uploadBookPdfBefore(file) {
//        this.uploadBookPdfLoading = true
//        // 大于200M
//        if (file.size > 1024 * 1024 * 200) {
//          this.uploadBookPdfLoading = false
//          this.$message.error('PDF不得大于200M，请重新上传')
//          return false
//        }
//        this.qiniuData.key = this.qiniuCacheKey + file.name
//      },
      // 上传PDF成功
//      uploadBookPdfSuccess(response, file, fileList) {
//        this.uploadBookPdfLoading = false
//        this.bookName = file.name
//        this.bookNameShow = true
//        this.uploadForm.bookPdf = `//static.webascii.cn/${response.key}`
//        this.uploadForm.bookHash = response.hash
//        this.$message.success('PDF上传成功')
//        this.$refs['uploadForm'].validateField('bookPdf')
//      },
      // 上传PDF失败
//      uploadBookPdfError(response, file, fileList) {
//        this.uploadBookPdfLoading = false
//        this.bookNameShow = false
//        this.$message.error('PDF上传失败，请重新上传')
//      },
      // 关闭upload popup
      uploadClose() {
        // 重置提示
        this.$refs['uploadForm'].resetFields()
        this.uploadBookImgLoading = false
//        this.uploadBookPdfLoading = false
//        this.bookNameShow = false
        this.bookImgViewShow = false
        this.uploadPopupShow = false
        this.uploadForm.bookImg = ''
        this.uploadForm.contributor = ''
//        this.uploadForm.bookHash = ''
      },
      // paste上传图片
      async uploadBookImg(file) {
        this.uploadBookImgLoading = true
//        类型错误
        if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
          this.$message.error('请复制png或者jpg格式图片后再粘贴')
          this.uploadBookImgLoading = false
          return
        }
        // 大于2M
        if (file.size > 1024 * 1024 * 2) {
          this.$message.error('封面图不得大于2M，请重新上传')
          this.uploadBookImgLoading = false
          return
        }
        let formData = new FormData()
        formData.append('file', file)
        let uploadBookImg = await this.$axios.post('/api/upload/bookView', formData)

        if (uploadBookImg.status == 200) {
          this.bookImgViewShow = true
          this.uploadForm.bookImg = uploadBookImg.data.path
          this.$message.success('封面图上传成功')
          this.$refs['uploadForm'].validateField('bookImg')
          this.uploadBookImgLoading = false
        } else {
          this.$message.error('封面图上传失败，请重新上传')
          this.uploadBookImgLoading = false
        }
      },
      // paste上传pdf
//      async uploadBookPdf(file) {
//        console.log(file)
//        this.uploadBookPdfLoading = true
//        // 类型错误
//        if (file.type != 'application/pdf') {
//          this.$message.error('请复制PDF文件后再粘贴')
//          this.uploadBookPdfLoading = false
//          return
//        }
//        // 大于100M
//        if (file.size > 1024 * 1024 * 100) {
//          this.$message.error('PDF不得大于100M，请重新上传')
//          this.uploadBookPdfLoading = false
//          return
//        }
//        let formData = new FormData()
//        formData.append('files', file)
//        let uploadBookPdf = await this.$store.dispatch('uploadBookPdf', formData)
//        console.log(file)
//        if (uploadBookPdf.status == 200) {
//          this.bookName = file.name
//          this.bookNameShow = true
//          this.uploadForm.bookPdf = uploadBookPdf.data.path
//          this.uploadForm.bookHash = uploadBookPdf.data.hash
//          this.$message.success('PDF上传成功')
//          this.$refs['uploadForm'].validateField('bookPdf')
//          this.uploadBookPdfLoading = false
//        } else {
//          this.$message.error('PDF上传失败，请重新上传')
//          this.uploadBookPdfLoading = false
//        }
//      },
      // paste上传组件
      pasteUpload(event, tyle) {
        let isChrome = false;
        if (event.clipboardData || event.originalEvent) {
          //not for ie11 某些chrome版本使用的是event.originalEvent
          let clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
          if (clipboardData.items) {
            console.log('谷歌浏览器')
            // for chrome
            let items = clipboardData.items
            let len = items.length
            let blob = null
            let isChrome = true
            //阻止默认行为即不让剪贴板内容在div中显示出来
            //在items里找粘贴的image,据上面分析,需要循环
            for (let i = 0; i < len; i++) {
              if (items[i].type.indexOf("image") !== -1) {
                event.preventDefault();
                //getAsFile() 此方法只是living standard firefox ie11 并不支持
                blob = items[i].getAsFile();
//                    console.log(blob)
                this[tyle](blob)
//                    this.uploadImgFromPaste(blob, 'paste', isChrome);
              }
            }
          } else {
            console.log('火狐浏览器')
            //for firefox
            setTimeout(() => {
              //设置setTimeout的原因是为了保证图片先插入到div里，然后去获取值
              let imgList = document.querySelectorAll('#cache-img img')
              let len = imgList.length
              let src_str = ''
              for (let i = 0; i < len; i++) {
                if (imgList[i].className !== 'my_img') {
                  //如果是截图那么src_str就是base64 如果是复制的其他网页图片那么src_str就是此图片在别人服务器的地址
                  src_str = imgList[i].src;
                }
              }
              this[tyle](blob)
//                  this.uploadImgFromPaste(src_str, 'paste', isChrome);
            }, 1);
          }
        } else {
          //for ie11
          setTimeout(function () {
            let imgList = document.querySelectorAll('#cache-img img')
            let len = imgList.length
            let src_str = ''
            for (let i = 0; i < len; i++) {
              if (imgList[i].className !== 'my_img') {
                src_str = imgList[i].src;
              }
            }
            this[tyle](blob)
//                this.uploadImgFromPaste(src_str, 'paste', isChrome);
          }, 1);
        }
      },
//      pdfPasteFocus() {
//        console.log(123)
//        this.pdfTips = true
//      },
//      pdfPasteBlur() {
//        this.pdfTips = false
//      },
//      pdfUploadProgress (event, file, fileList) {
//        if (event.percent >= 100) {
//          this.pdfProgressShow = false
//          this.pdfProgress = 0
//        } else {
//          this.pdfProgressShow = true
//          this.pdfProgress = Number(event.percent.toString().match(/^\d+(?:\.\d{0,2})?/))
//        }
//      }
    },
    components: {
      NavBar,
//      slide,
      BottomFooter,
//      recommendCollection,
//      recommendContent
    },
    computed: {
      // ...mapState(['apiData']),
      // ...mapState(['apiPath']),
    },
    mounted() {
      if (this.$route.name == 'book') {
        if (this.$route.query.upload == 1) {
          this.openUploadPopup()
        }
      }
    }
  }


</script>
<style scoped lang="less">
	.book {
		background-color: #f9f9f9;
		padding-top: 56px;

		.upload-book-box {
			display: flex;
			height: 180px;

			.upload-book-view {
				width: 135px;
				height: 175px;
				margin-left: 20px;

				img {
					width: 135px;
					height: 175px;
				}
			}

			.upload-book-view-tips {
				width: 135px;
				height: 175px;
				margin-left: 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px dashed #d9d9d9;
			}

			.upload-book-view-other {
				width: 260px;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				.el-icon-success {
					font-size: 50px;
					color: #67c23a;
					text-align: center;
					margin-bottom: 20px;
				}

				.file-name {
					width: 220px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			&.img {
				.el-icon-upload {
					margin-top: 20px;
				}
			}

			.img-tips {
				color: #606266;

				.el-icon-circle-close-outline {
					color: #f56c6c;
				}

				.el-icon-circle-check-outline {
					color: #67C23E;
				}
			}
		}

		/*.pdf-progress {*/
		/*width: 600px;*/
		/*height: 28px;*/
		/*padding-top: 10px;*/
		/*}*/

		.statement {
			width: 1200px;
			margin: 0 auto;
			font-size: 14px;
			padding-top: 20px;
			text-align: center;
			color: #666666;
		}
	}

	.book-page {
		width: 1200px;
		margin: 0 auto;
		padding-top: 30px;
		display: flex;

		ul {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			width: 880px;
			margin: 0;
			padding: 0;
			list-style: none;

			li {
				background-color: #ffffff;
				width: 200px;
				height: 300px;
				margin: 10px;

				&:hover {
					background: #363f48;
					-webkit-transform: translateY(-5px);
					transform: translateY(-5px);
					cursor: pointer;

					&:before {
						opacity: 1;
						-webkit-transform: translateY(5px);
						transform: translateY(5px);
					}

					.book-content {
						.info {
							h3 {
								color: #ffffff;
							}
						}
					}
				}

				&:before {
					position: absolute;
					top: 100%;
					left: 5%;
					z-index: -1;
					width: 90%;
					height: 10px;
					background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, .35) 0, rgba(0, 0, 0, 0) 80%);
					background: radial-gradient(ellipse at center, rgba(0, 0, 0, .35) 0, rgba(0, 0, 0, 0) 80%);
					content: '';
					opacity: 0;
					-webkit-transition-duration: .3s;
					transition-duration: .3s;
					-webkit-transition-property: transform, opacity;
					transition-property: transform, opacity;
					pointer-events: none;
				}

				.book-content {
					.book-img {
						display: block;
						width: 135px;
						height: 175px;
						margin: 20px auto 20px auto;
					}

					.info {
						h3 {
							color: #333;
							font-size: 14px;
							line-height: 22px;
							height: 42px;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							padding: 0 20px;
							margin: 0;
						}

						.status-bar {
							color: #aaa;
							padding: 10px 20px;
							display: flex;
							justify-content: space-between;

							.download {
								height: 20px;
								color: #aaa;
								font-size: 12px;
								line-height: 20px;
							}

							.date {
								height: 20px;
								color: #aaa;
								font-size: 12px;
								line-height: 20px;
							}

							i {
								&.icon-browse {
									vertical-align: middle;
								}

								padding-right: 2px;
								font-size: 14px;
								line-height: 20px;
								color: #aaa;
							}
						}
					}
				}
			}
		}

		.contributor {
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 300px;
			margin-left: 20px;

			.con-btn {
				width: 100%;
			}
		}
	}
</style>
