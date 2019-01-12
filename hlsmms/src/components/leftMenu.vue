<template>
      <el-aside width="230px">
            <div id="leftTitle">
              <h1>华联超市管理系统</h1>
              <p><span>您好  </span><span>{{username}}</span></p>
              <p>
                <router-link to="/home">管理首页</router-link>  | 
                <a href="javascript:void(0)" @click="loginOut()">退出系统</a>
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
                        <el-menu-item index="/classifymanage"><router-link :to="classifymanage">分类管理</router-link></el-menu-item>
                        <el-menu-item index="/addclassify"><router-link :to="addclassify">添加分类</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              <!-- 第二个分类 -->
                <el-submenu index="2">
                  <template slot="title">
                    <span>商品管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="/goodsmanage"><router-link :to="goodsmanage">商品管理</router-link></el-menu-item>
                        <el-menu-item index="/addgoods"><router-link :to="addgoods">添加商品</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              <!-- 第三个分类 -->
                <el-submenu index="3">
                  <template slot="title">
                  <span>进货管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="/stockmanage"><router-link :to="stockmanage">库存管理</router-link></el-menu-item>
                        <el-menu-item index="/stockadd"><router-link :to="stockadd">添加库存</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

              <!-- 第四个分类 -->
                <el-submenu index="4">
                  <template slot="title">
                  <span>出货管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="/saleslist"><router-link :to="saleslist">销售列表</router-link></el-menu-item>
                        <el-menu-item index="/outgoods"><router-link :to="outgoods">商品出库</router-link></el-menu-item>
                        <el-menu-item index="/returngoods"><router-link :to="returngoods">商品退货</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              <!-- 第五个分类 -->
                <el-submenu index="5">
                  <template slot="title">
                  <span>统计管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="/countsales"><router-link :to="countsales">销售统计</router-link></el-menu-item>
                        <el-menu-item index="/countstock"><router-link :to="countstock">入库统计</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              <!-- 第六个分类 -->
                <el-submenu index="6">
                  <template slot="title">
                  <span>账号管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="/userlist"><router-link :to="userlist">账号管理</router-link></el-menu-item>
                        <el-menu-item index="/useradd"><router-link :to="useradd">添加账号</router-link></el-menu-item>
                        <el-menu-item index="/pwdedit"><router-link :to="pwdedit">密码修改</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              <!-- 第七个分类 -->
                <el-submenu index="7">
                  <template slot="title">
                  <span>会员管理</span>
                  </template>
                    <el-menu-item-group>
                        <el-menu-item index="/vipmember"><router-link :to="vipmember">会员账号管理</router-link></el-menu-item>
                        <el-menu-item index="/vipadd"><router-link :to="vipadd">添加会员账号</router-link></el-menu-item>
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
            isOpened:true,
            //d当点击当前页面时通过动态属性绑定将username传到跳转的页面
            //分类管理
            classifymanage:"/classifymanage?username="+this.username,
            //添加分类
            addclassify:"/addclassify?username="+this.username,

            //商品管理
            goodsmanage:"/goodsmanage?username="+this.username,
            //添加商品
            addgoods:"/addgoods?username="+this.username,

            //库存管理
            stockmanage:"/stockmanage?username="+this.username,
            //添加库存
            stockadd:"/stockadd?username="+this.username,

            //销售列表
            saleslist:"/saleslist?username="+this.username,

            //商品出库
            outgoods:"/outgoods?username="+this.username,

            //商品退货
            returngoods:"/returngoods?username="+this.username,

            //销售统计
            countsales:"/countsales?username="+this.username,

            //入库统计
            countstock:"/countstock?username="+this.username,
            //重置密码
            pwdedit:"/pwdedit?username="+this.username,
             //用户管理
            userlist:"/userlist?username="+this.username,
            //用户添加
            useradd:"/useradd?username="+this.username,

            //会员用户管理
            vipmember:"/vipmember?username="+this.username,

            //添加会员用户
            vipadd:"/vipadd?username="+this.username,

        }
    },
// 左侧展开和收起的方法
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    loginOut(){
      //发起ajax到后端路由去执行清除cookie的操作
      this.axios.get("http://127.0.0.1:9090/users/loginOut").then(result=>{
        //根据是否清除成功处理业务逻辑
        if(result.data.isOk){
          this.$message({
            message: '退出成功！',
            type: 'success'
          });
          this.$router.push("/login");
        }
      }).catch(err=>{
        console.log(err);
      })
    },
  },
  // 接受父组件的值
    props: {
      username: String,
      required: false
    }
    
}
</script>

