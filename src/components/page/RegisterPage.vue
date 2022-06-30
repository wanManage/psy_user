<template>
  <div class="main user-layout-register">
    <a-row :gutter="24">
      <a-col :span="8" :offset="8">
        <div class="title">CPCP 高校心理咨询平台</div>
        <div class="label">注册
        </div>
        <a-form ref="formRegister" :form="form" id="formRegister">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="邮箱"
              v-model="inputEmail"
              v-decorator="[
                'email',
                {
                  rules: [
                    { required: true, type: 'email', message: '请输入邮箱地址' }
                  ],
                  validateTrigger: ['change', 'blur']
                }
              ]"
            ></a-input>
          </a-form-item>

          <a-popover
            placement="rightTop"
            :trigger="['focus']"
            :getPopupContainer="trigger => trigger.parentElement"
            v-model="state.passwordLevelChecked"
          >
            <template slot="content">
              <div :style="{ width: '240px' }">
                <div :class="['user-register', passwordLevelClass]">
                  强度：<span>{{ passwordLevelName }}</span>
                </div>
                <a-progress
                  :percent="state.percent"
                  :showInfo="false"
                  :strokeColor="passwordLevelColor"
                />
                <div style="margin-top: 10px;">
                  <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                </div>
              </div>
            </template>
            <a-form-item>
              <a-input
                size="large"
                type="password"
                @click="handlePasswordInputClick"
                autocomplete="false"
                placeholder="至少6位密码，区分大小写"
                v-model="inputPassword"
                v-decorator="[
                  'password',
                  {
                    rules: [
                      { required: true, message: '至少6位密码，区分大小写' },
                      { validator: this.handlePasswordLevel }
                    ],
                    validateTrigger: ['change', 'blur']
                  }
                ]"
              ></a-input>
            </a-form-item>
          </a-popover>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="确认密码"
              v-model="inputPassword2"
              v-decorator="[
                'password2',
                {
                  rules: [
                    { required: true, message: '至少6位密码，区分大小写' },
                    { validator: this.handlePasswordCheck }
                  ],
                  validateTrigger: ['change', 'blur']
                }
              ]"
            ></a-input>
          </a-form-item>

          <a-alert
                v-if="isRegisterError"
                type="error"
                showIcon
                style="margin-bottom: 24px;"
                message="该邮箱已存在"
              />

          <a-form-item>
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="register-button"
              :loading="registerBtn"
              @click="doRegister"
              :disabled="registerBtn"
              >注册
            </a-button>
            <router-link class="login" :to="{ name: 'login' }"
              >使用已有账户登录</router-link
            >
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import api from '@/api/index'
import axios from "axios";
const levelNames = {
  0: "低",
  1: "低",
  2: "中",
  3: "强"
};
const levelClass = {
  0: "error",
  1: "error",
  2: "warning",
  3: "success"
};
const levelColor = {
  0: "#ff0000",
  1: "#ff0000",
  2: "#ff7e05",
  3: "#52c41a"
};
export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      inputEmail: "",
      inputPassword: "",
      inputPassword2: "",
      isRegisterError: false,

      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: "#FF0000"
      },
      registerBtn: false
    };
  },
  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel];
    },
    passwordLevelName() {
      return levelNames[this.state.passwordLevel];
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel];
    }
  },
  methods: {
    handlePasswordLevel(rule, value, callback) {
      let level = 0;

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++;
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++;
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++;
      }
      this.state.passwordLevel = level;
      this.state.percent = level * 30;
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100;
        }
        callback();
      } else {
        if (level === 0) {
          this.state.percent = 10;
        }
        callback(new Error("密码强度不够"));
      }
    },

    handlePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue("password");
      //   console.log('value', value)
      if (value === undefined) {
        callback(new Error("请输入密码"));
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error("两次密码不一致"));
      }
      callback();
    },

    handlePasswordInputClick() {
      if (!this.isMobile()) {
        this.state.passwordLevelChecked = true;
        return;
      }
      this.state.passwordLevelChecked = false;
    },

    doRegister() {
      axios
        .post(api.Register, {
          username: this.inputEmail,
          password: this.inputPassword
        })
        .then(response => {
          var code = response.data.code;
          if (code == 1) {
            this.$router.push({ path: "/login" });
          } else if (code == 0) {
            // do something
            this.isRegisterError = true;
          }
        })
        .catch(error => {
          this.$notification["error"]({
            message: "错误",
            description:
              ((error.response || {}).data || {}).message ||
              "请求出现错误，请稍后再试",
            duration: 4
          });
          this.registerBtn = false;
        });
    },

    handleSubmit() {
      const {
        form: { validateFields },
        state,
        $router
      } = this;
      validateFields({ force: true }, (err, values) => {
        if (!err) {
          state.passwordLevelChecked = false;
          $router.push({ name: "registerResult", params: { ...values } });
        }
      });
    }
  }
};
</script>
<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
.main {
  margin: 150px 0;
}
.title {
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
