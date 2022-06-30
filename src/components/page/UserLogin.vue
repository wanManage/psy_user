<template> 
  <div class="main">
    <a-row :gutter="24">
      <a-col :span="8" :offset="8">
        <div class="title">心理测评用户登录</div>
        <!-- <div class="label">登录</div> -->

         <el-form class="user-layout-login" :model="ruleForm" status-icon label-width="60px" label-position="left" >
            <el-form-item label="电话" prop="pass">
              <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login" style="width: 45%">登录</el-button>
              <el-button type="primary" @click="adminLogin" style="width: 48%">忘记密码</el-button>
            </el-form-item>
          </el-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import api from '@/api/index'
// import axios from "axios";
import {UserLogin} from '@/api/index'
export default {
  data() {
    return {
       ruleForm: {
        phone: '133987',
        password: '123456'
      },
      userInfo: {
        name: '133987',
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
    login(){
       UserLogin(this.ruleForm).then(res=>{
            console.log(res.data.data)
            if(res.data.code === 200){//登录成功
                this.userInfo.name = res.data.data.username
                this.userInfo.id =  res.data.data.id
                this.userInfo.role =  2
                sessionStorage.setItem("admin", JSON.stringify(this.userInfo))
                localStorage.setItem("token", res.data.data.token);
                this.$router.push('/board')
            }
        })
    },
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