<template>
	<list-scroll class="list-scroll" @loadmore="loadmore">
		<list-card mode="base" :listCon="item" v-for="(item,index) in list" :key="index "></list-card>
		<uni-load-more iconType="snow" v-if="list.length == 0 || list.length > 7" :status="load.loading"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			},
			load:{
				type:Object,
				default(){
					return {
						loading:'loading'
					}
				}
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			loadmore(){
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
