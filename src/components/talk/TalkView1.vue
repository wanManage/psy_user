<template>
  <div>
    
    <h3>对本站的意见或一些相关的信息</h3>
    <a-textarea placeholder="请输入留言" :rows="6" v-model="data" />
    <a-button type="primary" style="margin: 32px 0 0 0; float: right" @click="submit">提交</a-button>
  </div>
</template>

<script>
import api from '@/api/index'
import axios from 'axios'
export default {
  data() {
    return {
      data: ""
    };
  },
  methods: {
    submit() {
      axios
      .post(api.Talk, {
        userId: localStorage.userId,
        username: localStorage.username,
        content: this.data
      }, {
        headers: { Authorization: localStorage.token }
      })
      .then(response => {
        if (response.data.code == 1) {
          this.$message.success('提交成功')
        } else {
          this.$message.error(response.data.text)
        }
      })
    }
  }
};
</script>
