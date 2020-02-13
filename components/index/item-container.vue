<template>
	<view class="fixed-list">
		<scroll-view class="fixed-scroll" scroll-x="true" scroll-left="120">
			<view v-for='(item,index) in foodsList' :key='index' class="fixed-product2" @click="detail()">
				<image class="fixed-image" :src='item.img'></image>
				<view class="fixed-title">{{item.name}}</view>
				<view class="fixed-subtitle">{{item.explain}}</view>
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
		/* margin-top: 25upx; */
		margin: 20upx 30upx;
	}

	.fixed-scroll {
		white-space: nowrap;
		display: inline-block;
		border-radius: 50%;
	}

	.fixed-product2 {
		width: 333.3upx;
		flex-direction: column;
		border-radius: 20upx;
		background-color: #f2f2f2;
		padding: 10rpx;
		display: inline-block;
		margin-right: 4rpx;
	}

	.fixed-image {
		/* border-top-left-radius: 8upx;
		border-top-right-radius: 8upx; */
		border-radius: 8rpx;
		width: 333.3upx;
		height: 188upx;
		/* margin-bottom: 8upx; */
	}

	.fixed-title {
		color: #1A1A1A;
		font-size: 27upx;
		margin-left: 18upx;
	}

	.fixed-subtitle {
		color: #8d8d8d;
		font-size: 21upx;
		margin-left: 18upx;
		/* margin-bottom: 8.1upx; */
	}
</style>
