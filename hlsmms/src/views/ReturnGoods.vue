<template>
      <el-container id="home">
      <!-- 左边菜单栏 -->
       <Leftmenu></Leftmenu>

      <!-- 右边部分 -->
      <el-container id="rightContent">
        <!-- 右边头部 -->
         <Rignttop :username="username" itemname="商品退货!!!!"></Rignttop>
        <!-- 右边中心内容 -->
          <el-main>
             <el-card class="box-card">
                 <div slot="header" class="clearfix">
                <h3>商品退货</h3>
              </div>
              <div class="text item">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="left">
                  <el-form-item label="订单号 :" prop="barcode">
                <el-input type="text" v-model="ruleForm2.barcode" autocomplete="off"></el-input>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
               </el-form>
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
import Rignttop from '../components/rightTop.vue'
import Rightbottom from'../components/rightBottom.vue'

export default {
  data(){
    return {
       ruleForm2: {
        barcode: "",
        username:""
      },
      rules2: {
        barcode: [ { required: true, trigger: "blur", message: "请输入订单号" }],
      }
    }
  },
  components: {
    //定义左侧菜单组件
    Leftmenu,
    Rignttop,
    Rightbottom
  },
  methods: {
 
     //定义查询订单方法
       onSubmit() {
        //console.log('submit!');
      }
  },
   created(){
    //获取用户登录时输入的用户名
    this.username = this.$route.query.username;
   
  }

};
</script>
<style>
 /* 退货订单查询按钮样式调整 */
.el-button--primary{
  background-color: #67c23a;
  border:#67c23a;
  margin-left: 10px;
}
.el-button:hover, .el-button:focus{
    background-color: #67c23a;
  border:#67c23a;
}

.el-form-item__label{
  padding: 0px;
}
</style>



