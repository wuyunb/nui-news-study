<template>
	<view class="home">
		<navbar :isSerch="true" v-model="value" @input="inputChange"></navbar>
		<view class="home-list">
			<view class="label-box" v-if="is_history">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<view class="label-content" v-if="historyList.length > 0">
					<view class="label-content-item" v-for="(item,index) in historyList" :key="index" @click="openHistory(item)">
						{{item}}
					</view>
					
				</view>
				<view class="data-none" v-else>
						暂无搜索内容
				</view>
			</view>
			<list-scroll class="list-scroll" v-else>
				<list-card :listCon="item" v-for="(item,index) in searchList" :key="index "  @clicks="searchClick"></list-card>
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				value:'',
				is_history:true ,
				searchList:[]
			}
		},
		computed:{
			...mapState(['historyList'])
		},
		mounted() {
		// this.getList()	
		},
		methods: {
			inputChange(v){
				
				if(!v) {
					clearTimeout(this.timer)
					this.make = false
					this.getEarch()
					return 
				}
				if (!this.make) {
					this.make = true
					this.timer = setTimeout(()=>{
						this.getEarch (v)
						this.make = false
					},1000)
				}
				console.log(123,v)
			},
			getEarch(value){
				if (!value){
					this.searchList = []
					this.is_history = true
					return 
				}
				this.is_history = false
				this.$http({
					fname:'get_search',
					data:{
						value
					} 
				}).then((res)=>{
					if (res.code == 200) {
						const {data} = res
						if (data.length > 0) {
							this.searchList = data 
							 
						} else {
							this.is_history = true
						}
						console.log(data)
						
					}
				})
			},
			searchClick(){
				console.log(12312)
				this.$store.dispatch('set_history',this.value )
			},
			openHistory(item){
				this.value = item
				this.getEarch(item)
			},
			clear(){
				this.$store.dispatch('clear_history')
				uni.showToast({
					title:'清空完成'
				})
			}
		}
	}
</script>

<style lang="scss">
 page{
	 height: 100%;
	 display: flex;
	 background: #f5f5f5;
 }
 .home{
	 display: flex;
	 flex-direction: column;
	 flex: 1;
	 .label-box{
		 background-color: #FFFFFF;
		 margin-bottom: 10px;
		 .label-header{
			 display: flex;
			 justify-content: space-between;
			 font-size: 14px;
			 padding: 10px 15px;
			 border-bottom: 1px solid #f5f5f5;
			 .label-title{
				 color: $mk-base-colo;
			 }
			 .label-clear{
				 color: #30b33a;
				 font-weight: bold;
			 }
			 
		 }
		 .label-content{
		 	display: flex;
		 	flex-wrap: wrap;
		 	padding: 14px;
		 	padding-top: 0;
		 	.label-content-item{
				padding: 2px 10px;
				margin-top: 12px;
				margin-right: 10px;
				border-radius: 5px;
				border: 1px solid #666666;
				font-size: 14px;
			}
		}
		.data-none{
			height: 200px;
			line-height: 200px;
			text-align: center;
		}
	 }
	 
 }
</style>
