<template>
	<view>
		<!-- 基础卡片 -->
			<view class="listcard" v-if="listCon.mode === 'base'" @click="open">
			<view class="listcard-image">
				<image :src="listCon.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content__title">
					<text>{{listCon.title}}</text>
					<likes :item='listCon' />
				</view>
				<view class="list-card-content__des">
					<view class="list-card-content__des-leabe">
						<view class="list-card-content__des-leabe-item">
								{{listCon.classify}}
						</view>
						
					</view>
					<view class="list-card-content__des-browe">
						{{listCon.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 多图卡片 -->
		<view class="listcard mode-column" v-if="listCon.mode === 'column'" @click="open">
	 	<view class="list-card-content">
	 		<view class="list-card-content__title">
	 			<text>{{listCon.title}}</text>
				<likes  :item='listCon'/>
	 		</view>
			<view class="listcard-image">
				<view class="listcard-image__image-item" v-for="(item,index) in listCon.cover" :key="index"  v-if="index<3">
					<image :src="item" mode="aspectFill"></image>
				</view>
			</view>
	 		<view class="list-card-content__des">
	 			<view class="list-card-content__des-leabe">
	 				<view class="list-card-content__des-leabe-item">
	 						{{listCon.classify}}
	 				</view>
	 				
	 			</view>
	 			<view class="list-card-content__des-browe">
	 				{{listCon.browse_count}}浏览
	 			</view>
	 		</view>
	 	</view>
	 </view>
		<!-- 大图 -->
		<view class="listcard mode-image" v-if="listCon.mode === 'image'" @click="open">
			<view class="listcard-image">
					<image :src="listCon.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content__title">
					<text>{{listCon.title}}</text>
					<likes  :item='listCon'/>
				</view>
				<view class="list-card-content__des">
					<view class="list-card-content__des-leabe">
						<view class="list-card-content__des-leabe-item">
							{{listCon.classify}}
						</view>

					</view>
					<view class="list-card-content__des-browe">
						{{listCon.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import likes from '../likes/likes.vue'
	export default {
		props:{
			
			listCon:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		comments:{
			likes
		},
		data() {
			return {

			};
		},
		methods:{
			open(){
				console.log('00')
				this.$emit('clicks',this.listCon)
			}
		}
	}
</script>

<style lang="scss">
	.listcard {
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		box-sizing: border-box;

		.listcard-image {
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.list-card-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;

			.list-card-content__title {
				position: relative;
				font-size: 14px;
				color: #333333;
				line-height: 1.2;
				font-weight: 400;
				overflow: hidden;
				// padding-right: 30px;
				display: flex;
				justify-content: space-between;
				text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				
				// .icons {
				// 	position: absolute;
				// 	right: 0;
				// 	top: 0;
				// 	display: flex;
				// 	justify-content: center;
				// 	align-items: center;
				// 	width: 20px;
				// 	height: 20px;
				// }
			}

			.list-card-content__des {
				display: flex;
				justify-content: space-between; //  左右两边对其
				font-size: 12px;
				margin-top: 10px;

				.list-card-content__des-leabe {
					display: flex;
					.list-card-content__des-leabe-item {
						padding: 0 5px;
						border-radius: 15px;
						color: $mk-base-colo;
						border: 1px solid $mk-base-colo;
					}
				}
				.list-card-content__des-browe {
					color: #999999;
					line-height: 1.5;
				}
			}
		}

		&.mode-column {
			.list-card-content {
				width: 100%;
				padding: 0;
			}

			.listcard-image {
				display: flex;
				margin-top: 10px;
				width: 100%;
				height: 70px;

				.listcard-image__image-item {
					margin-left: 10px;
					width: 100%;
					border-radius: 5px;
					overflow: hidden;

					&:first-child {
						margin-left: 0;
					}

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		&.mode-image{
			flex-direction: column;
			.listcard-image{
				width: 100%;
				height: 100px;
			}
			.list-card-content{
				padding-left: 0;
				margin-top: 10px;
				.list-card-content__des{
					display: flex;
					align-items: center;
					margin-top: 10px;
				}
			}
		}
	}
</style>
