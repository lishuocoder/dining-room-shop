<template>
	<view>
		<view class="popup" catchtouchmove="true" :class="specClass" >
			<view class="mask"></view>
			<view class="layer attr-content">
				<view class="specification-wrapper">
					<scroll-view class="specification-wrapper-content" scroll-y="true">
						<view class="specification-header">
							<view class="specification-left"><image class="product-img" :src="food.img"></image></view>
							<view class="specification-right">
								<view class="price-content">
									<text class="price" style="color: #1A1A1A;">{{food.name}}</text>
								</view>
								<view class="price-content">
									<text class="sign">¥</text>
									<text class="price">{{food.price}}</text>
								</view>
								<view class="inventory">销量:{{food.sales_volume}}</view>
								<view class="choose">{{food.explain}}</view>
							</view>
						</view>
						<view class="specification-content">
							<view class="specification-item" >
								<view class="item-title">说明</view>
								<view class="item-wrapper">
									<view class="item-content">
										{{food.content}}
									</view>
								</view>
							</view>
						
						</view>
					</scroll-view>
					<view class="close" @tap="closeXq()"><image class="close-item" src="../../../static/index/close.png"></image></view>
				</view>
				<view class="btn-wrapper"><button class="sure" @tap="addCart(food,$event)">加入购物车</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			specClass: {
				type: String
		},
		food:{
			type:Object
		}
		},
		methods:{
			closeXq() {
				this.$emit('close');
			},
			addCart(food,$event){
				this.$emit('add',food, $event)
			},
		},
		mounted(){
				console.log(this.food)
			
		}
	}
</script>

<style lang="less">
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		overflow: hidden;
	
		&.show {
			display: block;
	
			.mask {
				animation: showPopup 0.2s linear both;
			}
	
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
	
		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}
	
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
	
		&.none {
			display: none;
		}
	
		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.3);
		}
	
		.layer {
			display: flex;
			width: 100%;
			// height: 1014rpx;
			flex-direction: column;
			// min-height: 40vh;
			// max-height: 1014rpx;
			position: fixed;
			z-index: 99;
			bottom: 0;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
	
			.specification-wrapper {
				width: 100%;
				padding: 30rpx 25rpx;
				box-sizing: border-box;
				.specification-wrapper-content {
					width: 100%;
					max-height: 900rpx;
					min-height: 600rpx;
					&::-webkit-scrollbar {
						/*隐藏滚轮*/
						display: none;
					}
	
					.specification-header {
						width: 100%;
						display: flex;
						flex-direction: row;
						position: relative;
						margin-bottom: 40rpx;
	
						.specification-left {
							width: 180rpx;
							height: 180rpx;
							flex: 0 0 180rpx;
	
							.product-img {
								width: 180rpx;
								height: 180rpx;
								background-color: #999999;
							}
						}
	
						.specification-right {
							flex: 1;
							padding: 0 35rpx 0 28rpx;
							box-sizing: border-box;
							display: flex;
							flex-direction: column;
							justify-content: flex-end;
							font-weight: 500;
	
							.price-content {
								color: #fe3a3a;
								margin-bottom: 20rpx;
	
								.sign {
									font-size: 28rpx;
								}
	
								.price {
									font-size: 48rpx;
								}
							}
	
							.inventory {
								font-size: 24rpx;
								color: #999999;
								margin-bottom: 14rpx;
							}
	
							.choose {
								font-size: 28rpx;
								color: #333333;
							}
						}
					}
	
					.specification-content {
						font-weight: 500;
	
						.specification-item {
							margin-bottom: 40rpx;
	
							&:last-child {
								margin-bottom: 0;
							}
	
							.item-title {
								margin-bottom: 20rpx;
								font-size: 28rpx;
								color: #999999;
							}
	
							.item-wrapper {
								display: flex;
								flex-direction: row;
								flex-flow: wrap;
	
								.item-content {
									display: inline-block;
									padding: 15rpx 35rpx;
									border-radius: 10rpx;
									background-color: #ffffff;
									color: #333333;
									font-size: 28rpx;
									margin-right: 20rpx;
									border: 2rpx solid #f4f4f4;
									box-sizing: border-box;
	
									&.actived {
										border-color: #fe3a3a;
										color: #fe3a3a;
									}
	
									&.noactived {
										background-color: #f4f4f4;
										border-color: #f4f4f4;
									}
								}
							}
						}
					}
				}
				.close {
					position: absolute;
					top: 30rpx;
					right: 25rpx;
					width: 50rpx;
					height: 50rpx;
					text-align: center;
					line-height: 50rpx;
					.close-item {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}
	
			.btn-wrapper {
				display: flex;
				width: 100%;
				height: 120rpx;
				flex: 0 0 120rpx;
				align-items: center;
				justify-content: space-between;
				padding: 0 26rpx;
				box-sizing: border-box;
	
				.layer-btn {
					width: 335rpx;
					height: 76rpx;
					border-radius: 38rpx;
					color: #fff;
					line-height: 76rpx;
					text-align: center;
					font-weight: 500;
					font-size: 28rpx;
	
					&.add-cart {
						background: #ffbe46;
					}
	
					&.buy {
						background: #fe3a3a;
					}
				}
				.sure {
					width: 698rpx;
					height: 76rpx;
					border-radius: 38rpx;
					color: #fff;
					line-height: 76rpx;
					text-align: center;
					font-weight: 500;
					font-size: 28rpx;
					background: #fe3a3a;
				}
			}
		}
	
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
	
			100% {
				opacity: 1;
			}
		}
	
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
	
			100% {
				opacity: 0;
			}
		}
	
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
	
			100% {
				transform: translateY(0%);
			}
		}
	
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
	
			100% {
				transform: translateY(120%);
			}
		}
	}
</style>
