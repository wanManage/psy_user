<template>
  <div class="account-main">
    <div class="account-left"><UserNav skey="3"></UserNav></div>
    <div class="account-right">
      <div class="account-title">消息中心</div>

      <a-spin tip="加载中..." :spinning="spinning">
      <a-card style="height: 400px; background-color: #fafafa; overflow: auto">
        <div v-for="item in data.messages" v-bind:key="item.id">
          <MsgItem
            v-show="item.fromId == 0"
            pos="left"
            :content="item.msgContent"
            avatar="https://i.loli.net/2020/03/02/TP81J27RbG3yixC.jpg"
          ></MsgItem>
          <MsgItem
            v-show="item.fromId != 0"
            pos="right"
            :content="item.msgContent"
            :avatar="data.bAvatar"
          ></MsgItem>
        </div>
      </a-card>
      </a-spin>

      <div class="action-area">
        <a-icon
          type="picture"
          style="font-size: 1.25em; margin: 8px 8px 8px 16px"
        />
        <a-icon type="paper-clip" style="font-size: 1.25em; margin: 8px" />
      </div>
      <div class="input-area">
        <textarea
          placeholder="回复一下吧～"
          style="resize: none; outline: 0; border: 0; margin: 0; width: 100%; height: 60px; background-color: #fafafa"
          v-model="msgInput"
          maxlength="500"
        ></textarea>
        <div style="float: right;">
          <span style="color: #c5c5c5">{{ msgInput.length }}/500 字</span>
          <a-button
            style="margin: 16px 16px; width: 80px"
            @click="send"
            :loading="loading"
            >发送</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import axios from "axios";
import UserNav from "./UserNav";
import MsgItem from "./MsgItem";
export default {
  components: {
    UserNav,
    MsgItem
  },
  data() {
    return {
      spinning: true,
      msgInput: "",
      loading: false,
      data: []
    };
  },
  mounted() {
    const timer = setInterval(() => {
      this.fetchList()
    }, 2000);
    // 通过$once来监听定时器
    // 在beforeDestroy钩子触发时清除定时器
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    send() {
      this.loading = true;
      axios
        .post(
          api.Message,
          {
            from_id: localStorage.userId,
            to_id: "0",
            content: this.msgInput
          },
          {
            headers: { Authorization: localStorage.token }
          }
        )
        .then(response => {
          if (response.data.code == 1) {
            this.msgInput = "";
          }
        });
    },
    fetchList() {
      axios
        .get(api.Message, {
          params: {
            a_id: "0",
            b_id: localStorage.userId
          },
          headers: { Authorization: localStorage.token }
        })
        .then(response => {
          if (response.data.code == 1) {
            this.data = response.data.data;
            this.loading = false;
            this.spinning = false;
            // setTimeout(() => {
            //   this.fetchList();
            // }, 3000);
          }
        })
        .catch(error => {
          if (error.response.status == 401) {
            this.$router.push({path: '/login'})
          }
        })
    }
  }
};
</script>

<style lang="less" scoped>
.account-main {
  width: 100%;
  display: flex;
  height: 100%;
  overflow: auto;

  &.mobile {
    display: block;

    .account-left {
      border-right: unset;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      height: 50px;
      overflow-x: auto;
      overflow-y: scroll;
    }
    .account-right {
      padding: 20px 40px;
    }
  }

  .account-left {
    border-right: 1px solid #e8e8e8;
    width: 224px;
  }

  .account-right {
    flex: 1 1;
    padding: 8px 40px;
    margin-left: 16px;

    .account-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin-bottom: 12px;
    }
    .account-view {
      padding-top: 12px;
    }
    .title-area {
      border-left: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
      border-top: 1px solid #e5e5e5;
      height: 45px;
    }
    .input-area {
      border-left: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      height: 150px;
      padding: 16px;
      background-color: #fafafa;
    }
    .action-area {
      border-top: 1px solid #e5e5e5;
      border-left: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
      // background-color: #f1f1f1
      background-color: #fafafa;
    }
  }
}
</style>
