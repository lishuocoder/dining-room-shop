<template>
	<view>
		<view class="cart-list">
			<side-slip v-for="(item, index) in this.$cartList" :key="item.id" @remove="delCart(item.id)">
				<view class="cart-item">
					<checkbox :checked='item.checked' color='#208bb5' @click="check('item', index)" />
					<view class="image-wrapper">
						<image lazy-load :src="item.img" mode="aspectFill"></image>
					</view>
					<view class="item-right">
						<text class="title">{{item.name}}</text>
						<text class="attr">{{item.explain}}</text>
						<view class="item-last">
							<text class="good-price">¥{{item.price}}</text>
							<uni-number-box :min="1" :value="item.number" :isMin="item.number===1" :index="index" @eventChange="numberChange"
							 :data-index='item.index' v-if="update"></uni-number-box>
						</view>
					</view>
				</view>
			</side-slip>
		</view>
		<!-- 底部菜单栏 -->
		<view class="action-section">
			<view class="total-box">
				<text class="price-title">合计：</text>
				<text class="price-number">¥{{totalPrice.toFixed(2)}}</text>
			</view>
			<view class="confirm-btn" :class="{'OrderStatus':this.status}" @click="createOrder">去结算</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/cart/uni-number-box.vue'
	import SideSlip from '@/components/cart/side-slip.vue' //滑动删除组件
	export default {
		name: 'cart-item',
		components: {
			uniNumberBox,
			SideSlip
		},
		data() {
			return {
				totalPrice: 0,
				update: true,
				status: false
			}
		},
		methods: {
			//数量
			numberChange(data) {
				this.$cartList[data.index].number = data.number;
				this.updateTotalPrice();
			},
			//计算总价
			updateTotalPrice() {
				let list = this.$cartList;
				if (list.length === 0) {
					this.totalPrice = 0
					this.status=true;
					return;
				}
				let totalPrice = 0;
				list.forEach(item => {
					if (item.checked === true) {
						totalPrice += item.price * item.number;
					}
				})
				this.totalPrice = Number(totalPrice.toFixed(2));
				
				if(this.totalPrice==0){
					this.status = true;
					console.log(this.status)
				}else if(this.totalPrice !=0){
					this.status=false;
				}
			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.$cartList[index].checked = !this.$cartList[index].checked
				}
				this.updateTotalPrice();
			},
			//删除数据
			delCart(id) {
				this.$cartList.forEach((item, index) => {
					console.log(id);
					if (id == item.id) {
						this.$cartList.splice(index, 1);
						console.log("进来了");
					}
				})
				this.updateTotalPrice();
				if (this.$cartList.length < 1) {
					this.$emit("refresh")
				}
			},
			//点击去结算生产订单
			createOrder() {
				if (this.totalPrice == 0) {
					this.$msg('请勾选菜品', 1000)
				} else {
					this.$msg('生成订单中', 1000);
					setTimeout(function() {
						this.$jump('/pages/tabs/cart/confirm')
					}.bind(this), 800)
				}
			}
		},
		mounted() {
			this.updateTotalPrice();
			this.$msg('左滑可删除菜品', 1000);
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
		margin-bottom: 120upx;
		/* #endif */
		position: fixed;
		bottom: 0;
		z-index: 95;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 95%;
		height: 100upx;
		background: #f2f2f2;
		border-radius: 279rpx;
		margin-left: 2.5%;

		.total-box {
			display: flex;
			margin-left: 30upx;

			.price-title {
				font-size: 38upx;
				color: black;
			}

			.price-number {
				font-size: 38upx;
				color: $theme-color;
			}

		}

		.confirm-btn {
			width: 207upx;
			height: 100upx;
			line-height: 110upx;
			text-align: center;
			font-size: 32upx;
			background: $theme-color;
			color: #FFFFFF;
			border-top-right-radius: 33px;
			border-bottom-right-radius: 33px;
		}

		.OrderStatus {
			background-color: #5f6368;
		}
	}
</style>
