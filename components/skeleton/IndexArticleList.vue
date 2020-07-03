<template>
	<div class="article-placeholder">
		<div class="content">
			<div class="title"></div>
			<div class="describe">
				<div class="text"></div>
				<div class="text"></div>
			</div>
			<div class="meta"></div>
		</div>
		<div class="img"></div>
	</div>
</template>

<script>
  export default {
    name: "SearchArticleList"
  }
</script>

<style lang="less" scoped>
	.article-placeholder {
		display: flex;
		padding-top: 15px;
		transition: all 0.3s;
		.img {
			width: 160px;
			height: 90px;
			box-shadow: 0 0.0625rem 0.1875rem 0 rgba(0, 34, 77, 0.1);
			border-radius: 5px;
			background-color: #eaeaea;
		}

		.content {
			margin-right: 10px;
			flex: 1;

			.title {
				height: 20px;
				width: 300px;
				background-color: #eaeaea;
				margin-bottom: 12px;
			}

			.describe {
				.text {
					height: 16px;
					background-color: #eaeaea;
					margin-bottom: 8px;

					&:first-child {
						width: 100%;
						animation: loading 1s ease-in-out infinite;
					}

					&:last-child {
						width: 60%;
						animation: loading 1s ease-in-out -.5s infinite;
					}
				}
			}

			.meta {
				height: 14px;
				background-color: #eaeaea;
				width: 200px;
			}
		}
	}

	@-webkit-keyframes loading {
		0% {
			width: 60%
		}

		50% {
			width: 100%
		}

		to {
			width: 60%
		}
	}

	@keyframes loading {
		0% {
			width: 60%
		}

		50% {
			width: 100%
		}

		to {
			width: 60%
		}
	}

</style>
