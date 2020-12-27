<template>
	<view class="navbar">
		<view class="navbar-fiexd" >
			<!-- 状态栏 -->
			<view :style="{height: statusBarHeight+'px'}"></view>
			<!-- 导航栏 -->
			<view class="navbar-content" :class="{search:isSerch}" :style="{height:navbarHigt+'px',width:windowWidth+'px'}" @click.stop="open" >
				<view class="navbar-content_search-icons">
					<uni-icons type="back" size="22" color="#ffffff" @click="banck" v-if="isSerch"></uni-icons>
				</view>
				<view class="navbar-serach" :style="{height: serachHight+ 'px'}" v-if="!isSerch">
					<view class="navbar-serach-icon">
						<uni-icons type="search" size="16" color="#999999"></uni-icons>
					</view>
					<view class="navbar-serach-text"> 
						uni-app,vue
					</view>
				</view>
				<!-- 搜索页显示内容 -->
				<view class="navbar-serach" v-else>
					<input type="text" value="test" v-model="value" placeholder="请输入" @input="inputChange"/>
					
				</view>
				
			</view>
		
			
		</view>
		<!-- 占位 -->
		<view :style="{height:statusBarHeight+navbarHigt+'px'}"></view>
	</view>
</template>

<script>
	export default {
		props:{
			value:{
				type:[String,Number],
				default:''
			},
			isSerch:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			value(newValue) {
				console.log(newValue)
				this.value = newValue
			}
		},
		data() {
			return {
				statusBarHeight:0,
				navbarHigt:45,
				windowWidth:375,
				serachHight:30,
				value:''
			};
		},
		created() {
			// 获取设备信息
			const info = uni.getSystemInfoSync() 
			// statusBarHeight 状态栏的高度
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			 //#ifndef H5 || MP-ALIPAY || APP-PLUS
			// 获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// (胶囊底部高度 - 状态的高度) +(胶囊顶部高度 - 状态栏的内的高度) = 导航栏的高度
			this.navbarHigt = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top -  info.statusBarHeight)
			
			this.windowWidth = menuButtonInfo.left
			this.serachHight = menuButtonInfo.height
			
			// #endif
		},
		methods:{
			open(){
				if (this.isSerch) return 
				console.log(12312)
				uni.navigateTo({
					url:'/pages/home-serche/home-serche'
				})
			},
			inputChange(e){
				const {value} = e.detail
				console.log(value)
				this.$emit('input',value)
			},
			banck(){
				uni.switchTab({
					url:'../../pages/tabbar/index/index'
				})
			}
		}
		
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';
	.navbar{
		.navbar-fiexd{
		
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background: $mk-base-colo;
			.navbar-content{
				display: flex;
				justify-content: center;
				align-items: center;
				height: 45px;
				padding: 0 15px;
				box-sizing: border-box;
				.navbar-serach{
					width: 100%;
					height: 30px;
					border-radius: 30px;
					background-color: #FFFFFF;
					display: flex;
					align-items: center;
					.navbar-serach-icon{
						margin: 10px;
					}
					.navbar-serach-text{
						font-size: 12px;
						color: #999999;
					}
					input{
						width: 100%;
						text-indent: 10px;
						font-size: 14px;
					}
				}
				&.search{
					padding-left: 0;
					
					.navbar-content_search-icons{
						margin: 0 15px;
					}
					.navbar-serach{
						border-radius: 5px;
					}
				}
			}
			
			
		}
		
	}
</style>
