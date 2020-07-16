<template>
	<div class="page">
		<NavBar></NavBar>
		<div class="content">
			<div class="left-area">
				<div class="user-info">
					123123123
				</div>
			</div>
			<div class="right-area">
				<div class="other-info">
					456456
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import NavBar from '~/components/NavBar.vue'
  export default {
    name: "index",
		components: {
      NavBar
		}
  }
</script>

<style scoped lang="less">
	.page {
		min-height: 100vh;
		background: #f4f5f5;
		.content {
			padding-top: 56px;
			width: 960px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			.left-area {
				.user-info {
					width: 700px;
					border-radius: 2px;
					box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
					background: #ffffff;
					padding: 15px;
				}
			}
			.right-area {
				.other-info {
					width: 240px;
					border-radius: 2px;
					box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
					background: #ffffff;
				}
			}
		}
	}
</style>
