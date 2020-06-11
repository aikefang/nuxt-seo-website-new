<template>
    <div class="editor-page">
        <div style="display: flex;height: 100%">
            <div class="flex-container" style="width: 20%; position: fixed; border-right: 1px solid #d9d9d9">
                <div class="flex-item">
                    <a href="/" class="logo">
                        <img src="//static.webascii.cn/webascii/old_pictures/uploads/logo-min.png" alt="">
                    </a>
                </div>
                <div class="flex-item draft-list">
                    <div v-if="!editArticle" class="jb-all new-draf" @click="createDraft">
                        <i class="iconfont icon-tianjia"></i>
                        <span>新建文章</span>
                    </div>
                    <!--<el-button-->
                            <!--v-if="editArticle"-->
                            <!--style="width: 100%;border-radius: inherit"-->
                            <!--icon="iconfont icon-fabu"-->
                            <!--class="publish"-->
                            <!--@click="publishEdit"-->
                            <!--:disabled="!buttonDisabled"-->
                            <!--type="danger"-->
                    <!--&gt;-->
                        <!--编辑提交-->
                    <!--</el-button>-->
                    <ul>
                        <li v-for="item in noteDraft" @click="selectList(item)"
                            :class="{selected: item.id == selectDraftId}" class="jb-all">
                            <div class="det">
                                <i class="iconfont icon-icon_article"></i>
                                <span v-show="item.title">{{item.title}}</span>
                                <span v-show="!item.title">{{item.cTime | Format('yyyy-MM-dd hh:mm:ss')}}</span>
                            </div>
                            <el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="click">
                                <ul class="setting-list">
                                    <li @click="deleteDraft(item.id, $event)">
                                        删除
                                    </li>
                                </ul>
                                <i v-show="item.id == selectDraftId" slot="reference" class="iconfont icon-shezhi setting"></i>
                            </el-popover>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="flex-container" style="width: 80%;margin-left: 20%">
                <div class="flex-item" :class="{'no-edit-box': !showEditor}">
                    <div v-show="showEditor" class="write-conter">
                        <div class="title" ref="title">
                            <input type="text" v-model="title" class="jb-all" placeholder="好笔记配好标题，就如好马配好鞍。">
                        </div>
                        <div class="describe" ref="describe">
                            <el-input
                                    type="textarea"
                                    :rows="3"
                                    resize="none"
                                    v-model="describe"
                                    placeholder="请输入文章简介">
                            </el-input>
                        </div>
                        <div class="only-tool" ref="onlyTool">
                            <div id="editToolBar"></div>
                            <el-button
                                    v-if="editArticle"
                                    icon="iconfont icon-fabu"
                                    class="publish"
                                    @click="publishEdit"
                                    :disabled="!buttonDisabled"
                                    type="info">
                                编辑
                            </el-button>
                            <el-button
                                    v-if="!editArticle"
                                    icon="iconfont icon-fabu"
                                    class="publish"
                                    @click="publishAdd"
                                    :disabled="!buttonDisabled"
                                    type="info">
                                发布
                            </el-button>
                        </div>
                        <div id="edit"></div>
                        <div class="article-other" ref="articleOther">
                            <div class="box">
                                <!--<div class="title">预览图（160px*90px）</div>-->
                                <el-upload
                                        v-loading="previewLoading"
                                        element-loading-text="拼命上传中..."
                                        class="avatar-uploader"
                                        ref="upload-img"
                                        :action="bashApi+action"
                                        :show-file-list="false"
                                        :on-success="uploadSuccess"
                                        :on-error="uploadError"
                                        :before-upload="beforeUpload"
                                        :name="name"
                                        :data="data">
                                    <img v-if="imgUrl" :src="imgUrl" class="avatar">
                                    <div v-if="!imgUrl">
                                        <i class="el-icon-upload"></i>
                                        <div class="el-upload__text">将预览图片拖到此处，或<em>点击上传</em></div>
                                        <div class="img-tips">
                                            <i v-show="!imgTips" class="el-icon-circle-close-outline"></i>
                                            <i v-show="imgTips" class="el-icon-circle-check-outline"></i>
                                            使用Ctrl+V可以快速上传图片
                                        </div>
                                    </div>
                                    <input type="text" style="position: fixed;top: -100000px;" id="img-paste">
                                </el-upload>
                                <div class="cat-nav">
                                    <div class="clear">
                                        <a class="cur jb-all"
                                           v-for="item in apiData.allCategory.list"
                                           :key="item.id"
                                           @click="selectCategory(1,item.id,item.title)"
                                           :class="{selected:item.id==categoryType}">
                                            {{item.title}}
                                        </a>
                                    </div>
                                    <div class="category-children-box"
                                         v-for="(item,index) in apiData.allCategory.child"
                                         :key="item.id"
                                         v-show="categoryType == index">
                                        <a
                                                class="cur jb-all"
                                                :key="cItem.id"
                                                v-for="cItem in item"
                                                @click="selectCategory(2,cItem.id,cItem.title)"
                                                :class="{'selected':cItem.id==categoryChildType}">
                                            {{cItem.title}}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--<div class="section">-->
                        <!--<div class="title">笔记类型 :-->
                        <!--&lt;!&ndash;{{categoryText || '?'}} - {{categoryChildText || '?'}}&ndash;&gt;-->
                        <!--</div>-->

                        <!--</div>-->
                        <div id="cache-img" style="display: none">
                            <img src="" alt="">
                        </div>
                    </div>
                    <div v-show="!showEditor" class="no-edit">
                        WebAscii
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  import navBar from '~/components/navBar.vue'
  //  import "quill/dist/quill.snow.css"
  //  import "quill/dist/quill.bubble.css"
  //  import "quill/dist/quill.core.css"
  export default {
    name: 'WriteContent',
    data() {
      return {
        previewLoading: false,
        name: 'files', // 上传图片字段名称
        data: { // 上传附加的数据
          loginToken: this.$store.state.Cookies.loginToken,
          userId: this.$store.state.Cookies.userId,
        },
        //预览
//        visible: false,//预览是否显示
        imgUrl: '',//预览图片链接
//        originImgUrl: '',
        action: `/api/upload/files`,
        title: '',
        describe: '',
        categoryType: null, // 父级分类
        categoryChildType: null, // 子集分类
        categoryText: '',
        categoryChildText: '',
        content: '', // 内容
        buttonDisabled: false,
        fixed: false,
        // 自定义上传使用
        uniqueId: 'inputImg',
        imageLoading: false,
        draftId: null,
        noteDraft: [],
        selectDraftId: null,
        showEditor: false,
        imgTips: false
      }
    },
    components: {},
    watch: {
      // 父级分类发生变化时，清空子集分类
//      categoryType() {
//        if (this.categoryChildType) {
//          return
//        }
//        this.categoryChildType = null
//      },
      categoryChildType() {
        this.buttonDisabled = this.changeButtonStatus()
        let obj = this.onlyNoteData()
        clearTimeout(this.st01)
        this.st01 = setTimeout(() => {
          this.updateDraft(obj)
        }, 200)
      },
      title() {
        this.buttonDisabled = this.changeButtonStatus()
        let obj = this.onlyNoteData()
        clearTimeout(this.st01)
        this.st01 = setTimeout(() => {
          this.updateDraft(obj)
        }, 200)
//        window.onbeforeunload = function (event) {
//          return "您编辑的信息尚未保存，您确定要离开吗？"//这里内容不会显示在提示框，为了增加语义化。
//        }
      },
      describe() {
        this.buttonDisabled = this.changeButtonStatus()
        let obj = this.onlyNoteData()
        clearTimeout(this.st01)
        this.st01 = setTimeout(() => {
          this.updateDraft(obj)
        }, 200)
//        window.onbeforeunload = function (event) {
//          return "您编辑的信息尚未保存，您确定要离开吗？"//这里内容不会显示在提示框，为了增加语义化。
//        }
      },
      content() {
        this.buttonDisabled = this.changeButtonStatus()
        let obj = this.onlyNoteData()
        clearTimeout(this.st01)
        this.st01 = setTimeout(() => {
          this.updateDraft(obj)
        }, 200)
//        window.onbeforeunload = function (event) {
//          return "您编辑的信息尚未保存，您确定要离开吗？"//这里内容不会显示在提示框，为了增加语义化。
//        }
      },
      imgUrl() {
        this.buttonDisabled = this.changeButtonStatus()
        let obj = this.onlyNoteData()
        clearTimeout(this.st01)
        this.st01 = setTimeout(() => {
          this.updateDraft(obj)
        }, 200)
//        window.onbeforeunload = function (event) {
//          return "您编辑的信息尚未保存，您确定要离开吗？"//这里内容不会显示在提示框，为了增加语义化。
//        }
      },
    },
    computed: {
      ...mapState(['apiData']),
      ...mapState(['editArticle']),
      editor() {
        return this.$refs.myQuillEditor.quill
      },
      bashApi() {
        return this.$store.state.apiPath
      },
//      editArticle() {
//        return this.$store.state.editArticle
//      },
      editArticleId() {
        return this.$store.state.editArticleId
      }
    },
    methods: {
      // 获取唯一data
      onlyNoteData() {
        let category = []
//        if (this.categoryType && this.categoryChildType) {
//          category = JSON.stringify([this.categoryType, this.categoryChildType])
//        }
//        console.log(this.categoryType)
//        console.log(this.categoryChildType)
//        console.log(JSON.parse(category))
        let obj = JSON.parse(JSON.stringify({
          id: this.selectDraftId,
          title: this.title, // 标题
          describe: this.describe, // 简介
          content: this.content, // 内容
          articleImageView: this.imgUrl, // 预览图
          categoryFirst: this.categoryType,
          categorySecond: this.categoryChildType
//          category: category // 分类
        }))
//        console.log(obj)
        return obj
      },
      // 改变提交按钮状态
      changeButtonStatus() {
        if (
          !!this.categoryType !== false
          && !!this.categoryChildType !== false
          && !!this.title !== false
          && !!this.describe !== false
          && !!this.content !== false
          && !!this.imgUrl !== false
        ) {
          return true
        }
        return false
      },
      uploadError() {
        this.$message.error('预览图上传失败，请重新上传')
        this.previewLoading = false
      },
      uploadSuccess(res, file) {
        if (res.status !== 200) {
          this.$message.error(`${res.status}:${res.error}`)
          return
        }
//        let url = ''
//        if (res.data.height > res.data.width) {
//          url = res.data.path + '?imageMogr2/thumbnail/135x/gravity/Center/crop/240x135'
//        } else {
//          url = res.data.path + '?imageMogr2/thumbnail/x135/gravity/Center/crop/240x135'
//        }
        this.imgUrl = res.data.path;
        this.previewLoading = false
//        this.originImgUrl = res.path
      },
      beforeUpload(file) {
        this.previewLoading = true
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 选择分类
      selectCategory(type, id, text) {
        if (type === 1) {
          this.categoryType = id
          this.categoryText = text
          this.categoryChildType = null
        } else if (type === 2) {
          this.categoryChildType = id
          this.categoryChildText = text
        }
      },
      async publishAdd() {
        this.buttonDisabled = false
        let obj = this.onlyNoteData()
        obj.content = this.editDom.froalaEditor('html.get')
        await this.$store.dispatch('updateDocDraft', obj)
        this.$store.dispatch('publishDocDraft', {
          id: this.selectDraftId
        })
          .then(info => {
            this.$message.success('草稿发布成功，2秒后传送至文章内容~')
            setTimeout(() => {
              window.location.href = `/doc/${info.data.id}`
            }, 2000)
          })
          .catch(error => {
            this.buttonDisabled = true
            this.$message.error('发布草稿失败')
          })
      },
      publishEdit() {
        this.buttonDisabled = false
        this.$store.dispatch('editDoc', {
          markdown: false, // 是否保存markdown代码
          id: this.$store.state.editArticleId, // 文章ID
          title: this.title, // 标题
          describe: this.describe, // 简介
          content: this.content, // 内容
          articleImageView: this.imgUrl, // 预览图
          categoryFirst: this.categoryType,
          categorySecond: this.categoryChildType
        })
          .then(info => {
            this.$message.success('编辑文章成功，2秒后传送至文章内容~')
            setTimeout(() => {
              window.location.href = `/doc/${info.data.id}`
            }, 2000)
          })
          .catch(error => {
            this.buttonDisabled = true
            this.$message.error('编辑文章失败')
          })
      },
      // 拖拽上传预览图
      async uploadViewImg(key, f) {
        this.previewLoading = true
        let formData = null
        // 大于2M
        if (f.size > 1024 * 1024 * 2) {
          this.$message.error('预览图不得大于2M，请重新上传')
          this.uploadBookImgLoading = false
          return
        }
        if (key == 'drag') {
          formData = new FormData()
          formData.append('files', f)
        }
        try {
//          const data = await this.uploadImgReq(formData)
          let uploadImg = await this.$store.dispatch('upload', formData)
          if (uploadImg.status == 200) {
            this.imgUrl = uploadImg.data.path
            this.$message.success('预览图上传成功')
            this.previewLoading = false
          } else {
            this.$message.error('预览图上传失败，请重新上传')
            this.previewLoading = false
          }
        } catch ({message: msg}) {
          this.$message.error('预览图上传失败，请重新上传')
          this.imgUrl = ''
          this.previewLoading = false
        }
      },
      initEdit() {
        let contentHeight = document.documentElement.clientHeight - 49 - 75 - 176
        let that = this
        require('~/plugins/froala-editor-custom-toolbar')()
        this.editDom = $('#edit')
        this.editDom.froalaEditor({
          // 编辑器toolbar分离
          toolbarContainer: '#editToolBar',
          // 编辑框左侧加号
          quickInsertButtons: this.$store.state.quickInsertButtons,
          height: contentHeight,
          placeholderText: '',
          pastePlain: true,
          theme: 'gray',
          fontFamilySelection: true,
          fontSizeSelection: true,
          paragraphFormatSelection: true,
          toolbarStickyOffset: 0,
          toolbarButtons: this.$store.state.toolbarButtonsWrite,
//          toolbarButtonsMD: ['bold', 'italic', 'underline'],
//          toolbarButtonsSM: ['bold'],
          imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
//          imageManagerLoadURL: 'http://i.froala.com/assets/photo1.jpg',
          imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
          fileUploadURL: `${this.$store.state.apiPath}/api/editor/upload/files`,
          fileUploadParams: {
            loginToken: that.$store.state.Cookies.loginToken,
            userId: that.$store.state.Cookies.userId,
          },
          paragraphFormat: this.$store.state.paragraphFormat,
          imageUploadURL: `${this.$store.state.apiPath}/api/editor/upload/files`,
          imageUploadParams: {
            loginToken: that.$store.state.Cookies.loginToken,
            userId: that.$store.state.Cookies.userId,
          },
          inlineClasses: {
            'fr-class-code': 'Code',
            'fr-class-highlighted': 'Highlighted',
            'fr-class-transparency': 'Transparent'
          },
          language: 'zh_cn',
          codeBeautifierOptions: {
            end_with_newline: true,
            indent_inner_html: true,
            extra_liners: "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
            brace_style: 'expand',
            indent_char: ' ',
            indent_size: 4,
            wrap_line_length: 0
          }
        })
        // 编辑器内容变化
        this.editDom.on('froalaEditor.contentChanged', (e, editor) => {
          this.content = editor.html.get()
        })

//        this.editDom.on('froalaEditor.image.beforePasteUpload', (img) => {
//          console.log(img)
//        })

      },
      clearContent() {
        // 如果不是编辑
        if (!!this.$route.params.id != true) {
          this.title = ''
          this.describe = ''
          this.categoryType = null
          this.categoryChildType = null
          this.content = ''
          this.imgUrl = ''
        }
      },
      async uploadPasteImg(file) {
        // 类型错误
        if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
          this.$message.error('请复制png或者jpg格式图片后再粘贴')
          this.uploadBookImgLoading = false
          return
        }
        // 大于2M
        if (file.size > 1024 * 1024 * 2) {
          this.$message.error('预览图不得大于2M，请重新上传')
          this.uploadBookImgLoading = false
          return
        }
        let formData = new FormData()
        formData.append('files', file)

        let uploadImg = await this.$store.dispatch('upload', formData)
        if (uploadImg.status == 200) {
          this.imgUrl = uploadImg.data.path
          this.$message.success('预览图上传成功')
        } else {
          this.$message.error('预览图上传失败，请重新上传')
        }
        this.previewLoading = false
      },
      // paste上传组件
      pasteUpload(event, tyle) {
        this.previewLoading = true
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
            isChrome = true
            //阻止默认行为即不让剪贴板内容在div中显示出来
            //在items里找粘贴的image,据上面分析,需要循环
            for (let i = 0; i < len; i++) {
              if (items[i].type.indexOf("image") !== -1) {
                event.preventDefault();
                //getAsFile() 此方法只是living standard firefox ie11 并不支持
                blob = items[i].getAsFile();
                this.uploadPasteImg(blob)
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
              this.uploadPasteImg(blob)
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
            this.uploadPasteImg(blob)
          }, 1);
        }
      },
      // 拖动上传预览图
      dragUploadViewImgInit() {
        let viewBox = document.querySelector('.avatar-uploader .el-upload')
        viewBox.ondragover = e => {
          if (e.currentTarget.className.indexOf('drop-img') == -1) {
            e.currentTarget.className = e.currentTarget.className + ' drop-img'
          }
          e.preventDefault();
        }
        viewBox.ondragleave = e => {
          e.currentTarget.className = e.currentTarget.className.replace('drop-img', '')
          e.preventDefault();
        }
        viewBox.ondrop = e => {
          e.preventDefault();
          let f = e.dataTransfer.files[0];//获取到第一个上传的文件对象
          e.currentTarget.className = e.currentTarget.className.replace('drop-img', '')
          this.uploadViewImg('drag', f)
        }
      },
      // 粘贴上传预览图
      pasteUploadViewImgInit() {
        let imgDom = this.$refs['upload-img'].$el
        imgDom.onmouseenter = () => {
          document.querySelector('#img-paste').focus()
          document.querySelector('#img-paste').onpaste = async (event) => {
            this.pasteUpload(event, 'uploadBookImg')
          }
        }
        imgDom.onmouseleave = () => {
          document.querySelector('#img-paste').blur()
        }
        document.querySelector('#img-paste').onfocus = () => {
          this.imgTips = true
        }
        document.querySelector('#img-paste').onblur = () => {
          this.imgTips = false
        }
      },

      // 创建草稿
      async createDraft() {
        let draft = await this.$store.dispatch('createDocDraft', {})
        if (draft.status == 200) {
//          console.log(draft.data.id)
          this.getDraftList(this.editArticle)
        } else {
          this.$message.error('新建文章失败，请联系管理员')
        }
      },
      // 更新草稿
      updateDraft(obj) {
        let draft = this.$store.dispatch('updateDocDraft', obj)
        Promise.all([draft])
          .then((data) => {
            if (data[0].status == 200) {
              console.log(this.selectDraftId, '草稿更新成功')
            } else {
              this.$message.error('草稿更新失败，请联系管理员')
            }
          })
      },

      changeNoteDatails(obj) {
        this.title = obj.title
        this.describe = obj.articleDescribe
        this.content = obj.content
        this.editDom.froalaEditor('html.set', obj.content)
        this.imgUrl = obj.articleImageView
        this.categoryType = obj.articleClassifyLevelFirst
        this.categoryChildType = obj.articleClassifyLevelSecond
      },

      draftDetails() {
        let draft = this.$store.dispatch('getDocDraftDetails', {
          id: this.selectDraftId
        })
        Promise.all([draft])
          .then((data) => {
            if (data[0].status == 200) {
              let obj = data[0].data.note
              this.changeNoteDatails(obj)
            } else {
              this.$message.error('获取草稿详情失败，请联系管理员')
            }
          })
      },
      changeDefaultData(type, obj) {
        if (type == 'default') {
          this.selectDraftId = obj.id
          this.changeNoteDatails(obj)
        } else if (type == 'click') {
          this.selectDraftId = obj.id
          this.draftDetails()
        }
      },
      // 获取草稿列表
      getDraftList(boo) {
        let draft = this.$store.dispatch('getDocDraftList', {})
        Promise.all([draft])
          .then((data) => {
            if (data[0].status == 200) {
              if (data[0].data.noteDraft.length > 0 && !boo) {
                this.changeDefaultData('default', data[0].data.noteDraft[0])
              }
              if (data[0].data.noteDraft.length <= 0) {
                this.showEditor = false
              } else {
                this.showEditor = true
              }
              this.noteDraft = data[0].data.noteDraft
            } else {
              this.$message.error('获取文章列表失败，请联系管理员')
            }
          })
      },
      // 点击文章列表
      selectList(item) {
        // 禁止多次点击
        if (item.id == this.selectDraftId) {
          return
        }
        this.changeDefaultData('click', item)
      },
      // 删除草稿
      async deleteDraft(id, e) {
        let deleteDraft = await this.$store.dispatch('deleteDocDraft', {
          id: id
        })
        if (deleteDraft.status == 200) {
          this.$message.success('删除草稿成功')
          window.location.reload()
          this.getDraftList(this.$store.state.editArticle)
        } else {
          this.$message.error('删除草稿失败，请联系管理员')
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initEdit()
        this.clearContent()
        if (this.$store.state.editArticle) {
          if (!this.apiData.noteEditContent.isAuthor) {
            this.$message.error('没有此文章编辑权限')
            setTimeout(() => {
              window.location.href = '/'
            }, 2000)
            this.showEditor = false
            return
          }
          this.title = this.apiData.noteEditContent.title
          this.describe = this.apiData.noteEditContent.articleDescribe
          this.content = this.apiData.noteEditContent.content
          this.editDom.froalaEditor('html.set', this.apiData.noteEditContent.content)
          this.imgUrl = this.apiData.noteEditContent.articleImageView
          this.categoryType = this.apiData.noteEditContent.articleClassifyLevelFirst
          // 延迟是因为watch.categoryType会时categoryChildType为null
//          setTimeout(() => {
          this.categoryChildType = this.apiData.noteEditContent.articleClassifyLevelSecond
          this.showEditor = true
//          }, 500)
        } else {
          this.getDraftList(this.$store.state.editArticle)
        }

        this.dragUploadViewImgInit()
        this.pasteUploadViewImgInit()
      })
    },
  }
</script>
<style lang="less">
    .avatar-uploader {
        width: 240px;
        height: 135px;
        .el-upload {
            border: 1px dashed transparent;
            /*border-radius: 6px;*/
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 240px;
            height: 135px;
            &:hover {
                border-color: #409EFF
            }
            &.drop-img {
                border-color: #409EFF
            }
        }
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 240px;
        height: 135px;
        line-height: 135px !important;
        text-align: center
    }

    .avatar {
        width: 240px;
        height: 135px;
        display: block
    }

    .write-conter {
        /*padding-bottom: 100px;*/
        /*编辑器工具栏 start*/
        #editToolBar {
            height: 38px;
            width: 90%;
        }
        #edit {
            /*min-height: 529px;*/
            /*border-bottom: 1px solid #ccc;*/
          ul {
            list-style: inherit;
            padding-left: 40px;
            position: relative;
            &:after {
              position: absolute;
              content: '\e601';
              font-size: 12px;
              left: 0;
              top: 2px;
              color: #f56c6c;
              font-family: "iconfont" !important;
              /*font-size: 16px;*/
              font-style: normal;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            li {
              padding-bottom: 5px;
            }
          }
          ol {
            position: relative;
            &:after {
              position: absolute;
              content: '\e600';
              font-size: 12px;
              left: 0;
              top: 2px;
              color: #f56c6c;
              font-family: "iconfont" !important;
              /*font-size: 16px;*/
              font-style: normal;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            li {
              padding-bottom: 5px;
            }
          }
        }
        .fr-toolbar {
            padding: inherit;
            /*border: 1px solid #dcdfe6;*/
            border-top: inherit;
            /*border-left: inherit;*/
            /*border-right: inherit;*/
            /*border-radius: inherit;*/
            &.fr-top {
                -webkit-box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0) !important;
                -moz-box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0) !important;
                box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0) !important;
            }
        }
        .fr-wrapper {
            -webkit-box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0) !important;
            -moz-box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0) !important;
            box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0) !important;
            /*border: 1px solid #d9d9d9 !important;*/
            /*border-left: none !important;*/
            /*border-right: none !important;*/
            /*border-top: inherit !important;*/
            /*border-radius: initial !important;*/
        }
        /*.fr-view {*/
            /*pre {*/
                /*border-left: 5px solid #3d7e9a;*/
                /*padding: 15px;*/
                /*background: #eee;*/
            /*}*/
        /*}*/
        .v-note-wrapper .v-note-op {
            width: 1200px !important;
            top: 0;
            position: absolute;
            box-shadow: none !important;
            border: 1px solid #ccc;
            border-top: none;
        }
        .v-note-wrapper .v-note-panel {
            box-shadow: none !important;
            border: 1px solid #ccc;
            border-top: none;
        }
        .fr-separator.fr-vs {
            width: 1px;
            height: 38px;
            margin: 0;
        }
        .fr-toolbar .fr-command.fr-btn {
            margin: 0;
        }
        /*编辑器工具栏 end*/

        // 文章简介 样式重置 start
        .el-textarea__inner {
            border-radius: 0;
            border-color: #ccc;
            border-left: none;
            border-right: none;
        }
        .el-textarea__inner:focus, .el-textarea__inner:hover {
            border-color: #ccc;
        }
        // 文章简介 样式重置 end
    }

    .setting-list {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
            padding: 12px;
            cursor: pointer;
            &:hover {
                background-color: #595959;
                color: #ffffff;
            }
        }
    }

    .el-popover {
        padding: 0;
    }

</style>
<style scoped lang="less">
    .write-conter {
        width: 100%;
        /*margin: 0 auto;*/
        /*padding-top: 50px;*/
        .title {
            input {
                width: 100%;
                font-size: 14px;
                height: 49px;
                padding: 10px 16px;
                background-color: #fff;
                background-image: none;
                border: none;
                outline: 0;
            }
            /*&:after {*/
            /*display: block;*/
            /*clear: both;*/
            /*content: ' ';*/
            /*}*/
        }
        .publish {
            /*margin-top: 30px;*/
            /*width: 120px;*/
            font-size: 16px;
            border-radius: inherit;
            height: 38px;
            line-height: 38px;
            padding: 0;
            width: 10%;
        }
        .only-tool {
            display: flex;
            border-bottom: 1px solid #ccc;
        }
        /*.section {*/
        /*padding-top: 10px;*/
        /*padding-left: 10px;*/
        /*.title {*/
        /*min-height: 30px;*/
        /*font-size: 14px;*/
        /*color: #999;*/
        /*line-height: 30px;*/
        /*font-weight: 400;*/
        /*padding-bottom: 10px;*/
        /*}*/
        /*}*/
        .article-other {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            .box {
                display: flex;
                .el-icon-upload {
                    font-size: 67px;
                    color: #c0c4cc;
                    /*margin: 40px 0 16px;*/
                    line-height: 50px;
                    margin-top: 10px;
                }
                .el-upload__text {
                    color: #606266;
                    font-size: 14px;
                    text-align: center;
                    margin-top: 6px;
                    em {
                        color: #409eff;
                        font-style: normal;
                    }
                }
                .img-tips {
                    color: #606266;
                    margin-top: 6px;
                    font-size: 14px;
                    .el-icon-circle-close-outline {
                        color: #f56c6c;
                    }
                    .el-icon-circle-check-outline {
                        color: #67C23E;
                    }
                }
                .cat-nav {
                    padding: 10px 0 0 20px;
                    border-left: 1px solid #ccc;
                    a {
                        display: block;
                        height: 30px;
                        line-height: 26px;
                        border: 1px #999 solid;
                        border-radius: 3px;
                        text-decoration: none;
                        margin: 5px 10px 0 0;
                        padding: 0 6px;
                        float: left;
                        color: #333;
                        font-size: 14px;
                        &:hover {
                            border: 1px #ea6f5a solid;
                            color: #ea6f5a;
                        }
                    }
                    a.selected {
                        color: #fff !important;
                        background-color: #ea6f5a;
                        border: 1px #ea6f5a solid;
                        /*color: #ea6f5a;*/
                    }
                    .category-children-box {
                        padding-top: 10px;
                        /*margin-left: 48px;*/
                        padding-bottom: 10px;
                        .category-children {
                            margin-right: 10px;
                        }
                    }
                }

                .cat-nav.cat-bg.cat-primarybright {

                }

                .cat-nav.cat-bg.cat-primarybright {

                }

                .cat-nav.cat-bg.cat-primarybright dd a.selected, .cat-nav.cat-bg.cat-primarybright dd a:hover {
                    border: 1px #ea6f5a solid;
                    color: #ea6f5a;
                }

                .cat-nav.cat-bg {

                }
            }

        }
    }

    .no-edit-box {
        position: fixed;
        width: 80%;
        height: 100%;
        background-color: #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;
        .no-edit {
            font-size: 64px;
            color: #e6e6e6;
            font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
            /*height: 100%;*/
        }
    }

    .editor-page {
        background-color: #ffffff;
        .logo {
            cursor: pointer;
            height: 50px;
            display: flex;
            align-items: center;
            img {
                height: 50px;
                margin: 0 auto;
            }
        }
        .draft-list {
            .new-draf {
                width: 100%;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #595959;
                background-color: #efe9d9;
                border-bottom: 1px solid #d9d9d9;
                font-size: 20px;
                cursor: pointer;
                &:hover {
                    color: #333333;
                }
                i {
                    margin-right: 5px;
                }
            }
            ul {
                margin: 0;
                padding: 0;
                list-style: none;
                li {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 90px;
                    border-bottom: 1px solid #d9d9d9;
                    color: #595959;
                    cursor: pointer;
                    .det {
                        border-left: 5px solid transparent;
                        display: flex;
                        align-items: center;
                        height: 100%;
                        width: 100%;
                        cursor: pointer;
                        margin-right: 10px;
                        i {
                            width: 50px;
                            height: 30px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                        }
                        span {
                            width: 100%;
                            height: 36px;
                            display: flex;
                            margin-right: 10px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            cursor: pointer;
                            word-break: break-all;
                            word-wrap: break-word;
                            text-align: left;
                        }
                    }
                    .setting {
                        margin-right: 20px;
                        &:hover {
                            color: #ea6f5a;
                        }
                    }
                    &.selected {
                        background-color: #e6e6e6;
                        .det {
                            border-left-color: #ec7259;
                        }
                    }
                    &:hover {
                        background-color: #e6e6e6;
                    }
                }
            }
        }
        .left-box {
            width: 25%;
            border-right: 1px solid #d9d9d9;

            .draft-list {
                /*display: flex;*/
                /*flex-direction: column;*/
                /*position: relative;*/
                width: 100%;
                height: 100%;
                overflow-y: auto;
                overflow-x: hidden;

            }
        }
    }

    html, body {
        /*height: 100%;*/
        margin: 0;
        padding: 0;
    }

    .flex-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        /*text-align: center;*/
    }

    .flex-item:nth-child(1), .flex-item:nth-child(3) {
        flex-grow: 0;
        flex-shrink: 0;
        /*background-color: #ababab;*/
    }

    .flex-item:nth-child(2) {
        flex-grow: 1;
        flex-shrink: 1;
        /*background-color: #000;*/
        overflow-y: auto;
    }
</style>

