<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editClick">{{edit?'完成':'编辑'}}</view>
			</view>

			<view class="label-content" v-if="labelList.length > 0">
				<view class="label-content_item" v-for="(item,index) in labelList" :key="item._id">
					{{item.name}}
					<uni-icons v-if="edit" class="closEnd" type="clear" size="15" color="red" @click="dele(index)"></uni-icons>
				</view>
			</view>
			<view class="no-data" v-else>
				暂无数据
			</view>
			<view class="label-header">
				<view class="label-title">其他标签</view>
				
			</view>

			<view class="label-content" v-if="list.length>0">
			   <view class="label-content" v-if="edit">
					<view class="label-content_item" v-for="(item,index) in list" :key="item._id" @click="add(index)">
						{{item.name}}
					</view>
			   </view>
			   <view class="label-content" v-else>
			   		<view class="label-content_item" v-for="(item,index) in list" :key="item._id" >
			   			{{item.name}}
					</view>
			   </view>
				
			</view>
			<view class="no-data" v-else>
				暂无数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				edit:false,
				labelList:[],
				list:[]
			}
		},
		created(){
			this.getLabel()
		},
		methods: {
			// 获取标签数据
			getLabel(){
				this.$http({
				fname:'get_lab',
				data:{
					type:'all'
				}
				}).then((res)=>{
					const {data} = res
					// 我的标签页面
					this.labelList = data.filter(item=>item.current)
					//其他标签
					this.list = data.filter(item=>!item.current)
					console.log(this.labelList)
				})	
			},
			// 删除标签 （将我的标签删除并添加到其他标签）
			dele(index){
				this.list.push(this.labelList[index])
				this.labelList.splice(index,1)
			},
			add(index){
				console.log(123123,index)
				this.labelList.push(this.list[index])
				this.list.splice(index,1)
			},
			editClick(){
				let newLabelid = []
				newLabelid = this.labelList.map(item=>item._id)
				console.log(newLabelid)
				if (this.edit) {
					this.edit = false
					this.$http({
						fname:'upload_label',
						data:{
							label:newLabelid
						}
					}).then(res=>{
						
					})
				} else {
					this.edit = true
				}
				
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5f5;
		
	}
	.label{
		.label-box{
			background-color: #FFFFFF;
			margin-bottom: 10px;
			.label-header{
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666666;
				padding: 10px 15px;
				border: 1px solid #f5f5f5;
				.label-edit{
					color: #20b33a;
					font-weight: bold;
				}
			}
			.label-content{
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				.label-content_item{
					position: relative;
					font-size: 14px;
					padding: 2px 5px;
					margin: 12px 10px 0 0 ;
					border: 1px solid #f5f5f5;
					border-radius: 5px;
					.closEnd{
						position: absolute;
						right: -5px;
						top: -5px;
					}
				}
				
			}
		}
		.no-data{
			height: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			
		}
	}
</style>
