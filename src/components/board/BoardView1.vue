<template>
  <div id="b">
    <div class="home-container" >
      <div style="float: left;border-width: 1px;">
aaaaaaa
      </div>
   
    <div class="title">系统公告</div>
    <div class="main">
      {{ content }}
    </div>
    <!-- <div class="appendix">更新时间 {{ readableDate }}</div> -->
    <div class="appendix">更新时间 2022/4/20</div>
    </div>

  </div>
</template>

<script>
import api from "@/api/index";
import axios from "axios";
export default {
  data() {
    return {
      content: "系统于2022/4/20 22:00 进行更新，请错开使用时间！！！！",
      updateDate: "2022/4/20"
    };
  },
  computed: {
    readableDate() {
      if (this.updateDate == "") {
        return "无";
      }
      return new Date(parseInt(this.updateDate))
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");
    }
  },
  mounted() {
    axios
      .get(api.Board, {
        headers: { Authorization: localStorage.token }
      })
      .then(response => {
        this.content = response.data.data.content;
        this.updateDate = response.data.data.createTime;
      })
      .catch(error => {
        if (error.response.status == 401) {
          this.$router.push({ path: "/login" });
        }
        console.log(error);
      });
  }
};
</script>

<style lang="less">
.home-container{
    min-width: 1020px;
    margin:0px auto;
    width: 1020px;
}
</style>