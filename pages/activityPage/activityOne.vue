<template>
	<view>
		<view class="box">
			<image class="logo pa" src="../../static/index/activity/one/logo.png" />
			<view class="box_content pa tc">
				<p class="fewm" style="margin-top: 40px;">关注微信</p>
				<image src="../../static/index/activity/one/wx.png" style="width: 80%;" />
				<p class="fewm">关注微博</p>
				<image src="../../static/index/activity/one/wb.png" style="width: 140px;height: 140px;" />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less">
	page{
		background-image: url(../../static/index/activity/one/bg1.jpg);
		}
.box {
	position: relative;
	max-width: 640px;
	margin: 0 auto;
}

.bg_01 {
	width: 100%;
}
.db {
	display: block;
}
.logo {
	z-index: 5;
	width: 40px;
	height:40px;
	border-radius: 50%;
	top: 10px;
	right: 10px;
}
.pa {
	position: absolute;
}
.box_content {
	width: 82%;
	margin-left: 9%;
	top: 0;
}
.tc {
	text-align: center;
}
.fewm {
	font-size: 18px;
	// color: #fff;
	font-weight: bold;
	line-height: 40px;
}
</style>
