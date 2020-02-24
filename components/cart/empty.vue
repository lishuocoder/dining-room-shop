<template>
	<view class="empty">
		<image src="/static/cart/timg.gif" mode="aspectFit"></image>
		<view  class="empty-tips">
			空空如也
			<navigator class="navigator" url="/pages/tabs/index/index" open-type="switchTab">随便逛逛></navigator>
		</view>
	</view>
</template>

<script>
	export default{
		name:'empty',
		
	}
</script>

<style lang="scss">
	.empty{
		position:fixed;
		left: 0;
		top:0;
		width: 100%;
		height: 100vh;
		padding-bottom:100upx;
		display:flex;
		justify-content: center;
		flex-direction: column;
		align-items:center;
		background: #fff;
		image{
			width: 240upx;
			height: 160upx;
			margin-bottom:30upx;
		}
		.empty-tips{
			display:flex;
			font-size: 26upx;
			color: gray;
			.navigator{
				color: $theme-color;
				margin-left: 16upx;
			}
			.navigator:active{
				transform: translate(6rpx, 6rpx);
			}
		}
	}
</style>
