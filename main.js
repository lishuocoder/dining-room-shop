import Vue from 'vue'
import App from './App'

import store from './store'
import util from './common/util.js'



Vue.prototype.$apiPath=util.apiPath
Vue.prototype.$get=util.get
Vue.prototype.$prePage=util.prePage
Vue.prototype.$msg=util.msg
Vue.prototype.$jump=util.jump
Vue.prototype.$isLogin=util.isLogin

Vue.prototype.$store=store

Vue.prototype.$cartList = []

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
