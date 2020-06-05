<template>
	<div class="article-history" v-show="list.length > 0">
		<h3 class="title">修改历史{{list.length > 0 ? '（' + list.length + '条记录）' : ''}}</h3>
		<el-table
			:data="list"
			max-height="300"
			:show-header="false"
			style="width: 100%">
			<el-table-column
				width="200">
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 5px">{{ scope.row.cTime | Format('yyyy-MM-dd hh:mm:ss') }}</span>
				</template>
			</el-table-column>
			<el-table-column
				width="560">
				<template slot-scope="scope">
            <a :href="'/history/article/' + scope.row._id">
                <span class="note-title">{{ scope.row.title }}</span>
            </a>
				</template>
			</el-table-column>
			<el-table-column>
				<template slot-scope="scope">
					<el-button v-if="isAuthor" @click="deleteHistory(scope.row)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'ArticleHistory',
    data() {
      return {
        noteHistory: [],
        noteHistoryLength: 0
      }
    },
    props: {
      list: Array,
      isAuthor: Boolean,
    },
    created() {
      // this.noteHistoryList()
    },
    methods: {
      // noteHistoryList() {
      //   this.$store.dispatch('noteHistoryList', {
      //     id: this.articleId, // 文章ID
      //   })
      //     .then(info => {
      //       if (info.status == 200) {
      //         this.noteHistoryLength = info.data.noteHistory.length
      //         this.noteHistory = info.data.noteHistory
      //       }
      //     })
      //     .catch(error => {
      //     })
      // },
      // 预览历史文章
      preview(row) {
        window.open(`/history/article/${row._id}`)
      },
      // 删除历史
      deleteHistory(row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteNoteHistory', {
            id: row.id, // 文章ID
          })
            .then(info => {
              if (info.status == 200) {
                this.$message.success('删除成功')
                this.noteHistoryList()
              } else {
                this.$message.error('删除失败，请联系管理员')
              }
            })
            .catch(error => {

            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    components: {},
    computed: {
      ...mapState(['apiData'])
    },
    mounted() {

    }
  }
</script>
<style scoped lang="less">
	.article-history {
		/*width: 880px;*/
		/*margin: 0 auto;*/

		.title {
			/*color: #999999;*/
			font-size: 17px;
			font-weight: 700;
		}

		.note-title {
			display: block;
			width: 500px;
		}
	}
</style>
