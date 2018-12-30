<template>
  <el-container id="home">
    <!-- 左边菜单栏 -->
    <Leftmenu></Leftmenu>

    <!-- 右边部分 -->
    <el-container id="rightContent">
      <!-- 右边头部 -->
      <Rignttop></Rignttop>
      <!-- 右边中心内容 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>添加管理</h3>
          </div>
          <div class="text item">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
              <el-form-item label="所属分类 :" prop="addclassify">
                <el-select v-model="ruleForm2.addclassify" placeholder="请选择">
                  <el-option label="日用品" value="日用品"></el-option>
                  <el-option label="食品" value="食品"></el-option>
                </el-select>
              </el-form-item>
              <!-- 分类名称 -->
              <el-form-item label="分类名称 :" prop="classifyname">
                <el-input type="text" v-model="ruleForm2.classifyname" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <!-- 启用 禁用 -->
              <p>状态 :</p>
              <el-radio v-model="radio" label="1">启用</el-radio>
              <el-radio v-model="radio" label="2">备用</el-radio>
             <el-row class='add'>
              <el-button type="success">添加</el-button>
            </el-row>
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
        radio: '1',
      ruleForm2: {
        addclassify: "",
        classifyname: ""
      },
      rules2: {
        classifyname: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "用户名必须填写" },
          //min: 6 最小长度   max: 18 最大长度
          {min: 6,max: 18,message: "用户名长度在 6 到 18 个字符",trigger: "blur" }
        ], 
        addclassify: [
          { required: true, trigger: "change", message: "请选择分类" }
        ]    
      }      
    };        
  },       
  components: {
    //定义左侧菜单组件
    Leftmenu,
    Rignttop,
    Rightbottom
  }      
 };     
</script>      



<style>
/* ------------添加分类样式---------------------------------------- */
/* 按钮外边距 */
.add .el-button{margin: 30px 0px;}

/* 单选按钮颜色 */
.el-radio__input.is-checked .el-radio__inner{
  color:#67c23a;
  background-color: #67c23a;
  border: #67c23a
}

.el-radio__input.is-checked + .el-radio__label{
 color: #67c23a;
 border: #67c23a
}
</style>



