 <template>
		<view class="scroll" >
			<!-- @scrolltolower 滚动到底部/右边 触发 -->
			<scroll-view scroll-y class="list-scroll"  @scrolltolower="loadmore">
				<view>
					<slot></slot>
				</view>
			</scroll-view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			loadmore() {
				this.$emit('loadmore')
			}
		}
		
		
		
	}
</script>

<style lang="scss">

	.scroll{
		flex: 1;
		overflow: hidden;
		height: 100%;
		box-sizing: border-box;
		.list-scroll{
			height: 100%;
			display: flex;
			flex-direction: column;   // 垂直排列
		}
	}
</style>
