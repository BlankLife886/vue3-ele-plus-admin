<template>
  <div class="app-wrapper">
    <!--  左侧menu-->
    <sidebar
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    ></sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!--  顶部 Navbar-->
        <navbar />
      </div>
      <!--  内容区-->
      <app-main />
    </div>
  </div>
</template>
<script setup>
import Sidebar from "@/layout/components/Sidebar";
import Navbar from "@/layout/components/Navbar";
import AppMain from "@/layout/components/AppMain";
import variables from "@/styles/variable.module.scss";
import {} from "vue";
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variable.module.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
}
</style>
