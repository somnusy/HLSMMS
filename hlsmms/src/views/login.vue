  <template>
    <div id="loginbox">
      <!-- <router-link :to="{path: '/home'}" >
    home
    </router-link> -->
      <el-card class="box-card" id="login">
            <div slot="header" class="clearfix" >
                <span>用户登录</span>
            </div>
            <div class="text item">
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                      <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="success" @click="submitForm('ruleForm2')">登录</el-button>
                      <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                  </el-form>
                
            </div>
          </el-card>
     </div>
  </template>


  <script>
    export default {
          data() {
        
          return {
            ruleForm2: {
              pass: '',
              username: '',
            },
            rules2: {
              username: [
                { required: true, trigger: 'blur', message: "用户名必须填写" },
                { min: 6, max: 18, message: '用户名长度在 6 到 18 个字符', trigger: 'blur' }
                ],
              pass: [
                  { required: true, trigger: 'blur', message: "密码必须填写" },
                  { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
              ],
            
            }
          };
        },
        methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                //发送ajax向后台请求数据验证
                
                //跳转到管理界面首页
                this.$router.push("/home")
                
              } else {
                console.log('error submit!!');
                this.$message({
                  type: 'info',
                  message: `登录失败`
                });
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        }
    };
  </script>

  <style>
      #loginbox{
    
       background-color:rgb(42, 44, 43);
      
      }
      #login{
          width: 520px;
          height: 300px;
          /* 让盒子水平和垂直绝对居中 */
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
      }

   
  </style>


