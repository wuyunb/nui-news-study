<template>
	<view class="home">
		<!-- easyCom 自定义导航栏组件-->
		<navbar></navbar>
		<!-- 选项卡组件 -->
		<tab :list="barlist" :swiperIndex='swiperIndex' @tabIndex='tabClick'></tab>
		<!--内容-->
		<view class="home-list">
			<list @swiChange='swiChange' :tabIndex='tabIndex' :tab="barlist"></list>
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				barlist:[],
				swiperIndex:0,
				tabIndex:0
			}
		},
		mounted() {
			this.getLabel()
		},
		methods: {
			getLabel(){
				this.$http({fname:'get_lab'}).then((res)=>{
					const {data} = res
					data.unshift({
						name:'全部',
						current:true
					})
					this.barlist = data
					console.log(data)
					
				})
			},
			swiChange(s){
				this.swiperIndex = s
				
			},
			tabClick(s){
				this.tabIndex = s
			}
		}
	}
</script>

<style lang="scss">
	// 设置滚动样式
	page{
		height: 100%;
		display: flex;
	}
	.home{
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list{
			flex: 1;
			box-sizing: border-box;
			// border: 1px solid red;
		}
	}
	
</style>
