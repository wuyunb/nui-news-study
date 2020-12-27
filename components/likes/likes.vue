<template>
	<view class="icons" @click.stop="updataLikes">
		<uni-icons :type="likeType?'heart-filled': 'heart' " size="20" color="#f07373"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				likeType:false
			};
		},
		watch:{
			item(newValue) {
				this.likeType = this.item.is_like
			}
		},
		created() {
			this.likeType = this.item.is_like
		},
		
		methods:{
			updataLikes(){
				let that = this
				this.likeType = !this.likeType
				uni.showLoading()
				this.$http({
					fname:'upadta_like',
					data:{
						'article_id':that.item._id
					}
				}).then((res)=>{
					uni.hideLoading()
					uni.showToast({
						title:this.likeType?'收藏成功':'取消收藏',
						icon:'none'
					})
					console.log(res)
				}).catch(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>
