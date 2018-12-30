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
                <h3>模板</h3>
              </div>
              <div class="text item">
                模板
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
import Leftmenu from '../components/leftMenu.vue'
import Rignttop from '../components/rightTop.vue'
import Rightbottom from'../components/rightBottom.vue'

export default {
  data(){
    return {

    }
  },
  components: {
    //定义左侧菜单组件
    Leftmenu,
    Rignttop,
    Rightbottom
  },

};
</script>


