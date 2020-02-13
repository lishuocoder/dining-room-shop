<template>
	<view>
		<empty v-if='list.length===0'></empty>
		<order-done :list='list' :order_time='order_time' :total_price='total_price' v-if='list.length>0'></order-done>
	</view>
</template>

<script>
	import empty from '@/components/order/empty.vue'
	import orderDone from '@/components/order/order-done.vue'

	export default {
		components: {
			empty,
			orderDone
		},
		data() {
			return {
				list: [],
				order_time:111,
				total_price:0
			}
		},
		methods: {
			getOrder() {
				//订单接口
				uni.request({
					url: this.$apiPath+"?c=order&a=index",
					dataType: 'json',
					data: {
						desk_id: localStorage.getItem("desk_id")
					},
					success: (res) => {
						if(res.data.data!=null){
						this.list = res.data.data.order.order_detail,
						this.order_time= res.data.data.order.start_time,
						this.total_price= res.data.data.order.price
						}
					}
				})
			}
		},
		onNavigationBarButtonTap() {
			this.$jump('/pages/about/about')
		},
		onShow() {
			this.getOrder();
		}
	}
</script>

<style>
</style>
