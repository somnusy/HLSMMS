<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: "app",
  components: {
 
   
  }
};
</script>

<style>
html,body,#app,#loginbox ,#home{
height: 100%;
margin: 0;
}

#rightContent>*{
  width: 100%;
}
#rightContent{
  display: flex;
  flex-wrap: wrap;
}
</style>
