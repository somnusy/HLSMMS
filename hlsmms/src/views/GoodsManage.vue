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

            <!-- 搜索 -->
            <div>
              <!-- 设置 inline 属性可以让表单域变为行内的表单域 -->
              <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                <el-form-item label="所属分类">
                  <el-select v-model="formSearch.classname" placeholder="请选择分类">
                    <el-option label="日用品" value="日用品"></el-option>
                    <el-option label="零食" value="零食"></el-option>
                    <el-option label="酒水" value="酒水"></el-option>
                    <el-option label="饮料" value="饮料"></el-option>
                    <el-option label="服装" value="服装"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="关键词">
                  <el-input id="keywords" v-model="formSearch.keywords" placeholder="查询商品名称、条形码"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="success" @click="onSearch()" icon="el-icon-search">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div id="searchBox"></div>
            <!-- 管理列表 -->
            <div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="商品条码">
                  <template slot-scope="scope">
                    {{ scope.row.barcode }}
                  </template>
                </el-table-column>

                <el-table-column label="商品名称">
                  <template slot-scope="scope">
                    {{ scope.row.goodsname }}
                  </template>
                </el-table-column>

                <el-table-column label="所属分类">
                  <template slot-scope="scope">
                    {{ scope.row.classname }}
                  </template>
                </el-table-column>

                <el-table-column label="售价">
                  <template slot-scope="scope">
                    {{ scope.row.saleprice }}
                  </template>
                </el-table-column>

                <el-table-column label="市场价">
                  <template slot-scope="scope">
                    {{ scope.row.marketprice }}
                  </template>
                </el-table-column>

                <el-table-column label="成本价">
                  <template slot-scope="scope">
                    {{ scope.row.costprice }}
                  </template>
                </el-table-column>

                <el-table-column label="操作" width="180">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                      <i class="el-icon-edit"></i> 编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                      <i class="el-icon-delete"></i>删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 分页 -->
            <!-- 设置background属性可以为分页按钮添加背景色。 -->
            <div id="pagerBox">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1,2,3,5,10,20,50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" background :total="total">
              </el-pagination>
            </div>
          </div>
        </el-card>
      </el-main>
      <!-- 右边底部 -->
      <Rightbottom></Rightbottom>
    </el-container>



    <!-- 点击编辑弹出 -->
    <el-dialog title="商品修改" :visible.sync="centerDialogVisible" width="30%" center>

      
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top" size="small">
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
           
            </el-form>




      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
      </span>
    </el-dialog>



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
      centerDialogVisible:false,
      currentPage: 1, //默认值在第一页
      pageSize: 5, //每页五条数据
      total: 0, //总记录数量
      // 查询的表单
      formSearch: {
        classname: "",
        keywords: ""
      },
      tableData: [],

      ruleForm2: {
        username: ""
      },
      rules2: {
        addclassify: [
          { required: true, trigger: "blur", message: "请选择分类" }
        ],
        barcode: [
          { required: true, trigger: "blur", message: "请点击生成条形码" }
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
    submitForm(formName) {
      //调用组件的验证方法提交表单时验证
      this.$refs[formName].validate(valid => {
        //valid参数表示验证的结果，true表示验证通过，false验证失败
        if (valid) {
          this.axios
            .post(
              "http://172.16.4.164:9090/users/editGoods",
              this.qs.stringify(this.ruleForm2),
            )
            .then(result => {
              if (result.data.isOk) {
                this.$message({
                  showClose: true,
                  message: result.data.msg,
                  type: "success"
                });
                //弹出层消失重新刷新列表
                this.centerDialogVisible= false;
                 this.getGoods();

              } else {
                this.$message.error(result.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },



    handleEdit(index, row) {
      this.ruleForm2 = row;
      this.centerDialogVisible = true;

    },
    handleDelete(index, row) {
      this.axios
        .get(
          //传入分页参数: pageSize每页大小，当前在第几页currentPage
       `http://172.16.4.164:9090/users/delgoods?id=`+row.goodsid)
        .then(result => {
          if(result.data.isOk){
            // this.tableData.splice(index,1);
            this.$message.success(result.data.message);
            this.getGoods();
          }else{
            this.$message.error("删除失败");
          }
        })
        .catch(err => {
          console.error(err.message);
        });
      this.tableData.splice(index,1);
    },


    //定义获取商品的方法
    getGoods() {
      this.axios
        .get(
          //传入分页参数: pageSize每页大小，当前在第几页currentPage
       `http://172.16.4.164:9090/users/getgoods?classname=${this.formSearch.classname}&keywords=${this.formSearch.keywords}&pagesize=${this.pageSize}&currentpage=${this.currentPage}` )
        .then(result => {
          //把查询到的商品信息的数组对象赋值给表格数据属性
          this.tableData = result.data.goodsArray;
          //把后端返回的total总记录数赋值给total属性
          this.total = result.data.total;
        })
        .catch(err => {
          console.error(err.message);
        });
    },

    //查询按钮执行的方法
    onSearch() {
      console.log("搜索的分类和关键词", this.formSearch);
      //点击搜索按钮就把 商品分类和关键词 发送到后端api
      this.getGoods();
    },
    //改变每页大小的方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      //把改变后的值赋值给数据属性
      this.pageSize = val;
      this.getGoods();
    },
    //改变当前页的方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      //把改变后的值赋值给数据属性
      this.currentPage = val;
      this.getGoods();
    },
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
    mounted(){
    this.getGoods()
  },
  created() {
    this.getGoods();
    this.username = this.$route.query.username;
  }
};
</script>


<style>
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
/* 设置选择框样式 */
.el-form--inline .el-form-item__label {
  display: inline;
}
/* 对话框中的输入框 */
#mydailog .el-input,#login .el-input{
    width: 90%;
}

/* 搜索框的关键词 */
#keywords{
    width: 400%;
}

/* 搜索盒子 */
#searchBox{
    border: solid 1px #ccc;
    height: 1px;
}

/* 分页的盒子 */
#pagerBox{
    margin: 15px auto;
}

/* 修改当前激活页样式 */
.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #50b41a;
}
</style>



