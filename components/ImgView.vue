<template>
	<transition>
		<div class="img-view" v-if="show">
			<div class="shadow" @click="close"></div>
			<img
				@click="close"
				class="img"
				:src="src"
				alt="">
		</div>
	</transition>
</template>

<script>
  export default {
    name: "ImgView",
    data() {
      return {
        show: false,
        src: ''
      }
    },
    methods: {
      open(src) {
        this.src = src
        this.show = true
      },
      close() {
        this.show = false
      }
    }
  }
</script>

<style lang="less" scoped>
	.v-enter,
	.v-leave-to {
		opacity: 0;
		/*transform: translateX(100px);*/
	}

	.v-enter-active,
	.v-leave-active {
		transition: all 0.4s ease;
	}

	.img-view {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 2000;
		transition: all .4s;

		.shadow {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, .5);
			z-index: 2000;
		}

		.img {
			max-width: 100%;
			max-height: 100%;
			z-index: 2001;
		}
	}
</style>
