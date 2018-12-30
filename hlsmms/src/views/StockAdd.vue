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
            <h3>商品入库</h3>
          </div>
          <div class="text item">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
              <!-- 输入商品条形码 -->
              <el-form-item label="商品条形码 :" prop="barcode">
                <el-input type="text" v-model="ruleForm2.barcode" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 商品数量-->
              <el-form-item label="数量 :" prop="enternum">
                <el-input v-model.number="ruleForm2.enternum"></el-input>
                <p class="remark">计重商品单位为kg</p>
              </el-form-item>
              <!-- 商品进价 -->
              <el-form-item label="进价 :" prop="oldprice">
                <el-input v-model.number="ruleForm2.oldprice"></el-input>
              </el-form-item>
              <!-- 添加按钮 -->
              <el-row class='add'>
                <el-button type="success">入库</el-button>
              </el-row>
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
        barcode: "",
        enternum: "",
        oldprice: "",
     
      },

        rules2: {
        barcode: [{ required: true, trigger: "blur", message: "请点击生成条形码" }],
        enternum: [{ required: true, trigger: "blur", message: "请输入入库数量" } ] ,
        oldprice: [{ required: true, trigger: "blur", message: "请输入进价" }],
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


