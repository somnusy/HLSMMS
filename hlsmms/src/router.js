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
      path: '/pwdedit',
      component: () => import(/* webpackChunkName: "PwdEdit" */ './views/PwdEdit.vue')
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
// 配置添加入库路由
    {
      path: '/stockadd',
      component: () => import(/* webpackChunkName: "StockAdd" */ './views/StockAdd.vue')
    },

// 配置库存管理路由
    {
      path: '/stockmanage',
      component: () => import(/* webpackChunkName: "StockManage" */ './views/StockManage.vue')
    },
// 配置销售列表路由
    {path: '/saleslist',component: () => import(/* webpackChunkName: "SalesList" */ './views/SalesList.vue') },
    
    
    // 配置商品出库路由
        {path: '/outgoods',component: () => import(/* webpackChunkName: "OutGoods" */ './views/OutGoods.vue') },
   

// 配置商品退货路由
    { path: '/returngoods',component: () => import(/* webpackChunkName: "returngoods" */ './views/ReturnGoods.vue')},
    
    
    // 配置销售统计路由
        { path: '/countsales',component: () => import(/* webpackChunkName: "CountSales" */ './views/CountSales.vue')},
        
        // 配置进货统计路由
            { path: '/countstock',component: () => import(/* webpackChunkName: "CountStock" */ './views/CountStock.vue')},
            
            // 配置会员账号管理路由
                { path: '/vipmember',component: () => import(/* webpackChunkName: "VipMember" */ './views/VipMember.vue')},
                
                // 配置添加会员账号路由
                    { path: '/vipadd',component: () => import(/* webpackChunkName: "VipAdd" */ './views/VipAdd.vue')},







     
      
    


  ]
})
