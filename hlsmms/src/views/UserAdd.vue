<template>
  <el-container id="home">
    <!-- 左边菜单栏 -->
    <Leftmenu :username="username"></Leftmenu>

    <!-- 右边部分 -->
    <el-container id="rightContent">
      <!-- 右边头部 -->
      <Righttop :username="username" itemname="添加管理员账号"></Righttop>
      <!-- 右边中心内容 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>添加管理员账号</h3>
          </div>
          <div class="text item">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top" size="small"> 
              <el-form-item label="用户名 :" prop="username">
                <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="密码 :" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="确认密码 :" prop="passCheck">
                <el-input type="password" v-model="ruleForm2.passCheck" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="用户组 :" prop="usergroup">
                <el-select v-model="ruleForm2.usergroup" placeholder="请选择">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通管理员" value="普通管理员"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="success" @click="submitForm('ruleForm2')">添加</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
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
import Righttop from "../components/rightTop.vue";
import Rightbottom from "../components/rightBottom.vue";

export default {
  data() {
    //自定义验证2次密码是否一致
    var validatePassword = (rule, value, callback) => {
      if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    //返回的数据
    return {
      //数据对象
      ruleForm2: {
        pass: "",
        username: "",
        passCheck: "",
        usergroup: ""
      },
      //验证规则
      rules2: {
         username: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "用户名必须填写" },
          //min: 6 最小长度   max: 18 最大长度
          {min: 3,max: 18,message: "用户名长度在 3 到 18 个字符",trigger: "blur"}
            ],
         pass: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {min: 6,max: 12,message: "密码长度在 6 到 12 个字符",trigger: "blur"}
            ],
        passCheck: [
          { required: true, trigger: "blur", message: "确认密码必须填写" },
          {min: 6,max: 12,message: "确认密码长度在 6 到 12 个字符",trigger: "blur"},
            //调用自定义的验证方法验证两次密码是否一致
          { validator: validatePassword, trigger: "blur" }
             ],
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
        ]   
      }
    };
  },    
  components: {
    //注册组件
    Leftmenu,
    Righttop,
    Rightbottom
  },
  methods: {
    //提交表单的方法
    submitForm(formName) {
      //调用组件的验证方法提交表单时验证
      this.$refs[formName].validate(valid => {
        //valid参数表示验证的结果，true表示验证通过，false验证失败
        if (valid) {
          this.axios
            .post(
              "http://127.0.0.1:9090/users/useradd",
              this.qs.stringify(this.ruleForm2),
              //允许携带cookie
              {emulateJSON:true,withCredentials:true}
            )
            .then(result => {
              if (result.data.code='1') {
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
        } else {
          return false;
        }
      });
    },
    //重置表单的方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created(){
    this.username = this.$route.query.username;
  }
};
</script>

<style>
/* -----------------用户添加样式------------------------------ */
</style>



