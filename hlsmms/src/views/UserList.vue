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
            <h3>账号管理</h3>
          </div>
          <div class="text item">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column label="用户名称" width="180">
                <template slot-scope="scope">
                  
                  <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
              </el-table-column>
              <el-table-column label="用户组" width="200">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.usergroup }}</p>
                    <!-- <p>住址: {{ scope.row.address }}</p> -->
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.usergroup }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="管理">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                    <i class="el-icon-edit"></i> 编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
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
      tableData: [
        {username: "admin",usergroup: "超级管理员",},
        {username: "admin",usergroup: "超级管理员",},
        {username: "admin",usergroup: "超级管理员",},
      ]
    };
  },
  components: {
    //定义左侧菜单组件
    Leftmenu,
    Rignttop,
    Rightbottom
  },
   methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>


