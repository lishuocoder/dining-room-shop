<template>
	<view>
		<view class="cart-list">
			<block v-for="(item, index) in thisCartList" :key="item.id">
				<view class="cart-item">
					<checkbox :checked='item.checked' color='#00d8a0' @click="check('item', index)" />
					<view class="image-wrapper">
						<image :src="item.img" mode="aspectFill"></image>
					</view>
					<view class="item-right">
						<text class="title">{{item.name}}</text>
						<text class="attr">{{item.explain}}</text>
						<view class="item-last">
							<text class="good-price">¥{{item.price}}</text>
							<image class="cart-delete" src="/static/cart/delete.png" @click="delCart(item.id)"></image>
							<uni-number-box :min="1" :value="item.number" :isMin="item.number===1" :index="index" @eventChange="numberChange"
							 :data-index='item.index' v-if="update"></uni-number-box>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 底部菜单栏 -->
		<view class="action-section">
			<view class="total-box">
				<text class="price-title">合计：</text>
				<text class="price-number">¥{{totalPrice.toFixed(2)}}</text>
			</view>
			<view class="confirm-btn" @click="createOrder">去结算</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/cart/uni-number-box.vue'
	export default {
		name: 'cart-item',
		components: {
			uniNumberBox
		},
		props: {
			cartList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				totalPrice: 0,
				thisCartList: [],
				update: true
			}
		},
		methods: {
			//数量
			numberChange(data) {
				this.thisCartList[data.index].number = data.number;
				this.updateTotalPrice();
			},
			//计算总价
			updateTotalPrice() {
				let list = this.thisCartList;
				if (list.length === 0) {
					return;
				}
				let totalPrice = 0;
				list.forEach(item => {
					if (item.checked === true) {
						totalPrice += item.price * item.number;
					}
				})
				this.totalPrice = Number(totalPrice.toFixed(2));
			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.thisCartList[index].checked = !this.thisCartList[index].checked
				}
				this.updateTotalPrice();
			},
			//删除数据
			delCart(id) {
				this.thisCartList.forEach((item, index) => {
					console.log(id);
					if (id == item.id) {
						this.thisCartList.splice(index, 1);
						console.log("进来了");
					}
				})
				this.updateTotalPrice();
			},
			//点击去结算生产订单
			createOrder() {
				this.$msg('生成订单中', 1000);
				setTimeout(function() {
					this.skip()
				}.bind(this), 800)
			},
			skip() {
				this.$jump('/pages/tabs/cart/confirm')
			},
		},
		mounted() {
			this.thisCartList = this.cartList
			this.updateTotalPrice();
			// console.log(1111111,this.cartList)
		},
		watch: {
			thisCartList(val, newval) {
				this.updateTotalPrice();
				this.$emit("getNewCartList", val)
				this.update = false
				this.$nextTick(() => {
					this.update = true
				})
			}
		}

	}
</script>

<style lang="scss">
	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		align-content: center;
		align-items: center;
		padding: 30upx 40upx;

		.cart-check {
			width: 30upx;
			height: 30upx;
		}

		.image-wrapper {
			width: 140upx;
			height: 140upx;
			flex-shrink: 0;
			position: relative;

			image {
				width: 140upx;
				height: 140upx;
				border-radius: 8upx;
			}
		}


		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title {
				font-size: 30upx;
				color: black;
				height: 40upx;
				line-height: 40upx;
			}


			.attr {
				font-size: 26upx;
				color: gray;
				height: 50upx;
				line-height: 50upx;
			}

			.item-last {
				display: flex;
				align-items: center;
				align-content: center;

				.good-price {
					font-size: 30upx;
					color: $theme-color;
					height: 50upx;
					line-height: 50upx;
				}

				.cart-delete {
					width: 50rpx;
					height: 50rpx;
					position: absolute;
					right: -2rpx;
					bottom: 0rpx
				}

				.uni-numbox {
					position: absolute;
					bottom: 0rpx;
				}
			}
		}

	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		bottom: 0;
		z-index: 95;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 750upx;
		height: 100upx;
		background: #FFFFFF;

		.total-box {
			display: flex;

			margin-left: 30upx;

			.price-title {
				font-size: 32upx;
				color: black;
			}

		}

		.confirm-btn {
			width: 250upx;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			font-size: 32upx;
			background: $theme-color;
			color: #FFFFFF;

		}
	}
</style>
