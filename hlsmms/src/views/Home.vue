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
                <h3>系统消息</h3>
              </div>
              <!-- 消息提示 -->
                <el-alert
                  title="商品总数：5。已销售总金额：890。库存商品总价：1235.82"
                  type="success"
                  show-icon>
                </el-alert>
                <el-alert
                  title="导入数据"
                  type="info"
                  show-icon>
                </el-alert>
            <!-- 栅格两列 -->
              <div class="text item">
                <el-row :gutter="40">
                  <el-col :span="12">
                    <!-- 左边销售排行-->
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <h3>销售排行</h3>
                      </div>
                      <div class="text item">
                        <!-- 卡片内部表格 -->
                           <el-table :data="tableData" stripe style="width: 100%">
                              <el-table-column prop="goodname" label="商品名称"></el-table-column>
                              <el-table-column prop="sale" label="销量"></el-table-column>
                           </el-table>   
                      </div>        
                    </el-card>            
                  </el-col>
                  <!-- 右边缺货商品 -->
                  <el-col :span="12">
                      <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <h3>缺货的商品</h3>
                      </div>
                       <div class="text item">
                            <el-table
                              :data="tableData1"
                              style="width: 100%">
                              <el-table-column
                                prop="goodname1"
                                label="商品名称">
                                
                              </el-table-column>
                              <el-table-column
                                prop="stock"
                                label="库存">
                               
                              </el-table-column>
                              <el-table-column
                                prop="operate"
                                label="操作">
                              </el-table-column>
                            </el-table>
                        
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
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
      tableData:[
        {goodname:"海飞丝去屑洗发水",sale:"20"},
        {goodname:"海飞丝去屑洗发水",sale:"20"},
        {goodname:"海飞丝去屑洗发水",sale:"20"},
        {goodname:"海飞丝去屑洗发水",sale:"20"},
      ],
      tableData1:[
        {goodname1:"海飞丝",stock:"0",operate:"入库"},
        {goodname1:"海飞丝",stock:"0",operate:"入库"},
        {goodname1:"海飞丝",stock:"0",operate:"入库"},
        {goodname1:"海飞丝",stock:"0",operate:"入库"},
      ]
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


