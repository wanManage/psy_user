<template>
  <div id="mymenu">
    <a-menu v-model="current" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="home"><logo/> </a-menu-item>
      <a-menu-item key="news"> <a-icon type="mail" />资讯 </a-menu-item>
      <a-menu-item key="help"> <a-icon type="appstore" />扶贫帮助 </a-menu-item>
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper"
          ><a-icon type="setting" />在线帮扶</span
        >
        <a-menu-item-group title="Item 1">
          <a-menu-item key="setting:1">Option 1</a-menu-item>
          <a-menu-item key="setting:2">Option 2</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Item 2">
          <a-menu-item key="setting:3">Option 3</a-menu-item>
          <a-menu-item key="setting:4">Option 4</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
       <a-menu-item key="query"> <a-icon type="appstore" />进度查询 </a-menu-item>
       <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper"
          ><a-icon type="setting" />个人中心</span>
        
          <a-menu-item key="profile"><router-link to="/user/profile">我的主页</router-link></a-menu-item>
          <a-menu-item key="message"><router-link to="/user/message">消息盒子</router-link></a-menu-item>
      
      </a-sub-menu>
        <a-menu-item key="market"> <a-icon type="appstore" />积分商城 </a-menu-item>
      
    </a-menu>
  </div>
</template>
<script>
import Logo from "./Logo"
  export default {
    name: "TopMenu",
    components: {Logo},
    data() {
      return {
        current: ['home'],
      };
    },
  };
</script>

