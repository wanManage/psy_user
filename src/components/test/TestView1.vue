<template>
  <div id="test">
    <a-row>
      <a-col :span="12" :offset="6">
        <div class="title" style="margin: 16px; width: 100%;text-align: center;">心理测试</div>
        <a-list size="large" :dataSource="data" itemLayout="vertical">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <div class="question">{{ index + 1 }}. {{ item.question }}</div>

            <div class="choice">
              <a-radio-group @change="onChange">
                <a-radio :style="radioStyle" :value="index+'A'">{{ item.ansA }}</a-radio>
                <a-radio :style="radioStyle" :value="index+'B'">{{ item.ansB }}</a-radio>
                <a-radio :style="radioStyle" :value="index+'C'">{{ item.ansC }}</a-radio>
                <a-radio :style="radioStyle" :value="index+'D'">{{ item.ansD }}</a-radio>
              </a-radio-group>
            </div>
          </a-list-item>
        </a-list>
        <center> <a-button type="primary" size="large" @click="submit">提交</a-button></center>
       
      </a-col>
    </a-row>
  </div>
</template>
<script>
import api from '@/api/index'
import axios from 'axios'

export default {
  data() {
    return {
      data: [],
      checkedList: [],
      completed: false,
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      }
    };
  },
  methods: {
    onChange(e) {
      console.log("radio checked", e.target.value);
      this.checkedList.push(e.target.value)
    },
    submit() {
      if (this.completed) {
        this.$message.success("您已经完成本次心理测试")
        return
      }
      axios
      .post(api.TestResult, {
        userId: localStorage.userId,
        checkedList: this.checkedList
      }, {
        headers: { Authorization: localStorage.token }
      })
      .then(response => {
        if (response.data.code == 1) {
          this.$message.success("提交成功")
          this.completed = true
        }
      })
    }
  },
  mounted() {
    axios
    .get(api.Test, {
      headers: { Authorization: localStorage.token }
    })
    .then(response => {
        this.data = response.data.data
    })
    .catch(error => {
      if (error.response.status == 401) {
        this.$router.push({path: '/login'})
      }
    })
  }
};
</script>
<style>
#test {
  margin: 0 0;
}
.question {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 16px;
}
</style>
