<template>
	<div class="article-history" v-show="list.length > 0">
		<h3 class="title">修改历史{{list.length > 0 ? '（' + list.length + '条记录）' : ''}}</h3>
		<ul class="list">
			<li v-for="(item, index) in list">
				<div class="f-left">
					<i class="el-icon-time"></i>
					<span style="margin: 0 16px 0 5px">{{ item.cTime | Format('yyyy-MM-dd hh:mm') }}（{{ item.cTimeSimplify }}）</span>
					<a class="name" :href="'/history/article/' + item._id">
						<span class="note-title tof">{{ item.title }}</span>
					</a>
				</div>

				<el-button v-if="isAuthor" @click="deleteHistory(item, index)" type="text" size="small">删除</el-button>
			</li>
		</ul>
	</div>
</template>

<script>
  // import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'ArticleHistory',
    data() {
      return {
        noteHistory: [],
        // noteHistoryLength: 0
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
      // 预览历史文章
      preview(row) {
        window.open(`/history/article/${row._id}`)
      },
      // 删除历史
      deleteHistory(row, index) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          console.log('删除')
					const res = await this.$axios.post('/api/biji/article/historyDelete', {
					  id: row._id
					}).catch(e => {
					  console.log(e)
            this.$message.error('删除失败，请联系管理员')
					})
					if (res.status === 200) {
            this.$message.success('删除成功')
						this.list.splice(index, 1)
					}
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
      // ...mapState(['apiData'])
    },
    mounted() {

    }
  }
</script>
<style scoped lang="less">
	.article-history {
		/*width: 880px;*/
		/*margin: 0 auto;*/
		padding-top: 20px;
		.title {
			/*color: #999999;*/
			font-size: 17px;
			font-weight: 700;
		}

		/*.note-title {*/
		/*	display: block;*/
		/*	width: 500px;*/
		/*}*/
		.list {
			li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 36px;
				border-bottom: 1px solid #ebeef5;
				transition: all 0.3s;
				padding: 0 10px;
				&:hover {
					background-color: #f5f7fa
				}
				.f-left {
					display: flex;
					align-items: center;
					font-size: 14px;
					color: #606266;
					.name {
						/*display: inline-block;*/
						max-width: 500px;
						height: 36px;
						display: flex;
						align-items: center;
						.note-title {
							display: block;
							max-width: 500px;
							transition: all .3s;
							&:hover {
								color: #ea6f5a;
							}
						}
					}
				}

			}
		}
	}
</style>
