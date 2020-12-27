import Vue from  'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 数据源
	state:{
		historyList:uni.getStorageSync('_history')||[]
	},
	mutations:{
		SET_HISTORY_LIST(state,history) {
			state.historyList = history
		},
		CLEAR_HISTORY(state,history){
			state.historyList = []
		}
	},
	actions:{
		set_history({commit,state},history){
			let list = state.historyList
			list.unshift(history)
			uni.setStorageSync('_history',list)
			commit('SET_HISTORY_LIST',list)
		},
		clear_history({commit}){
			uni.setStorageSync('_history',[])
			commit('CLEAR_HISTORY')
		}
	}
})
export default store

 