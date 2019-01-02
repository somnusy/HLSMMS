<template>
  <el-container id="home">
    <!-- 左边菜单栏 -->
    <Leftmenu :username="username"></Leftmenu>

    <!-- 右边部分 -->
    <el-container id="rightContent">
      <!-- 右边头部 -->
      <Rignttop :username="username" itemname="欢迎来到账号管理列表"></Rignttop>
      <!-- 右边中心内容 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>账号管理</h3>
          </div>
          <div class="text item">
            <el-table :data="tableData" style="width: 100%">
              <!-- 用户id -->
              <el-table-column label="用户id" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.userid }}</span>
                </template>
              </el-table-column>
              <!-- 用户名称 -->
              <el-table-column label="用户名称" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
              </el-table-column>
              <!-- 用户组-->
              <el-table-column label="用户组" width="200">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.usergroup }}</span>
                </template>
              </el-table-column>
              <!-- 创建时间-->
              <el-table-column label="创建时间" width="200">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.addDate |foramtData}}</span>
                </template>
              </el-table-column>

              <el-table-column label="管理">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.row.userid)">
                    <i class="el-icon-edit"></i> 编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row.userid)">
                    <i class="el-icon-delete"></i> 删除</el-button>
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
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>

      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
        <el-form-item label="用户名 :" prop="username">
          <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码 :" prop="userpwd">
          <el-input type="password" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="用户组 :" prop="usergroup">
          <el-select v-model="ruleForm2.usergroup" placeholder="请选择">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
       <!--     <el-form-item>
                <el-button type="success" @click="submitForm('ruleForm2')">添加</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item> -->
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
//引入moment修改时间格式
import moment from "moment";

export default {
  data() {
    return {
      //初始化弹出层方法
       centerDialogVisible: false,
      tableData: [],
       //数据对象
      ruleForm2: {
        userpwd: "",
        username: "",
        usergroup: ""
      },
      //验证规则
      rules2: {
         username: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "用户名必须填写" },
          //min: 6 最小长度   max: 18 最大长度
          {min: 6,max: 18,message: "用户名长度在 6 到 18 个字符",trigger: "blur"}
            ],
         userpwd: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {min: 6,max: 12,message: "密码长度在 6 到 12 个字符",trigger: "blur"}
            ],
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
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
              "http://127.0.0.1:9090/users/savenewdata",
              this.qs.stringify(this.ruleForm2),
              {emulateJSON:true,withCredentials:true}
            )
            .then(result => {
              if(result.data=="123"){
                this.$router.push("/")
              }

              if (result.data.isOk) {
                this.$message({
                  showClose: true,
                  message: result.data.msg,
                  type: "success"
                });
                //弹出层消失重新刷新列表
                this.centerDialogVisible= false;
                 this.getuser();

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
            
            

    //请求数据的方法
    getuser() {
      this.axios
        .get("http://127.0.0.1:9090/users/userlist",{emulateJSON:true,withCredentials:true})
        .then(result => {
          if(result.data=="123"){
            this.$router.push("/")
          }
          //将后台请求到的数据赋值给实例中的tabledata
          this.tableData = result.data;
        })
        .catch(err => {
          this.$message.error("系统错误");
        });
    },
   //编辑的方法
    handleEdit(userid) {
   //点击时发送ajax请求且弹出模态框
   this.axios.get("http://127.0.0.1:9090/users/getusermsg?userid="+userid,{emulateJSON:true,withCredentials:true})
   .then(olddata=>{
     if(olddata.data=="123"){
        this.$router.push("/")
      }
     //把后台查询的旧数据回填到表单
     this.ruleForm2=olddata.data[0]
     this.centerDialogVisible=true;
   }).catch(err=>{
      this.$message.error(result.data.msg);
   })
  },

    //删除方法
    handleDelete(userid) {
      //发送删除用户的请求
      this.axios
        .get("http://127.0.0.1:9090/users/deluser?userid=" + userid,{emulateJSON:true,withCredentials:true})
        .then(result => {
          if (result.data.isOk) {
            //再发送ajax请求将更新后的用户数据渲染到表格
            this.getuser();
            //删除成功的弹出框提示
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
          this.$message.error("系统错误");
        });
    }
  },


  //钩子函数在实例化之后发生请求用户存入的数据
  created() {
    //调用请求数据的方法
    this.getuser();
    //接收登录页面传递的用户名信息
    this.username = this.$route.query.username;
  },

  //定义过滤器将时间转换为其他格式
  filters: {
    foramtData(oldDate) {
      return moment(oldDate).format("YYYY年MM月DD日");
    }
  }
};
</script>


