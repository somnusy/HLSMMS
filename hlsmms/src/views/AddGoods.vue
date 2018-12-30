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
            <h3>添加商品</h3>
          </div>
          <div class="text item">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
              <!-- 所属分类 -->
              <el-form-item label="所属分类 :" prop="addclassify" label-width="30px">
                <el-select v-model="ruleForm2.addclassify" placeholder="请选择">
                  <el-option label="日用品" value="日用品"></el-option>
                  <el-option label="食品" value="食品"></el-option>
                </el-select>
              </el-form-item>
              <!-- 商品条形码 -->
              <el-form-item label="商品条形码 :" prop="barcode">
                <el-input type="text" v-model="ruleForm2.barcode" autocomplete="off"></el-input>
                <el-button type="primary" @click="onSubmit">生成条形码</el-button>
              </el-form-item>
              <!-- 商品名称 -->
              <el-form-item label="商品名称 :" prop="goodsname">
                <el-input type="text" v-model="ruleForm2.goodsname" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 商品售价 -->
              <el-form-item label="商品售价 :" prop="goodsprice">
                <el-input v-model.number="ruleForm2.goodsprice" @blur="calcJG"></el-input>
              </el-form-item>
              <!-- 市场价 -->
              <el-form-item label="市场价" prop="marketprice">
                <el-input v-model.number="ruleForm2.marketprice"></el-input>
                <p class="remark">默认市场价为售价的1.2倍</p>
              </el-form-item>
              <!-- 商品进价 -->
              <el-form-item label="商品进价" prop="oldprice">
                <el-input v-model.number="ruleForm2.oldprice"></el-input>
              </el-form-item>
              <!-- 入库数量 -->
              <el-form-item label="入库数量" prop="enternum">
                <el-input v-model.number="ruleForm2.enternum"></el-input>
              </el-form-item>
              <!-- 商品重量 -->
              <el-form-item label="商品重量" prop="weight">
                <el-input v-model.number="ruleForm2.enternum"></el-input>
                <p class="remark">计重商品单位为kg</p>
              </el-form-item>
              <!-- 商品单位 -->
              <el-form-item label="商品单位" prop="goodsunit">
                <el-input v-model.number="ruleForm2.enternum"></el-input>
              </el-form-item>
              <!-- 会员优惠 -->
              <p>会员优惠：</p>
              <el-radio v-model="radio1" label="1">享受</el-radio>
              <el-radio v-model="radio1" label="2">不享受</el-radio>
              <!-- 是否促销 -->
              <p>是否促销：</p>
              <el-radio v-model="radio2" label="1">启用</el-radio>
              <el-radio v-model="radio2" label="2">备用</el-radio>
              <!-- 商品简介 -->
              <el-form-item label="商品简介：" prop="desc">
                <el-input type="textarea" v-model="ruleForm2.desc"></el-input>
                <p class="remark">不超过200个汉字</p>
              </el-form-item>
              <!-- 添加按钮 -->
              <el-row class='add'>
                <el-button type="success">添加</el-button>
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
      radio1: "1",
      radio2: "1",

      ruleForm2: {
        addclassify: "",
        classifyname: "",
        barcode: "",
        goodsname: "",
        goodsprice: "",
        marketprice: "",
        oldprice: "",
        enternum: "",
        desc: ""
      },
      rules2: {
        addclassify: [
          { required: true, trigger: "blur", message: "请选择分类" }
        ],
        barcode: [
          { required: true, trigger: "blur", message: "请点击生成条形码" }
        ],
        goodsname: [
          { required: true, trigger: "blur", message: "请输入商品名称" }
        ],
        goodsprice: [
          { required: true, trigger: "blur", message: "请输入商品价格" }
        ],
        oldprice: [{ required: true, trigger: "blur", message: "请输入进价" }],
        enternum: [
          { required: true, trigger: "blur", message: "请输入入库数量" }
        ]
      }
    };
  },
  components: {
    //定义左侧菜单组件
    Leftmenu,
    Rignttop,
    Rightbottom
  },
  
  methods: {
    //定义方法  市场价是商品售价的1.2倍
    calcJG() {
      let v = this;
      v.ruleForm2.marketprice = (1.2 * v.ruleForm2.goodsprice).toFixed(2);
    },
     //定义条形码方法
       onSubmit() {
        //console.log('submit!');
      }
  }
};
</script>
<style>



.add .el-button{
  margin: 30px 0px;
}
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
 /* 文本域长度调整 */
.el-textarea__inner{
  width: 50%;
}
</style>



