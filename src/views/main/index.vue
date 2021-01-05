<template>
  <div class="main-box">
    <el-container>
      <el-aside width="200px">
        <div class="title-wrapper">
          <img src="../../assets/leijun.png">
          <span>后台管理系统</span>
        </div>

        <!--default-active 默认高亮的内容 对应的是index取值 一般的情况下 取值是
       el-menu-item的index的取值  -->

        <el-scrollbar>
          <el-menu
              default-active="1"
              class="el-menu-vertical-demo">
            <!--          不能展开的-->
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">系统首页</span>
            </el-menu-item>
            <!--表示的是导航 可以展开-->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品相关</span>
              </template>

              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>
                <span slot="title">品牌管理</span>
              </el-menu-item>

              <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                <span slot="title">分类管理</span>
              </el-menu-item>

              <el-menu-item index="2-3">
                <i class="el-icon-menu"></i>
                <span slot="title">商品管理</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">运营商管理</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header>XXXXX</el-header>
        <el-main>
          <div class="main-body">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<!--<script src="./index.js"></script>-->
<script>
import obj from "@/views/main/index";

export default obj;
</script>

<!--<style lang="less" src="./index.less"></style>-->

<style lang="less">
  @import "./index";
</style>
