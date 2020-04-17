<template>
	<view>
		<view class="container">
				<image src="../../static/index/activity/two/bg.jpg" class="imgStyle" alt="">
				<image src="../../static/index/activity/two/1.png" class="img1" alt="">
				<image src="../../static/index/activity/two/2.png" class="img2" alt="">
				<image src="../../static/index/activity/two/3.png" class="img3" alt="">
				<image src="../../static/index/activity/two/4.png" class="img4" alt="">
				<image src="../../static/index/activity/two/5.png" class="img5" alt="">
				<image src="../../static/index/activity/two/6.png" class="img6" alt="">
				<image src="../../static/index/activity/two/7.png" class="img7" alt="">
				<image src="../../static/index/activity/two/8.png" class="img8" alt="">
				<view clsss="bg"></view>
				<view class="popup">
					<image src="" class="imgStyle" >
					<image src="" class="imgStyle" onclick="openHtml(event);" >
					<image src="../../static/index/activity/two/close.png" alt="" class="close"></view>
				<text class="pos1"> <i class="circle_bot"></i> <i class="circle_mid"></i>
				</text>
				<text class="pos2">
					<i class="circle_bot"></i>
					<i class="circle_mid"></i>
				</text>
				<text class="pos3">
					<i class="circle_bot"></i>
					<i class="circle_mid"></i>
				</text>
				<text class="pos4">
					<i class="circle_bot"></i>
					<i class="circle_mid"></i>
				</text>
				<text class="pos5">
					<i class="circle_bot"></i>
					<i class="circle_mid"></i>
				</text>
				<text class="pos6">
					<i class="circle_bot"></i>
					<i class="circle_mid"></i>
				</text>
				<text class="pos7">
					<i class="circle_bot"></i>
					<i class="circle_mid"></i>
				</text>
				<text class="pos8">
					<i class="circle_bot"></i>
					<i class="circle_mid"></i>
				</text>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	i {
	  font-style: normal;
	}

	page {
	}
	.container {
	  margin: auto;
	  width: 100%;
	  height: 630px;
	  position: relative;
	}
	.imgStyle {
	  display: block;
	  width: 100%;
	  border: none;
	  height: 100%;
	}
	.img1, .img2, .img3, .img4, .img5, .img6, .img7, .img8 {
	  width: 53px;
	  height: 53px;
	  position: absolute;
	}
	.img1 {
	  left: 35%;
	  top: 18%;
	}
	.img2 {
	  left: 57%;
	  top: 32%;
	}
	.img3 {
	  left: 37%;
	  top: 50%;
	}
	.img4 {
	  left: 60%;
	  top: 54%;
	}
	.img5 {
	  left: 69%;
	  top: 49%;
	}
	.img6 {
	  left: 73%;
	  top: 60%;
	}
	.img7 {
	  left: 65%;
	  top: 64%;
	}
	.img8 {
	  left: 14%;
	  top: 69%;
	}
	.bg {
	  display: none;
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: #000;
	  z-index: 99;
	  opacity: 0.7;
	  filter: alpha(opacity=70);
	}
	.popup {
	  display: none;
	  width: 90%;
	  position: fixed;
	  top: 6%;
	  left: 5%;
	  z-index: 999;
	}
	.close {
	  position: fixed;
	  top: 2%;
	  right: 5%;
	  display: block;
	  width: 5%;
	  z-index: 99;
	}
	.circle_bot {
	  display: block;
	  background-color: #B47812;
	  width: 30px;
	  height: 30px;
	  margin: 0px 0 0 0px;
	  border-radius: 50%;
	  -webkit-animation: warn 2s ease-out;
	  -moz-animation: warn 2s ease-out;
	  animation: warn 2s ease-out;
	  -webkit-animation-iteration-count: infinite;
	  -moz-animation-iteration-count: infinite;
	  animation-iteration-count: infinite;
	}
	.circle_mid {
	  display: block;
	  background-color: #B47812;
	  width: 6px;
	  height: 6px;
	  margin: -18px 0 0 12px;
	  border-radius: 50%;
	}
	text {
	  position: absolute;
	}
	.pos1 {
	  top: 20%;
	  left: 43%;
	}
	.pos2 {
	  top: 32%;
	  left: 66%;
	}
	.pos3 {
	  top: 49%;
	  left: 44%;
	}
	.pos4 {
	  top: 59%;
	  left: 56%;
	}
	.pos5 {
	  top: 49%;
	  left: 78%;
	}
	.pos6 {
	  top: 65%;
	  left: 80%;
	}
	.pos7 {
	  top: 69%;
	  left: 62%;
	}
	.pos8 {
	  top: 68%;
	  left: 22%;
	}
	@-webkit-keyframes warn {
	  0% {
	    transform: scale(0);
	    opacity: 0.8;
	  }
	  100% {
	    transform: scale(1);
	    opacity: 0.0;
	  }
	}
	@-o-keyframes warn {
	  0% {
	    transform: scale(0);
	    opacity: 0.8;
	  }
	  100% {
	    transform: scale(1);
	    opacity: 0.0;
	  }
	}
	@-moz-keyframes warn {
	  0% {
	    transform: scale(0);
	    opacity: 0.8;
	  }
	  100% {
	    transform: scale(1);
	    opacity: 0.0;
	  }
	}
	@keyframes warn {
	  0% {
	    transform: scale(0);
	    opacity: 0.8;
	  }
	  100% {
	    transform: scale(1);
	    opacity: 0.0;
	  }
	}
</style>
