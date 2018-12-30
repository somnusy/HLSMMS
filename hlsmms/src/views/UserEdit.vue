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
            <h3>密码修改</h3>
          </div>
          <div class="text item">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
              <el-form-item label="原密码 :" prop="pass">
                <el-input type="text" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="新密码 :" prop="newpass">
                <el-input type="password" v-model="ruleForm2.newpass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="确认密码 :" prop="passCheck">
                <el-input type="password" v-model="ruleForm2.passCheck" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="submitForm('ruleForm2')">确认修改</el-button>

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
    //自定义验证2次密码是否一致
    var validatePassword = (rule, value, callback) => {
      if (value !== this.ruleForm2.newpass) {
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
        newpass: "",
        passCheck: ""
      },
      //验证规则
      rules2: {
        pass: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "密码必须填写" },
          //min: 6 最小长度   max: 18 最大长度
          {
            min: 6,
            max: 18,
            message: "用户名长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        newpass: [
          { required: true, trigger: "blur", message: "新密码必须填写" },
          {
            min: 6,
            max: 18,
            message: "用户名长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        passCheck: [
          { required: true, trigger: "blur", message: "确认密码必须填写" },
          {
            min: 6,
            max: 18,
            message: "用户名长度在 6 到 18 个字符",
            trigger: "blur"
          },
          //调用自定义的验证方法验证两次密码是否一致
          { validator: validatePassword, trigger: "blur" }
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
      //调用组件的验证方法提交表单是验证
      this.$refs[formName].validate(valid => {
        //valid参数表示验证的结果，true表示验证通过，false验证失败
        if (valid) {
          //alert('√ 表单验证成功!');
          //发起ajax请求去后端做数据库的验证
          //location.href="/";
          this.$router.push("/home"); //使用路由对象的push实现跳转
        } else {
          return false;
        }
      });
    },
    //重置表单的方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


