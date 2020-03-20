<template>
	<view class="container">
		<empty v-if='this.$cartList.length===0'></empty>
		<cart-item ref='cart' v-if="showList" @refresh="refresh"></cart-item>
	</view>
</template>

<script>
	import empty from '@/components/cart/empty.vue'
	import cartItem from '@/components/cart/cart-item.vue'
	export default {
		components: {
			empty,
			cartItem
		},
		data() {
			return {
				showList: true
			}
		},
		onLoad() {
			/* 购物车角标  还没实现,先放下
			uni.setTabBarBadge({
				index: 1,
				// text: localStorage.getItem("cartNums")
				text:localStorage.getItem("cartNums")
			}),
			this.$cartList.forEach((item) => {
				console.log(item.number);
				this.$cartNum = this.$cartNum * 1 + item.number;
				// localStorage.setItem("cartNums", this.$cartNum);
				console.log(this.$cartNum)
			})*/
		},
		methods: {
			refresh() {
				if (this.$cartList.length < 1) {
					this.showList = false;
				}
				this.$forceUpdate()
			}
		},
		onShow() {
			console.log('456666', this.$cartList)
			this.$forceUpdate() //强制刷新组件
			if (this.$cartList.length > 0) {
				this.showList = false
				this.$nextTick(() => {
					this.showList = true
				})
			} else {
				this.showList = false
			}
		}
	}
</script>

<style lang='scss'>
	.container {
		padding-bottom: 134upx;
	}
</style>
