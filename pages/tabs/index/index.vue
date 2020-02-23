<template>
	<view>
		<WarningBox v-model="show" title='警告 ' text='请联系服务员' :noCancel="true" :noOk="true" />
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color="#00d8a0">
			<swiper-item v-for='(item,index) in bannerList' :key='index'>
				<a :href="item.url">
					<image class="swiper-image" :src="item.img"></image>
				</a>
			</swiper-item>
		</swiper>

		<uni-notice-bar scrollable="true" single="true" text="[公告] 小店新近开张,欢迎各位亲友们光临,本店不为冲量,只为品质和服务.本店东西不多,但却样样精品,质量有保证,售后服务更用心!(^_^)"></uni-notice-bar>
		<!-- 推荐位 -->
		<item-container :place='2'></item-container>

		<!-- 下面是分类部分 -->
		<view class="list_box">
			<view class="left">
				<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
					<view class="item" v-for="(item,index) in typeList" :data-id="item.id" :key="index" :class="{ 'active':index==leftIndex }"
					 :data-index="index" @tap="leftTap">{{item.name}}</view>
				</scroll-view>
			</view>
			<view class="main">
				<!-- current：当前所在滑块的index  vertical：滑块方向是否为纵向 duration：滑动动画时长-->
				<swiper class="swiper" :style="{ 'height':scrollHeight }" :current="leftIndex" @change="swiperChange" vertical="true"
				 duration="300">
					<!-- 遍历菜品分类 -->
					<swiper-item v-for="(item,index) in typeList" :key="index">
						<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
							<view class="item">
								<view class="title">
									<view>{{item.name}}</view>
								</view>
								<!-- 遍历菜品 -->
								<view class="goods" v-for="(item,index) in foodsList" :key="index">
									<image :src="item.img" />
									<view>
										<view class="name">{{item.name}}</view>
										<view class="describe">{{item.explain}}</view>
										<!-- <view>{{number}}</view> -->
										<view class="sales_volume">销量:{{item.sales_volume}}</view>
										<view class="money"> ￥{{item.price}}</view>
									</view>
									<image class="add_img" src="../../../static/type/add.png" @click="add_cart(item)"></image>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import itemContainer from '@/components/index/item-container.vue'
	import uniNoticeBar from '@/components/tonggaolan/uni-notice-bar/uni-notice-bar.vue'
	import WarningBox from '@/components/warning-box/warning-box'

	export default {
		components: {
			itemContainer,
			uniNoticeBar,
			WarningBox
		},
		data() {
			return {
				bannerList: [],
				typeList: [],
				foodsList: [],
				scrollHeight: '500px',
				leftIndex: 0,
				show: false
			}
		},
		onLoad(option) {
			//如果url中包含desk_id,则设置
			//如果url中不包含desk_id,则看localStorage中是否有desk_id,如果有,不做处理,如果没有,跳到错误页面
			if (option.desk_id == undefined) {
				if (localStorage.getItem("desk_id") == null) {
					this.show = true;
				}
			} else {
				localStorage.setItem("desk_id", option.desk_id);
			}
			console.log("桌号是:", localStorage.getItem("desk_id"));
			/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = `${res.windowHeight}px`;
				}
			});
			// console.log(this.$apiPath);
			uni.request({
				//轮播图接口
				url: this.$apiPath + "?c=banner&a=index",
				dataType: 'json',
				success: (res) => {
					if (res.data.error == 0){
						// console.log(res.data);
					this.bannerList = res.data.data;
					}else{
						console.log(res.data.msg)
						}
					}
				}),
			uni.request({
				//分类接口
				url: this.$apiPath + "?c=type&a=index",
				dataType: 'json',
				success: (res) => {
					if(res.data.error == 0){
						this.typeList = res.data.data;
					// console.log(res.data.data[0].id)
					this.getFoodsList(res.data.data[0].id);
					}else{
						console.log(res.data.msg)
						}
					}
				})
		},

		methods: {
			/* 左侧导航点击 */
			leftTap(e) {
				// let index = e.currentTarget.dataset.index;
				let index = e.currentTarget.dataset.index;
				this.leftIndex = Number(index);
				this.getFoodsList(e.currentTarget.dataset.id);
				console.log(e.currentTarget.dataset.id);
			},
			/* 轮播图切换 */
			swiperChange(e) {
				this.getFoodsList(this.typeList[e.detail.current].id);
				let index = e.detail.current;
				this.leftIndex = Number(index);
			},
			getFoodsList(typeId) {
				uni.request({
					//菜品接口
					url: this.$apiPath + "?c=food&a=index",
					data: {
						type_id: typeId
					},
					success: (res) => {
						if(res.data.error == 0){
						this.foodsList = res.data.data;
						}else{
						console.log(res.data.msg)
						}
					}
				})
			},
			//添加到购物车
			add_cart(item) {
				//查询购物车中是否包含此菜品
				//如果不包含,直接加入
				//如果包含,此菜品数量+1
				for (var i = 0; i < this.$cartList.length; i++) {
					if (this.$cartList[i].id == item.id) {
						//循环遍历,如果在列表中发现此菜品,则直接返回,余下的菜品无需遍历
						console.log("购物车中已经存在");
						this.$cartList[i].number += 1;
						this.$msg(item.name + '数量:' + this.$cartList[i].number);
						// this.$cartList.reverse()
						this.$cartList.splice(i, 1, this.$cartList[i])
						return false;
					}
				}
				item.number = 1;
				item.checked = true;
				this.$cartList.push(item)
				this.$msg('已加入购物车');
				console.log(this.$cartList)
			}
		},
		onShow() {
			if (this.typeList.length > 0) {
				this.getFoodsList(this.typeList[this.leftIndex].id)
			}
		}
	}
</script>

<style lang="scss">
	page {
		// background: #f2f2f2;
	}

	swiper {
		height: 300rpx;

		.swiper-image {
			height: 300rpx;
			width: 690rpx;
			margin: 20rpx 30rpx 10rpx 30rpx;
			border-radius: 15rpx;
		}
	}

	,
	// 下面是分类部分的样式
	.list_box {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		font-size: 28rpx;
		margin-right: 30rpx;
		border-radius: 15rpx;

		.left {
			width: 176rpx;
			color: #888888;
			background-color: #f6f6f6;
			line-height: 97rpx;
			box-sizing: border-box;
			font-size: 29rpx;
			margin-left: 28rpx;

			.item {
				padding-left: 20rpx;
				position: relative;

				&:not(:first-child) {
					margin-top: 1px;

					&::after {
						content: '';
						display: block;
						height: 0;
						border-top: #d6d6d6 solid 1px;
						width: 620rpx;
						position: absolute;
						top: -1px;
						right: 0;
						transform: scaleY(0.5);
						/* 1px像素 */
					}
				}

				&.active,
				&:active {
					color: #00d8a0;
					background-color: #fff;
				}
			}
		}

		.main {
			background-color: #fff;
			padding-left: 20rpx;
			width: 0;
			flex-grow: 1;
			box-sizing: border-box;

			.swiper {
				height: 500px;
			}

			.title {
				line-height: 64rpx;
				font-size: 24rpx;
				font-weight: bold;
				color: #666;
				background-color: #fff;
				position: sticky;
				top: 0;
				z-index: 999;
			}

			.item {
				padding-bottom: 10rpx;
			}

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
					width: 150rpx;
					height: 150rpx;
					margin-right: 16rpx;
					border-radius: 20rpx;
				}

				.name {
					font-size: 32rpx;
					position: absolute;
					font-weight: 700;
					top: 5rpx;
				}

				.describe {
					font-size: 24rpx;
					color: #999;
					position: absolute;
					top: 48rpx;
				}

				.sales_volume {
					font-size: 22rpx;
					color: #999;
					position: absolute;
					bottom: 18rpx;
				}

				.money {
					font-size: 30rpx;
					color: #efba21;
					position: absolute;
					right: 135rpx;
					bottom: 13rpx;
				}

				.add_img {
					width: 50rpx;
					height: 50rpx;
					position: absolute;
					right: 27rpx;
					bottom: 63rpx;
				}
				.add_img:active {
					transform: translate(4rpx, 4rpx);
				}
			}
		}
	}
</style>
