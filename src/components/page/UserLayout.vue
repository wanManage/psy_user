<template>
  <a-layout id="user-layout" class="layout">
    <a-layout-header style="background: #1973c8;">
      <a-menu
        v-model="current"
        mode="horizontal"
        theme="dark"
        :style="{ lineHeight: '64px',background: '#1973c8' }"
      >
        <a-menu-item><Logo title="高校心理咨询平台" /> </a-menu-item>

        <a-menu-item key="board">
          <router-link to="/board"
            ><a-icon type="notification" /> 公告
          </router-link>
        </a-menu-item>

        <a-menu-item key="posts">
          <router-link to="/posts"><a-icon type="read" /> 文章 </router-link>
        </a-menu-item>

        <a-menu-item key="test">
          <router-link to="/test">
            <a-icon type="project" /> 在线测评</router-link
          >
        </a-menu-item>

        <a-menu-item key="talk">
          <router-link to="/talk"
            ><a-icon type="file-text" /> 咨询师</router-link
          >
        </a-menu-item>

        <a-menu-item key="profile">
          <router-link to="/user"> <a-icon type="user" />个人中心</router-link>
        </a-menu-item>

        <a-menu-item key="dashboard" v-show="showAdmin">
          <router-link to="/admin"> <a-icon type="project" />后台管理</router-link>
        </a-menu-item>

        <a-menu-item style="float: right" @click="logout">
          <span class="operate" style="margin-right: 10px;">{{userInfo.name}}</span>
          <a-icon type="logout" />
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="">
      <!-- <a-row>
        <a-col :md="{ span: 16, offset: 4 }" :xs="{ span: 20, offset: 2 }"> -->
          <div
            :style="{ background: '#fff', padding: '24px', minHeight: '600px' }"
          >
          
            <router-view></router-view>
          </div>
        <!-- </a-col>
      </a-row> -->
    </a-layout-content>
    <!-- <a-layout-footer style="text-align: center">
      CPCP 高校心理资讯平台 ©2020
    </a-layout-footer> -->
  </a-layout>
</template>
<script>
import Logo from "../Logo";
export default {
  components: { Logo },
  data() {
    return {
      current: [""],
      username: localStorage.username,
      showAdmin: false,
      userInfo: {
        name: '133987',
        id: 0,
        role: "123456",
      },
    };
  },
  created() {
    //从sessionStorage中取出用户并转成json对象,可以正常登录后讲此段代码放开，可以显示正确的登陆用户
    this.userInfo = JSON.parse(sessionStorage.getItem("admin"))
    console.log(this.userInfo)
  },
  mounted() {
    this.showAdmin = localStorage.userStatus == 999 ? true : false;
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style>
.title {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  margin-bottom: 16px;
}

.main {
  font-size: 16px;
  margin: 0 8px;
  line-height: 1.75em;
}

.appendix {
  font-size: 14px;
  width: 100%;
  color: rgba(0, 0, 0, 0.55);
  font-weight: 500;
  margin: 16px 0;
}
</style>
