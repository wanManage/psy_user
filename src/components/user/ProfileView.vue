<template>
  <div class="account-main">
    <div class="account-left"><UserNav skey="1"></UserNav></div>
    <div class="account-right">
      <div class="account-title">基础设置</div>
      <div class="setting" style="margin-bottom: 16px">
        <label>昵称</label><br>
        <a-input placeholder="给自己起个名字" v-model="nickname" style="width: 300px"></a-input>
      </div>

      <div class="setting" style="margin-bottom: 16px">
        <label>邮箱</label><br>
        <a-input v-model="username" disabled style="width: 300px"></a-input>
      </div>

      <div class="setting" style="margin-bottom: 16px">
        <label>年龄</label><br>
        <a-input
          placeholder="请输入年龄"
          v-model="age"
          :maxLength="25"
          style="width: 120px"
        ></a-input>
      </div>

      <div class="setting" style="margin-bottom: 16px">
        <label>性别</label> <br />
        <a-select
          defaultValue="请选择性别"
          style="width: 120px"
          v-model="gender"
        >
          <a-select-option value="">保密</a-select-option>
          <a-select-option value="M">男</a-select-option>
          <a-select-option value="F">女</a-select-option>
        </a-select>
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
      nickname: "",
      username: localStorage.username,
      age: "",
      gender: ""
    };
  },
  methods: {
    submit() {
      if (this.nickname == '' || this.age == '' || this.username == '') {
        this.$message.error('昵称或年龄不能为空')
        return
      }
      axios
      .put(api.User+ '/' + localStorage.userId, {
        username: this.username,
        nickname: this.nickname,
        age: this.age,
        gender: this.gender
      }, {
        headers: { Authorization: localStorage.token }
      })
      .then(response => {
        if (response.data.code == 1) {
          this.$message.success('资料更新成功')
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
