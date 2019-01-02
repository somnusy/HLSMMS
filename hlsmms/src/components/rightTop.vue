<template>
     <el-header height="auto">
            <h1>欢迎您 {{username}}</h1>
            <p>{{itemname}}</p>
          </el-header>
</template>
<script>
  export default {
    // 接受父组件的值
    props: {
      username: String,
      itemname: String,
      required: false
    }
  }
</script>