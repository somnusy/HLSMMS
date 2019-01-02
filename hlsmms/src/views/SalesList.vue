<template>
      <el-container id="home">
      <!-- 左边菜单栏 -->
       <Leftmenu :username="username"></Leftmenu>

      <!-- 右边部分 -->
      <el-container id="rightContent">
        <!-- 右边头部 -->
         <Righttop :username="username" itemname="查看商品的销售明细"></Righttop>
        <!-- 右边中心内容 -->
          <el-main>
             <el-card class="box-card">
                 <div slot="header" class="clearfix">
                <h3>销售列表</h3>
              </div>
              <div class="text item">
                销售列表销售列表销售列表销售列表销售列表销售列表
              </div>
           </el-card>
          </el-main>
        <!-- 右边底部 -->
        <Rightbottom></Rightbottom>
      </el-container>
    </el-container>
</template>

<script>
// 引入左边菜单栏
import Leftmenu from '../components/leftMenu.vue'
import Righttop from '../components/rightTop.vue'
import Rightbottom from'../components/rightBottom.vue'

export default {
  data(){
    return {
        //数据对象
      ruleForm2: {
        username:"",
       
      },

    }
  },
  components: {
    //定义左侧菜单组件
    Leftmenu,
    Righttop,
    Rightbottom
  },

    created(){
    //获取用户登录时输入的用户名
    this.username = this.$route.query.username;
    //将获取到的用户名渲染给当前页面
    this.ruleForm2.username = this.username;
  }

};
</script>


