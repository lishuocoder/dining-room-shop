<template>
	<view>
		<view class="tree">
			<image src="../../static/index/activity/three/tree.jpg" class="homeimg" />
			<view class="welcome2">
				<image src="../../static/index/activity/three/title.png" />
				<span class="shake"></span>
			</view>
			<image src="../../static/index/activity/three/title2.png" class="tree3" />
			<span class="cloud"></span>
			<span class="cloud"></span>
			<span class="cloud"></span>
		</view>
		<h1 class="logo"><image src="../../static/index/activity/three/logo.png" /></h1>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss">
@-webkit-keyframes a {
	to {
		-webkit-transform: translateY(0);
		opacity: 1;
	}
}
@keyframes a {
	to {
		transform: translateY(0);
		opacity: 1;
	}
}
@-webkit-keyframes b {
	to {
		opacity: 1;
	}
}
@-webkit-keyframes d {
	0% {
		-webkit-transform: translateX(0);
	}
	to {
		-webkit-transform: translateX(-50px);
	}
}

.tree {
	top: 10%;
	-webkit-transform: translateY(100rpx);
	transform: translateY(100rpx);
	-webkit-animation: 1s a;
	animation: 1s a;
	-webkit-animation-fill-mode: forwards;
	animation-fill-mode: forwards;
	.homeimg {
		width: 750rpx;
		height: 450rpx;
	}
}
.logo,
.tree {
	position: absolute;
	left: 0;
	width: 100rpx;
	height: 20rpx;
	opacity: 0;
}
.logo {
	left: 70rpx;
	text-align: center;
	bottom: 5%;
	-webkit-animation: b 0.5s 1s;
	-webkit-animation-fill-mode: forwards;
	image {
		width: 600rpx;
		height: 45rpx;
	}
}
.welcome2 {
	position: relative;
	padding-top: 50rpx;
	opacity: 0;
	transform: translateY(50rpx);
	animation: 1s 0.3s a;
	animation-fill-mode: forwards;
	image {
		width: 780rpx;
		height: 90rpx;
	}
}

.tree3 {
	width: 750rpx;
	height: 45rpx;
	padding-top: 20rpx;
	opacity: 0;
	transform: translateY(30rpx);
	animation: 1s 0.6s a;
	animation-fill-mode: forwards;
}
.cloud {
	position: absolute;
	background: url(../../static/index/activity/three/cloud.png) no-repeat;
	background-size: contain;
}
.cloud:nth-of-type(1) {
	left: 532rpx;
	top: 15rpx;
	width: 58rpx;
	height: 44rpx;
	-webkit-animation: d 3s 2s infinite alternate linear;
}
.cloud:nth-of-type(2) {
	left: 179rpx;
	top: 77rpx;
	width: 91rpx;
	height: 70rpx;
	-webkit-animation: d 3s 2.5s infinite alternate linear;
}
.cloud:nth-of-type(3) {
	left: 402rpx;
	top: 142rpx;
	width: 54rpx;
	height: 41rpx;
	-webkit-animation: d 3s 2.8s infinite alternate linear;
}
</style>
