<template>
	<swiper class="home-swiper" :current="tabIndex" @change="swipeChange" >
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<listItem :list="listCatchData[index]" :load="load[index]" @loadmore="loadmore"></listItem>
		</swiper-item>
		
	</swiper>
</template>

<script>  
import listItem from './list-item'
	export default { 
		props:{
			tabIndex:{
				type:Number,
				default:0
			},
			tab:{
				type:Array,
				default () {
					return []
				}
			}
		},
		components:{
			listItem
		},
		data() {
			return {
				dataList:[],
				listCatchData:{},
				page:1,
				pageSize:10,
				load:{}
			};
		},
		watch:{
			tab(newVal,oldVal){
				if(newVal.length == 0 ) return
				
				this.getList(this.tabIndex)
			}
		},
		
		mounted() {
			
		},
		methods:{
			swipeChange(e){
				const {current} = e.detail
				this.$emit('swiChange',current)
				// 当数据不存在 或者长度是 0 的情况下去请求数据
				if(!this.listCatchData[current] || this.listCatchData[current].length == 0) {
					this.getList(current)
				}
			},
			getList(current){
				
				if (!this.load[current]) {
					this.load[current] ={
						page:1,
						loading:'loading'
					}
				}
				this.$http({
					fname:'get_lists',
					data:{
						name:this.tab[current].name,
						page:this.load[current].page,
						pageSize:this.pageSize
					} 
				}).then((res)=>{
					if (res.code == 200) {
						const {data} = res
						if (data.length === 0) {
							let oldLoad = {}
							oldLoad.loading = 'noMore'
							oldLoad.page = this.load[current].page
							this.$set(this.load,current,oldLoad)
							this.$forceUpdate()
							return
						}
						console.log(1312,data)
						let oldList = this.listCatchData[current] || []
						oldList.push(...data)
						this.$set(this.listCatchData,current,oldList)
					}
				})
			},
			loadmore(){
				this.load[this.tabIndex].page ++
				this.getList(this.tabIndex)
				if (this.load[this.tabIndex].loading === 'noMore') return
				
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;
		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
