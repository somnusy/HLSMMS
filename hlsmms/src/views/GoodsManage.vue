<template>
  <el-container id="home">
    <!-- 左边菜单栏 -->
    <Leftmenu :username="username"></Leftmenu>

    <!-- 右边部分 -->
    <el-container id="rightContent">
      <!-- 右边头部 -->
      <Rignttop :username="username" itemname="查看和管理已有的所有商品"></Rignttop>
      <!-- 右边中心内容 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>商品管理</h3>
          </div>
          <div class="text item">

            <el-form :inline="true" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="left" size="small">
              <!-- 所属分类 -->
              <el-form-item label="所属分类 :" prop="addclassify" label-width="30px">
                <el-select v-model="ruleForm2.addclassify" placeholder="请选择">
                  <el-option label="日用品" value="日用品"></el-option>
                  <el-option label="食品" value="食品"></el-option>
                </el-select>
              </el-form-item>
              <!-- 商品条形码 -->
              <el-form-item label="关键字 :" prop="barcode">
                <el-input type="text" v-model="ruleForm2.barcode" autocomplete="off"></el-input>
                (商品名称、条形码)
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
import Leftmenu from "../components/leftMenu.vue";
import Rignttop from "../components/rightTop.vue";
import Rightbottom from "../components/rightBottom.vue";

export default {
  data() {
    return {
        ruleForm2: {
          addclassify: "",
          barcode: "",
          username:""
        },
        rules2: {
        addclassify: [
          { required: true, trigger: "blur", message: "请选择分类" }
        ],
        barcode: [
          { required: true, trigger: "blur", message: "请点击生成条形码" }
        ],
      }
    };
  },
  components: {
    //定义左侧菜单组件
    Leftmenu,
    Rignttop,
    Rightbottom
  },
  methods:{
    //定义条形码方法
       onSubmit() {
        //console.log('submit!');
      }
  },
  created() {
    this.username = this.$route.query.username;
  }
};
</script>


<style>

 /* 条形码按钮颜色调整 */
.el-button--primary{
  background-color: #67c23a;
  border:#67c23a;
  margin-left: 10px;
}
.el-button:hover, .el-button:focus{
    background-color: #67c23a;
  border:#67c23a;
}
/* 设置选择框样式 */
.el-form--inline .el-form-item__label{
  display: inline;
}
/* .el-input--small .el-input__inner{
  width: 200px;
} */
</style>



