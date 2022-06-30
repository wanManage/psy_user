import Vue from "vue";
import router from "./router";
import Antd from "ant-design-vue";
import App from "./App.vue";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
