<template>
	<view class="body" :style="{ 'height':bodyHeight }">
		<!-- <view class="title">提交订单</view> -->
		<view class="main">
			<view class="goods" v-for="item in confirmList">
				<image :src="item.img" />
				<view>
					<view>{{item.name}}</view>
					<view class="describe">{{item.explain}}</view>
					<view class="num">数量:{{item.number}}</view>
					<!-- #ifdef MP-WEIXIN -->
					<view class="money">￥{{item.price*item.number}}</view>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<view class="money">￥{{(item.price*item.number).toFixed(2)}}</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<!-- 备注部分 -->
		<view class="beizhu">
			<form>
				<view class="title text">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</view>
				<input class="input" name="input" placeholder="   请输入..." />
			</form>
			<view>
				<view class="title nums">
					餐具数量:
				</view>
				<view class="num-picker">
					<picker :range="array" @change="numchange">
						<view>{{array[index]}}</view>
					</picker>
				</view>
			</view>
		</view>

		<!-- 底部菜单栏 -->
		<view class="action-section">
			<view class="total-box">
				<text class="price-title">合计：</text>
				<text class="price-number">{{totalPrice | currency}}</text>
			</view>
			<view class="confirm-btn" @click="createOrder">提交订单</view>
		</view>
		<WarningBox v-model="show" title='订单已提交 ' text='是否查看订单' @cancel='cancel' @confirm='confirm' />
	</view>
</template>

<script>
	import confirmList from '@/data/cart.js'
	import WarningBox from '@/components/warning-box/warning-box'

	export default {
		components: {
			WarningBox
		},
		data() {
			return {
				confirmList: [],
				array: ['1份', '2份', '3份', '4份', '5份'],
				index: 1,
				bodyHeight: "1000rpx",
				orderList: [],
				show: false,
			}
		},
		onLoad() {
			// this.confirmList = confirmList.cartList;
			this.confirmList = confirmList.cartList.filter((item)=>{
					return item.checked == true;
			})
			this.orderList = this.confirmList.map((item) => {
				return {
					"food_id": item.id,
					"num": item.number
				}
			})
			/* 获取当前设备的屏幕高度 */
			uni.getSystemInfo({
				success: (res) => {
					this.bodyHeight = `${res.windowHeight}px`;
					// console.log(`${res.windowHeight}px`);
				}
			});
		},
		//过滤器
		filters: {
			currency(value) {
				if (!value) return 0.0;
				return "￥" + value.toFixed(2) + "元";
			}
		},
		computed: {
			//计算总价
			totalPrice() {
				let money = 0;
				this.confirmList.forEach(item => {
					if (item.checked) {
						money += item.price * item.number;
					}
				});
				return money;
			},
		},
		methods: {
			createOrder() {
				this.$msg('提交中...', 1000);
				// 下单接口
				uni.request({
						url: this.$apiPath + "?c=order&a=create",
						dataType: "json",
						method: 'POST',
						header: {
							"content-type": "application/x-www-form-urlencoded"
						},
						data: {
							desk_id: localStorage.getItem("desk_id"),
							foods: JSON.stringify(this.orderList)
						},
						success: (res) => {
							console.log(res.data);
						}
					}),
				setTimeout(function() {
					this.show = true;
				}.bind(this), 800)

			},
			cancel() {
				this.confirmList.length = 0;
				uni.switchTab({
					url: 'cart'
				})
			},
			confirm() {
				this.confirmList.length = 0;
				uni.switchTab({
					url: '../order/order',
					animationType: 'pop-in',
					animationDuration: 2000
				});
			},
			numchange(e) {
				console.log(e);
				this.index = e.detail.value;
			}
		}
	}
</script>

<style lang="scss">
	.body {
		background-color: #f2f2f2;
		padding-top: 30rpx;
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
			margin-bottom: 10rpx;
			position: relative;

			&>image {
				width: 100rpx;
				height: 100rpx;
				margin-right: 16rpx;
				border-radius: 10rpx;
			}

			.describe {
				font-size: 24rpx;
				color: #999;
			}

			.num {
				font-size: 24rpx;
				color: #fd350d;
			}

			.money {
				font-size: 33rpx;
				font-weight: bold;
				color: #000000;
				position: absolute;
				right: 12rpx;
				bottom: 20rpx;
			}
		}
	}

	// 备注部分
	.beizhu {
		margin: 10rpx 20rpx 20rpx 20rpx;
		background-color: #fff;
		padding: 20rpx 20rpx 10rpx 20rpx;
		border-radius: 15rpx;
		position: relative;

	}

	.title {
		font-size: 33rpx;
		color: #838383;
	}

	.text {
		width: 165rpx;
	}

	.nums {
		padding-top: 48rpx;
	}

	.input {
		width: 69%;
		height: 50rpx;
		border: #ccc 1rpx solid;
		border-radius: 10rpx;
		position: absolute;
		left: 191rpx;
		top: 20rpx;
		// margin-left: auto;
		display: inline-block;
	}

	.num-picker {
		position: absolute;
		right: 349rpx;
		bottom: 14rpx;
	}

	/* 底部栏 */
	.action-section {
		position: fixed;
		bottom: 25rpx;
		z-index: 95;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 95%;
		height: 100upx;
		background: #FFFFFF;
		border-radius: 279rpx;
		margin-left: 2.5%;


		.total-box {
			display: flex;

			margin-left: 30upx;

			.price-title {
				font-size: 32upx;
				color: black;
			}

			.price-number {
				font-size: 32upx;
				color: $theme-color;
			}
		}

		.confirm-btn {
			width: 207upx;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			font-size: 32upx;
			background: $theme-color;
			color: #FFFFFF;
			border-top-right-radius: 33px;
			border-bottom-right-radius: 33px;

		}
	}
</style>
