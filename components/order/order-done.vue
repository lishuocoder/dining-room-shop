<template>
	<view class="body" :style="{ 'height':bodyHeight }">
		<view class="time_clock  ">
			<image class="clock_image" src="/static/order/clock.png"></image>
			<view class="goods_time">{{order_time}}</view>
		</view>
		<view class="main">
			<view class="goods" v-for="(item,index) in formList" :key="index" @click="goToPage(item)">
				<image :src="item.img" />
				<view>
					<view class="name">{{item.name}}</view>
					<view class="num">X{{item.num}}</view>
					<view class="money">￥{{item.food_price}}</view>
				</view>
			</view>

			<center>
				<hr style="border-top:0.5rpx solid #e6e7de; width: 95%; size: 1rpx; align:center;" />
			</center>

			<view class="bottom_money">
				<text class="need_pay"> 合计：</text>
				<text class="totalMoney">￥{{total_price}}</text>
			</view>
			<view class="state_btn">
				<text class="_btn" @click="zuijia">追加订单</text>
			</view>
		</view>
		<!-- 底部占位 防止出现菜品过多 追加按钮无法显示的情况 -->
		<view class="buttom">
		</view>
	</view>
</template>
<script>
	export default {
		name: 'order-done',
		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			},
			order_time:{},
			total_price:{}
		},
		data() {
			return {
				bodyHeight: "1000rpx",
			}
		},
		computed: {
			//增加一个过滤器，将list里的菜品个数等于0的菜品过滤出去，返回个数非0的菜品
			formList: function() {
				return this.list.filter(function(item) {
					if (item.num != 0) {
						return item;
					}
				})
			}
		},
		methods: {
			goToPage(item) {},
			zuijia() {
				uni.switchTab({
					url: '../index/index'
				});
			}
		},
		mounted() {
			/* 获取当前设备的屏幕高度 */
			uni.getSystemInfo({
				success: (res) => {
					this.bodyHeight = `${res.windowHeight}px`;
				}
			});
		}
	}
</script>
<style lang="scss">
	.body {
		background-color: #f2f2f2;
		padding-top: 30rpx;
	}

	.time_clock {
		margin-bottom: 18upx;
		margin-left: 33upx;
	}

	.goods_time {
		font-size: 25upx;
		color: #1a1a1a;
		opacity: 0.5;
		margin:0 10rpx 10rpx 30rpx;
	}

	.clock_image {
		width: 33.3upx;
		height: 33.3upx;
		margin:0 10rpx 10rpx 30rpx;
		float: left;
	}

	.main {
		margin: 0rpx 20rpx 20rpx 20rpx;
		background-color: #fff;
		padding: 20rpx 20rpx 10rpx 20rpx;
		border-radius: 15rpx;

		.goods {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			margin-bottom: 20rpx;
			position: relative;

			&>image {
				width: 100rpx;
				height: 100rpx;
				margin-right: 16rpx;
				border-radius: 10rpx;
			}

			.name {
				font-size: 28rpx;
				position: absolute;
				top: 10rpx;
			}

			.num {
				font-size: 24rpx;
				color: #969696;
				position: absolute;
				top: 60rpx;
			}

			.money {
				font-size: 33rpx;
				font-weight: 500;
				color: #000000;
				position: absolute;
				right: 16rpx;
				bottom: 20rpx;
			}
		}
	}

	.bottom_money {
		margin-top: 20rpx;
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.need_pay {
		color: #1a1a1a;
		font-size: 28upx;
	}

	.totalMoney {
		color: #fa2a2d;
		font-size: 31upx;
		margin-right: 33upx;
	}

	.state_btn {
		display: flex;
		justify-content: flex-end;
		margin-top: 32.7upx;
		margin-right: 33upx;
	}

	._btn {
		width: 153upx;
		height: 58upx;
		text-align: center;
		color: $theme-color;
		font-size: 28upx;
		line-height: 58upx;
		border: 3upx solid $theme-color;
		border-radius: 6upx;
	}
	._btn:active{
		transform: translate(4rpx, 4rpx);
	}
	.buttom {
		/* #ifdef H5 */
		// margin-bottom: 60upx;
		/* #endif */
		// position: fixed;
		// bottom: 0;
		// z-index: 90;
		// display: flex;
		width: 750upx;
		height: 100upx;
		background: #f2f2f2;
	}
</style>
