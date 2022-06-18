<template>
  <div id="app">
    <!-- keepalived的作用 Home离开时刻记录当前位置 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
   <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>

import MainTabBar from './components/content/mainTabBar/MainTabBar'

export default {
  name: 'App',
  components: {
   MainTabBar,
  }
}
</script>
  
<style>
  @import'assets/css/base.css';
</style>
