<template>
	<view class="tab">
		<scroll-view scroll-x class="tab-scroll">
			<view class="tab-scroll-box">
				<view class="tab-scroll-item" v-for="(item,index) in list" :key="item._id" :class="{'active': higHeight == index}" @click="tabSwitch(index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-cions" @click="openLabel">
			<uni-icons type="gear" size="26" color="#666666" ></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default:[],	
			},
			swiperIndex:{
				type: Number,
				default:0
			}
		},
		watch:{
			swiperIndex(newVal,oldVal) {
				this.higHeight = newVal
			}
		},
		data() {
			return {
				higHeight:0
			};
		},
		mounted() {
			
		},
		methods:{
			tabSwitch(i) {
				this.higHeight = i
				this.$emit('tabIndex',i)
			},
			openLabel(){
				console.log(12312)
				uni.navigateTo({
					url:'/pages/home-label/home-label'
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab{
		background-color: #FFFFFF;
		border-bottom: 1px solid #f5f5f5;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		.tab-scroll{
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			
			.tab-scroll-box{
				display: flex;
				height: 45px;
				align-items: center;
				flex-wrap: nowrap;
				box-sizing: border-box;
				.tab-scroll-item{
					flex-shrink: 0;  //不让元素挤压
					padding: 0 10px;
					color: #333333;
					font-size: 14px;
					&.active{
						color: $mk-base-colo;
					}
					
				}
			}
		}
		
		.tab-cions{
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 45px;
			&::after{
				content: '';
				position: absolute;
				top:12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #dddddddd;
				
			}
		}
	}
</style>
