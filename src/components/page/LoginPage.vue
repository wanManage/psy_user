<template>
  <div class="main">
    <a-row :gutter="24">
      <a-col :span="8" :offset="8">
        <div class="title">心理管理测评系统</div>
        <!-- <div class="label">登录</div> -->

         <el-form class="user-layout-login" :model="ruleForm" status-icon label-width="60px" label-position="left" >
            <el-form-item label="用户名" prop="pass">
              <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="consultantLogin" style="width: 45%">咨询师登录</el-button>
              <el-button type="primary" @click="adminLogin" style="width: 48%">管理员登录</el-button>
            </el-form-item>
          </el-form>

        <!-- <a-form id="formLogin" class="user-layout-login" ref="formLogin">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px;"
            message="用户名或密码错误"
          />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="用户名"
              v-model="inputUsername"
              v-decorator="[
                'username',
                {
                  rules: [
                    { required: true, message: '请输入帐户名或邮箱地址' },
                    { validator: handleUsernameOrEmail }
                  ],
                  validateTrigger: 'change'
                }
              ]"
            >
              <a-icon
                slot="prefix"
                type="user"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码"
              v-model="inputPassword"
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入密码' }],
                  validateTrigger: 'blur'
                }
              ]"
            >
              <a-icon
                slot="prefix"
                type="lock"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
            <router-link
              class="register"
              :to="{ name: 'register'}"
              style="float: right;"
              >用户注册</router-link
            >
          </a-form-item>

          <a-form-item style="margin-top:24px">
            <a-button
              size="large"
              type="primary"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
              @click="doLogin"
              >用户登录</a-button
            >
            <a-button
              size="large"
              type="primary"
              class="login-button2"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
              @click="doLogin"
              >咨询师登录</a-button
            >
          </a-form-item>
        </a-form> -->
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import api from '@/api/index'
// import axios from "axios";
import {adminLogin,consultantLogin} from '@/api/index'
export default {
  data() {
    return {
       ruleForm: {
        account: 'admin',
        password: 'admin'
      },
      userInfo: {
        name: 'admin',
        id: 0,
        role: "123456",
      },
      inputUsername: "",
      inputPassword: "",
      customActiveKey: "tab1",
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    };
  },
  created() {},
  methods: {
    adminLogin(){
       adminLogin(this.ruleForm).then(res=>{
            console.log(res.data.data)
            if(res.data.code === 200){//登录成功
                this.userInfo.name = res.data.data.account
                this.userInfo.id =  res.data.data.id
                this.userInfo.role =  0
                sessionStorage.setItem("admin", JSON.stringify(this.userInfo))
                localStorage.setItem("token", res.data.data.token);
                this.$router.push('/admin/board')
            }
        })
    },
    consultantLogin(){
       consultantLogin(this.ruleForm).then(res=>{
            console.log(res.data.data)
            if(res.data.code === 200){//登录成功
                this.userInfo.name = res.data.data.username
                this.userInfo.id =  res.data.data.id
                this.userInfo.role =  1
                sessionStorage.setItem("admin", JSON.stringify(this.userInfo))
                localStorage.setItem("token", res.data.data.token);
                this.$router.push('/admin/board')
            }
        })
    },
    // handler
    // handleUsernameOrEmail(rule, value, callback) {
    //   const { state } = this;
    //   const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    //   if (regex.test(value)) {
    //     state.loginType = 0;
    //   } else {
    //     state.loginType = 1;
    //   }
    //   callback();
    // },
    // handleTabClick(key) {
    //   this.customActiveKey = key;
    // },
    // doLogin() {
    //   axios
    //     .post(api.Login, {
    //       username: this.inputUsername,
    //       password: this.inputPassword
    //     })
    //     .then(response => {
    //       var code = response.data.code;
    //       if (code == 1) {
    //         localStorage.token = response.data.data.jws
    //         localStorage.userId = response.data.data.userId
    //         localStorage.username = response.data.data.username
    //         localStorage.userStatus = response.data.data.status 
    //         this.$router.push({ path: "/" });
    //         // 延迟 1 秒显示欢迎信息
    //         setTimeout(() => {
    //           this.$notification.success({
    //             message: "欢迎",
    //             description: `欢迎回来`
    //           });
    //         }, 1000);
    //         this.isLoginError = false;
    //       } else if (code == 0) {
    //         this.isLoginError = true;
    //         // do something
    //       }
    //     })
    //     .catch(error => {
    //       this.isLoginError = true;
    //       this.$notification["error"]({
    //         message: "错误",
    //         description:
    //           ((error.response || {}).data || {}).message ||
    //           "请求出现错误，请稍后再试",
    //         duration: 4
    //       });
    //     });
    // }
  }
};
</script>

<style lang="less" scoped>
.user-layout-login {
  flex-shrink: 0;
  box-shadow: 0 0 36px #d7dde6;
  border-radius: 16px;
  padding: 36px 48px;
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    // padding: 0 15px;
    margin-right: 60px;
    font-size: 16px;
    height: 40px;
    width: 40%;
  }
  button.login-button2 {
    // padding: 0 15px;
    // margin-right: 80px;
    font-size: 16px;
    height: 40px;
    width: 40%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
.main {
  margin: 150px 0;
  background:url(../../assets/background.svg);
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
.title {
  margin-left: 100px;
  font-size: 28px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
  margin-bottom: 24px;
}

.label {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  margin-bottom: 16px;
}
</style>