<template>
	<view class="fixed-list">
		<scroll-view class="fixed-scroll" scroll-x="true" scroll-left="120">
			<view v-for='(item,index) in foodsList' :key='index' class="fixed-product2">
				<image class="fixed-image" :src='item.img' @click="detail()"></image>
				<view class="fixed-title">{{item.name}}</view>
				<view class="fixed-subtitle">{{item.explain}}</view>
				<image class="add_img" src="../../../static/type/add.png" @tap="addCart(item,$event)" ></image>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				foodsList: []
			}
		},
		name: 'item-container',
		props: {
			place: null
		},
		methods: {
			detail() {
				this.$msg('还未开发,敬请期待');
				console.log("点了推荐位");
			},
			addCart(item,$event){
				this.$emit('add',item, $event)
			}
		},
		mounted() {
			//推荐位接口
			uni.request({
				url: this.$apiPath+"?c=recommend&a=index",
				data: {
					place: this.place
				},
				success: (res) => {
					this.foodsList = res.data.data;
					// console.log(res.data);
				}
			})
		}
	}
</script>
<style>
	.fixed-list {
		/* display: flex; */
		/* justify-content: space-between; */
		/* flex-wrap: wrap; */
		/* margin-top: 25rpx; */
		margin: 20rpx 30rpx;
	}

	.fixed-scroll {
		white-space: nowrap;
		display: inline-block;
		border-radius: 50%;
		
	}

	.fixed-product2 {
		width: 333.3rpx;
		flex-direction: column;
		border-radius: 20rpx;
		background-color: #f2f2f2;
		padding: 10rpx;
		display: inline-block;
		margin-right: 4rpx;
		position: relative;
	}

	.fixed-image {
		/* border-top-left-radius: 8rpx;
		border-top-right-radius: 8rpx; */
		border-radius: 8rpx;
		width: 333.3rpx;
		height: 188rpx;
		/* margin-bottom: 8rpx; */
	}

	.fixed-title {
		color: #1A1A1A;
		font-size: 27rpx;
		margin-left: 18rpx;
	}

	.fixed-subtitle {
		color: #8d8d8d;
		font-size: 21rpx;
		margin-left: 18rpx;
		/* margin-bottom: 8.1rpx; */
	}
	.add_img {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		right: 20rpx;
		bottom: 15rpx;
	}
	.add_img:active {
		transform: translate(4rpx, 4rpx);
	}
</style>
