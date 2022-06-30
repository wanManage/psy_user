<template>
  <div class="account-main">
    <div class="account-left"><UserNav skey="2"></UserNav></div>
    <div class="account-right">
      <div class="title">安全设置</div>
      <div class="setting" style="margin-bottom: 16px">
        <label>旧密码</label><br>
        <a-input-password placeholder="请输入现在的密码" v-model="oldPassword" style="width: 300px" />
      </div>

      <div class="setting" style="margin-bottom: 16px">
        <label>新密码</label><br>
        <a-input-password placeholder="建议使用安全强度高的密码" v-model="newPassword" style="width: 300px"></a-input-password>
      </div>

      <a-button type="primary" style="float: right" @click="submit">更新设置</a-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import axios from 'axios'
import UserNav from "./UserNav";
export default {
  components: {
    UserNav
  },
  data() {
    return {
        oldPassword: '',
        newPassword: ''
    };
  },
  methods: {
    submit() {
      axios
      .put(api.User + '/' + localStorage.userId + '/password', {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }, {
        headers: { Authorization: localStorage.token }
      })
      .then(response => {
        if (response.data.code == 1) {
          this.$message.success('密码更改成功')
        } else if (response.data.code == 0) {
          this.$message.error('请检查输入，以及旧密码是否正确')
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
  }
}
</style>
