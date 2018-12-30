import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
//引入登录组件
import Login from './views/login.vue'



Vue.use(Router)

export default new Router({
  routes: [
// 配置主页路由
    {
      path: '/home',
      component: Home
    },
 // 配置登录页路由
    {
      path: '/',
      component: Login
    },
// 配置用户添加路由
    {
      path: '/useradd',
      component: () => import(/* webpackChunkName: "UserAdd" */ './views/UserAdd.vue')
    },
// 配置用户管理路由
    {
      path: '/userlist',
      component: () => import(/* webpackChunkName: "UserList" */ './views/UserList.vue')
    },
// 配置密码修改路由
    {
      path: '/useredit',
      component: () => import(/* webpackChunkName: "UserEdit" */ './views/UserEdit.vue')
    },
// 配置分类管理路由
    {
      path: '/classifymanage',
      component: () => import(/* webpackChunkName: "ClassifyManage" */ './views/ClassifyManage.vue')
    },
// 配置添加分类路由
    {
      path: '/addclassify',
      component: () => import(/* webpackChunkName: "AddClassify" */ './views/AddClassify.vue')
    },
// 配置商品管理路由
    {
      path: '/goodsmanage',
      component: () => import(/* webpackChunkName: "GoodsManage" */ './views/GoodsManage.vue')
    },
// 配置添加商品路由
    {
      path: '/addgoods',
      component: () => import(/* webpackChunkName: "AddGoods" */ './views/AddGoods.vue')
    },
// 配置商品商品入库路由
    {
      path: '/stockadd',
      component: () => import(/* webpackChunkName: "StockAdd" */ './views/StockAdd.vue')
    },
// 配置商品退货路由
    {
      path: '/returngoods',
      component: () => import(/* webpackChunkName: "returngoods" */ './views/ReturnGoods.vue')
    },


  ]
})
