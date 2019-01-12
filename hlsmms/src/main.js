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


//构造全局守卫
router.beforeEach((to,from,next)=>{
 // 让ajax携带cookie证书*
  axios.defaults.withCredentials=true;
  //发起ajax到后端路由获取cookie，有cookie就放行，否则去登录页面
  axios.get("http://172.16.4.164:9090/users/getCookie").then(result=>{
    //console.log("验证的结果",result);
    //如果登录成或者是访问的页面时登录页面就放行
    if(result.data.isOk || to.path=="/"){
      next(); //录成功放行
    }
    //否则就跳转到登录页面
    else{
      next("/");
    }
  }).catch(err=>{
    console.error(err.message);
 
});

})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
  