<template>
  <el-container id="home">
    <!-- 左边菜单栏 -->
    <Leftmenu :username="username"></Leftmenu>

    <!-- 右边部分 -->
    <el-container id="rightContent">
      <!-- 右边头部 -->
      <Rignttop :username="username" itemname="分类管理"></Rignttop>
      <!-- 右边中心内容 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>分类管理</h3>
          </div>
          <div class="text item">
            <el-table :data="tableShowData" style="width: 100%" @row-click="rowClick" 
            :row-class-name="tableRowClassName">
              <el-table-column label="分类名称" width="600">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="管理">
                <template slot-scope="scope">
                  <el-button type="success" size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-main>
      <!-- 右边底部 -->
      <Rightbottom></Rightbottom>
    </el-container>


    <!-- 点击编辑弹出 -->
    <el-dialog title="修改分类管理" :visible.sync="centerDialogVisible" width="30%" center>

      <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
        <el-form-item label="分类名 :" prop="name">
          <el-input type="text" v-model="ruleForm2.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态 :" prop="status">
          <el-radio v-model="ruleForm2.status" label="1">启用</el-radio>
          <el-radio v-model="ruleForm2.status" label="0">备用</el-radio>
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
      //数据对象
          ruleForm2: {
            id:"",
            name:"",
            status:""
          },

        tableShowData:[
        ],

        tableData: [],
     
      }
    },
    methods: {
    //点击编辑显示弹出层并把当前行的数据赋回填到弹出层
      handleEdit(index, row) {
        this.ruleForm2 = row;
        this.centerDialogVisible = true;
      },
     //点击当前行显示当前行的二级数据
      rowClick(row){
        if(row.type.length!=2){
          return;
        }
        let arr = [];
        this.tableData.forEach(element => {
          if(element.type.indexOf(row.type)>-1||(element.type.length==2&&element.type!=row.type)){
            arr.push(element);
          }
        });
        this.tableShowData = arr;
      },
      tableRowClassName({row, rowIndex}) {
        if (row.type.length == 2) {
          return 'warning-row';
        }else{
          return 'success-row';
        }
      },
      submitForm(formname){
        //调用组件的验证方法提交表单时验证
      this.$refs[formname].validate(valid => {
        //valid参数表示验证的结果，true表示验证通过，false验证失败
        if (valid) {
          this.axios
            .post(
              "http://172.16.4.164:9090/users/updateClassify",
              this.qs.stringify(this.ruleForm2),
              {emulateJSON:true,withCredentials:true}
            )
            .then(result => {
              if (result.data.isOk) {
                this.$message({
                  showClose: true,
                  message: result.data.msg,
                  type: "success"
                });
              } else {
                this.$message.error(result.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
            this.centerDialogVisible = false;
        } else {
          return false;
        }
      });
      }
  
    },
  components: {
    //定义左侧菜单组件
    Leftmenu,
    Rignttop,
    Rightbottom
  },
    created(){
    //获取用户登录时输入的用户名
    this.username = this.$route.query.username;
      //将获取到的用户名渲染给当前页面
    this.ruleForm2.username = this.username;

    this.axios
      .post(
        "http://172.16.4.164:9090/users/initClassify",
        this.qs.stringify(this.ruleForm2),
        {emulateJSON:true,withCredentials:true}
      )
      .then(result => {
        if (result.data.isOk) {
       //将初始化的一级数据渲染到页面
          this.tableShowData = result.data.data;
        } else {
          this.$message.error(result.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });

      this.axios
      .post(
        "http://172.16.4.164:9090/users/initAllClassify",
        this.qs.stringify(this.ruleForm2),
        {emulateJSON:true,withCredentials:true}
      )
      .then(result => {
        if (result.data.isOk) {
     //将数据赋值到列表
          this.tableData = result.data.data;
        } else {
          this.$message.error(result.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
/* 主菜单样式 */
  .el-table .warning-row {
    -background: rgb(253, 230, 230);
    background:#ebeef5;
    cursor: pointer;
  }
/* 子菜单样式 */
  .el-table .success-row {
    -background: #f0f9eb;
  
  }
/* 表格行的padding/margin值 */
  .el-table th, .el-table td{
    padding:6px 0px;
    margin: 2px 0px;

  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #ebeef5;
  }

</style>


