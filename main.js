import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import http from 'common/js/http.js'
import store from 'store'
App.mpType = 'app'
Vue.prototype.$http = http
const app = new Vue({
	store,
    ...App
})
app.$mount()
