<template>
  <el-container id="home">
    <!-- 左边菜单栏 -->
    <Leftmenu :username="username"></Leftmenu>

    <!-- 右边部分 -->
    <el-container id="rightContent">
      <!-- 右边头部 -->
      <Rignttop :username="username" itemname="1、你可以在这里添加新的商品或者编辑已有的商品。
                 2、新添加商品时可以同时进行入库（入库必须有数量和进价）！
                  3、带*号的项目必填"></Rignttop>

      <!-- 右边中心内容 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>添加商品</h3>
          </div>
          <div class="text item">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="left" size="small">
              <!-- 所属分类 -->
              <el-form-item label="所属分类 :" prop="classname" label-width="100px">
                <el-select v-model="ruleForm2.classname" placeholder="请选择">
                  <el-option label="日用品" value="日用品"></el-option>
                  <el-option label="食品" value="食品"></el-option>
                  <el-option label="服装" value="食品"></el-option>
                  <el-option label="酒水" value="食品"></el-option>
                 
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
              <!-- 商品进价 -->
              <el-form-item label="商品进价" prop="costprice">
                <el-input v-model.number="ruleForm2.costprice" @blur="calcJG"></el-input>
              </el-form-item>
              <!-- 商品售价 -->
              <el-form-item label="商品售价 :" prop="saleprice">
                <el-input v-model.number="ruleForm2.saleprice"></el-input>
              </el-form-item>
              <!-- 市场价 -->
              <el-form-item label="市场价 :" prop="marketprice">
                <el-input v-model.number="ruleForm2.marketprice"></el-input>
                <p class="remark">默认市场价为商品售价的1.2倍</p>
              </el-form-item>

              <!-- 入库数量 -->
              <el-form-item label="入库数量" prop="stocknum">
                <el-input v-model.number="ruleForm2.stocknum"></el-input>
              </el-form-item>
              <!-- 商品重量 -->
              <el-form-item label="商品重量" prop="weight">
                <el-input v-model.number="ruleForm2.weight"></el-input>
                <p class="remark">计重商品单位为kg</p>
              </el-form-item>
              <!-- 商品单位 -->
              <el-form-item label="商品单位" prop="unit">
                <el-input v-model.number="ruleForm2.unit"></el-input>
              </el-form-item>
              <!-- 会员优惠 -->
              <el-form-item label="会员优惠：">
                <el-radio-group v-model="ruleForm2.isdiscount">
                  <el-radio label="1">享受</el-radio>
                  <el-radio label="0">不享受</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- 是否促销 -->
              <el-form-item label="是否促销：">
                <el-radio-group v-model="ruleForm2.ispromotion">
                  <el-radio label="1">启用</el-radio>
                  <el-radio label="0">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- 商品简介 -->
              
              <el-form-item label="商品简介：" prop="details">
                <el-input type="textarea" v-model="ruleForm2.details"></el-input>
                <p class="remark">不超过200个汉字</p>
              </el-form-item>
              <!-- 添加按钮 -->
            
                 <el-form-item class='add'>
                <el-button type="primary" @click="submitForm('ruleForm2')">添加商品</el-button>
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
        classname: "",
        barcode: "",
        goodsname: "",
        saleprice: "",
        marketprice: "",
        costprice: "",
        stocknum: "",
        weight:"",
        unit: "",
        details: "",
        isdiscount: "1",
        ispromotion: "1",
        username: ""
      },
      rules2: {
        classname: [{ required: true, trigger: "blur", message: "请选择分类" }],
        barcode: [
          { required: true, trigger: "blur", message: "请点击生成条形码" }
        ],
        goodsname: [
          { required: true, trigger: "blur", message: "请输入商品名称" }
        ],
        costprice: [{ required: true, trigger: "blur", message: "请输入进价" }],
        stocknum: [
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
//提交表单的方法
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           //发送ajax请求保存商品数据
           this.axios.post(
             'http://172.16.4.164:9090/users/addgoods',
             this.qs.stringify(this.ruleForm2),
           ).then(result=>{
               if (result.data.isOk) {
                this.$message({
                  message:result.data.msg,
                  type: "success"
                });
              } else {
               this.$message.error(result.data.msg);
          }
        });
      }else{
          return false;
      }})},
    //定义方法  市场价是商品售价的1.2倍 售价是进价的5倍
    calcJG() {
      let v = this;
      v.ruleForm2.saleprice = (v.ruleForm2.costprice * 5).toFixed(2);
      v.ruleForm2.marketprice = (1.2 * v.ruleForm2.saleprice).toFixed(2);
    },
    //定义条形码方法
    onSubmit() {
      this.ruleForm2.barcode = new Date().getTime();
    }

  },
  created() {
    this.username = this.$route.query.username;
  },

};
</script>



<style>
.add .el-button {
  margin: 30px 0px;
}
/* 单选按钮颜色 */
.el-radio__input.is-checked .el-radio__inner {
  color: #67c23a;
  background-color: #67c23a;
  border: #67c23a;
}

.el-radio__input.is-checked + .el-radio__label {
  color: #67c23a;
  border: #67c23a;
}

/* 条形码按钮颜色调整 */
.el-button--primary {
  background-color: #67c23a;
  border: #67c23a;
  margin-left: 10px;
}
.el-button:hover,
.el-button:focus {
  background-color: #67c23a;
  border: #67c23a;
}
/* 文本域长度调整 */
.el-textarea__inner {
  margin-top: 20px;
  width: 70%;
}
</style>



