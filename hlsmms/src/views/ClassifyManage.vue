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
            <h3>分类管理</h3>
          </div>
          <div class="text item">
            <el-table :data="tableShowData" style="width: 100%" @row-click="rowClick" 
            :row-class-name="tableRowClassName">
              <el-table-column label="分类名称" width="600">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.daliyuse }}</span>
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
        tableShowData:[
          {daliyuse: '一、零食',type:"1s" },
          {daliyuse: '二、衣服',type:"yf" },
          {daliyuse: '三、汽车',type:"qc" }
        ],
        tableData: [
          {daliyuse: '一、零食',type:"1s" },
          {daliyuse: '辣条',type:"1s1" },
          {daliyuse: '饼干',type:"1s2" },
          {daliyuse: '可乐',type:"1s3" },

          {daliyuse: '二、衣服',type:"yf" },
          {daliyuse: 'adidas',type:"yf1" },
          {daliyuse: 'nike',type:"yf2" },
          {daliyuse: 'nb',type:"yf3" },


          {daliyuse: '三、汽车',type:"qc" },
          {daliyuse: '劳斯莱斯',type:"qc1" },
          {daliyuse: '马萨拉蒂',type:"qc2" },
          {daliyuse: '布加迪威龙',type:"qc3" },
        ],
        click1:true,
        click2:true,
        click3:true,
      }
    },
    methods: {
      handleEdit(index, row) {
        // console.log(index, row);
      },
      rowClick(row){
        if(row.type.length!=2){
          return;
        }
        let v = this;
        let arr = [];
        v.tableData.forEach(element => {
          if(element.type.indexOf(row.type)>-1||(element.type.length==2&&element.type!=row.type)){
            arr.push(element);
          }
        });
        v.tableShowData = arr;
      },
      tableRowClassName({row, rowIndex}) {
        if (row.type.length == 2) {
          return 'warning-row';
        }else{
          return 'success-row';
        }
      }
  
    },
  components: {
    //定义左侧菜单组件
    Leftmenu,
    Rignttop,
    Rightbottom
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


