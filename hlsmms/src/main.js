import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 引入公共样式
import './assets/styles/public.css'
//引入axios
import axios from 'axios'
//引入qs处理post传参问题
import qs from 'qs'

//将axios挂载vue原型上，vue的实例中都可以使用
Vue.prototype.axios = axios;
//将qs挂载vue原型上，vue的实例中都可以使用
Vue.prototype.qs = qs;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
