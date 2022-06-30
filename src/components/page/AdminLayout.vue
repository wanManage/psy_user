<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-sider
        :width="collapsed ? '80px' : '280px'"
        :trigger="null"
        collapsible
        v-model="collapsed"
        :style="{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }"
      >
        <Logo title="CPCP 后台系统" :showTitle="!collapsed"></Logo>
        <el-menu
            :default-active="this.$router.path" router
            class="el-menu-vertical"
            text-color="#fff"
            background-color="#001529"
            active-text-color="#ffd04b"
        >
            <el-submenu v-for="(menu, index) of menusMock" :key="index" :index="'1-'+index">
              <template slot="title"><i class="el-icon-message-solid"></i>{{menu.item.title}}</template>
              <el-menu-item v-for="(sub, idx) of menu.subItems" :key="idx" :index="'1-'+index + '-' + idx" :route=sub.path>{{sub.label}}</el-menu-item>
            </el-submenu>

        </el-menu>

        <!-- <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
          <a-menu-item key="1">
            <router-link to="/admin/board">
              <a-icon type="notification" />
              <span>公告管理</span>
            </router-link>
          </a-menu-item>

          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user" /><span>用户管理</span></span>
            <a-menu-item key="2">
              <router-link to="/admin/user">
                用户列表
              </router-link>
            </a-menu-item>

            <a-menu-item key="3">
              <router-link to="/admin/user/add">
                添加用户
              </router-link>
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="sub2">
            <span slot="title" ><a-icon type="read" /><span>文章管理</span></span>

            <a-menu-item key="4">
              <router-link to="/admin/post">
                文章列表
              </router-link>
            </a-menu-item>

            <a-menu-item key="5">
              <router-link to="/admin/post/add">
                发布文章
              </router-link>
            </a-menu-item>
          </a-sub-menu>

          <a-menu-item key="8">
            <router-link to="/admin/talk">
              <a-icon type="file-text" /><span>咨询师管理</span>
            </router-link>
          </a-menu-item>

          <a-sub-menu key="sub3">
            <span slot="title"
              ><a-icon type="project" /><span>心理测试管理</span></span
            >

            <a-menu-item key="9">
              <router-link to="/admin/test">
                编辑题目
              </router-link>
            </a-menu-item>

            <a-menu-item key="10">
              <router-link to="/admin/test/result">
                用户测试管理
              </router-link>
            </a-menu-item>
          </a-sub-menu>

          <a-menu-item key="11">
              <router-link to="/admin/chat">
                <a-icon type="message" />在线咨询
              </router-link>
            </a-menu-item>
        </a-menu> -->
      </a-layout-sider>
      <a-layout :style="{ marginLeft: collapsed ? '80px' : '280px' }">
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
           <!-- <span class="operate" style="margin-right: 10px;">uname</span> -->
          <span class="infos">
            <span class="operate" style="margin-right: 10px;">{{userInfo.name}}</span>
          <el-button type="info" icon="el-icon-switch-button" circle @click="exit" style="margin-right: 50px;"></el-button>
          </span>
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px 0 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '600px'
          }"
        >
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer
          >A FAKE SHOP / 条款和条件 / 隐私和COOKIES</a-layout-footer
        >
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Logo from "../Logo";
import {adminMock} from '../../moke/menusMock.js'

export default {
  components: { Logo },
  data() {
    return {
      collapsed: false,
      menusMock: adminMock,
      userInfo:{
        name: "admin",
      },
    };
  },
  created() {
    //从sessionStorage中取出用户并转成json对象,可以正常登录后讲此段代码放开，可以显示正确的登陆用户
    this.init()
  },
  methods: {
    init(){
      if(sessionStorage.getItem("admin")){
       this.userInfo = JSON.parse(sessionStorage.getItem("admin"))
      }
    },
    exit() {
      localStorage.clear();
      this.$router.push('/admin/login')
    },
    index() {
      this.$router.push('/shouye')
    }
  }
};
</script>

<style>
#components-layout-demo-basic .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-basic .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-basic .logo {
  height: 32px;
  margin: 16px;
}
.infos{
  float: right;
}
</style>
