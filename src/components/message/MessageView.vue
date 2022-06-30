<template>
  <div class="account-main">
    
    <div class="account-right">
      <div class="account-title">{{ this.cname }}</div>

      <!-- <a-spin tip="加载中..." :spinning="spinning"> -->
      <a-card style="height: 400px; background-color: #fafafa; overflow: auto">
        <div v-for="item in messages" v-bind:key="item.id">
          <MsgItem
            v-show="item.toId == ruleForm.formId"
            pos="left"
            :content="item.message"
            avatar="https://i.loli.net/2020/03/02/TP81J27RbG3yixC.jpg"
          ></MsgItem>
          <MsgItem
            v-show="item.formId == ruleForm.formId"
            pos="right"
            :content="item.message"
            :avatar="data.bAvatar"
          ></MsgItem>
        </div>
      </a-card>
      <!-- </a-spin> -->

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
          v-model="ruleForm.message"
          maxlength="500"
        ></textarea>
        <div style="float: right;">
          <span style="color: #c5c5c5">{{ ruleForm.message.length }}/500 字</span>
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
import MsgItem from "@/components/message/MsgItem";
import {addChatMsg,getChatMsgAll,getConsultant} from '@/api/index'
export default {
   inject: ['reload'],
  components: {
    MsgItem
  },
  data() {
    return {
      spinning: true,
      msgInput: "",
      loading: false,
      data: [ 
      ],
      ruleForm: {
        formId: "",
        toId: "",
        message: "",
      },
      cname: "",
      messages:[
      ],
      userInfo:{

      },
    };
  },
  created () {
    this.userInfo = JSON.parse(sessionStorage.getItem("admin"))
    this.ruleForm.formId = "u"+ this.userInfo.id
    this.ruleForm.toId = "c"+this.$route.params.id
    console.log("kong")
    this.init()
    this.getAll()
  },
  computed: {
      id () {
          return this.$route.params.id
      },
  }, 
  mounted() {
    const timer = setInterval(() => {
      this.getAll()
    }, 1000* 5);
    // 通过$once来监听定时器
    // 在beforeDestroy钩子触发时清除定时器
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    init(){
        getConsultant(this.$route.params.id).then(res=>{
            console.log(res.data.data.username)
            if(res.data.code === 200){//登录成功
                this.cname = res.data.data.username
            }
        })
    },
    getAll(){
        getChatMsgAll(this.ruleForm).then(res=>{
            console.log(res.data.data)
            if(res.data.code === 200){//登录成功
                if(res.data.data){
                        this.messages = res.data.data
                }else{
                        delete this.messages;
                }
            }
        })
    },
    send() {
      addChatMsg(this.ruleForm).then(res=>{
            console.log(res.data.data)
            if(res.data.code === 200){//登录成功
                if(res.data.data){
                        this.messages = res.data.data
                }else{
                        delete this.messages;
                }
                this.success()
                this.reload()
            }
        })
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
    },
     success(){
        this.$message({
            message:'消息发送成功',
            type:'success'
        });
    }
  }
};
</script>

<style lang="less" scoped>
.account-main {
    min-width: 1020px;
    margin:0px auto;
    width: 70%;

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
