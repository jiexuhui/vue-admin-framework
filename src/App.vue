<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view target="_blank"/>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    var lett = this
    document.onkeydown = function(e) {
      // var key = window.event.keyCode;
      // console.log(key);
      // if (key == 13) {
      //   lett.searchData();
      // }
    }
  }
}
</script>
