<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    text-color="#000000"
    active-text-color="#ffd04b"
  >
    <!--    子集 menu-->
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项一</el-menu-item>
      <el-menu-item index="1-2">选项二</el-menu-item>
    </el-submenu>
    <!--    具体菜单-->
    <el-menu-item index="2">
      <template #title>导航二</template>
    </el-menu-item>
  </el-menu>
</template>
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { filterRoutes, generateMenus } from "@/utils/route";

const router = useRouter();
const routes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes());
  console.log(fRoutes);
  return generateMenus(fRoutes);
});
console.log(JSON.stringify(routes.value));
</script>
<style lang="scss" scoped></style>
