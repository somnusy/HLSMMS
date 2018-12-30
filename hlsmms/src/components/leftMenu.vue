<template>
      <el-aside width="230px">
            <div id="leftTitle">
              <h1>华联超市管理系统</h1>
              <p><span>您好  </span><span>Admin</span></p>
              <p>
                <router-link to="/home">管理首页</router-link>  | 
                <router-link to="/">退出系统</router-link>  
              </p>
            </div>
           <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :unique-opened="isOpened">
              <!-- 第一个分类 -->
                <el-submenu index="1">
                  <template slot="title">
                  <span>分类管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="/classifymanage"><router-link to="/classifymanage">分类管理</router-link></el-menu-item>
                        <el-menu-item index="/addclassify"><router-link to="/addclassify">添加分类</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              <!-- 第二个分类 -->
                <el-submenu index="2">
                  <template slot="title">
                    <span>商品管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="/goodsmanage"><router-link to="/goodsmanage">商品管理</router-link></el-menu-item>
                        <el-menu-item index="/addgoods"><router-link to="/addgoods">添加商品</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              <!-- 第三个分类 -->
                <el-submenu index="3">
                  <template slot="title">
                  <span>进货管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="/stockadd"><router-link to="/stockadd">库存管理</router-link></el-menu-item>
                        <el-menu-item index="1-2"><router-link to="">添加库存</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

              <!-- 第四个分类 -->
                <el-submenu index="4">
                  <template slot="title">
                  <span>出货管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">销售列表</el-menu-item>
                        <el-menu-item index="1-2">商品出库</el-menu-item>
                        <el-menu-item index="/returngoods"><router-link to="returngoods">商品退货</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              <!-- 第五个分类 -->
                <el-submenu index="5">
                  <template slot="title">
                  <span>统计管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">销售统计</el-menu-item>
                        <el-menu-item index="1-2">入库统计</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              <!-- 第六个分类 -->
                <el-submenu index="6">
                  <template slot="title">
                  <span>账号管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="/userlist"><router-link to="/userlist">账号管理</router-link></el-menu-item>
                        <el-menu-item index="/useradd"><router-link to="/useradd">添加账号</router-link></el-menu-item>
                        <el-menu-item index="/useredit"><router-link to="/useredit">密码修改</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              <!-- 第七个分类 -->
                <el-submenu index="7">
                  <template slot="title">
                  <span>会员管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">账号管理</el-menu-item>
                        <el-menu-item index="1-2">添加账号</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              <!-- 第八个分类 -->
                <el-submenu index="8">
                  <template slot="title">
                  <span>系统管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">系统信息</el-menu-item>
                        <el-menu-item index="1-2">系统配置</el-menu-item>
                        <el-menu-item index="1-3">权限管理</el-menu-item>
                        <el-menu-item index="1-4">添加管理组</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
          </el-menu>
      </el-aside>
    
</template>



<script>
export default {
    data(){
        return {
            isOpened:true
        }
    },
// 左侧展开和收起的方法
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    }
  }
    
}
</script>

