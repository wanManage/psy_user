<template>
  <div id="test">
    <a-row>
      <a-col :span="12" :offset="6">
        <div class="title" style="margin: 16px; width: 100%;text-align: center;">{{testData.title}}</div>

        <div v-for="(question, index) of testData.questions" :key="index" style="padding-top: 20px; padding-bottom: 20px; border-bottom: 1px solid #e8e8e8;">
          <div class="question">{{ index + 1 }}. {{ question.title }}</div>

            <div class="choice">
              <el-radio-group v-model="testResult[index]" >
                <el-radio :style="radioStyle" :label="question.id+'-'+answer.id" v-for="(answer, ind) of question.answers" :key="ind">{{answer.answer }}</el-radio>
               </el-radio-group>
            </div>
        </div>
        <center> <a-button type="primary" size="large" @click="submit" style="margin-top: 30px;">提交</a-button></center>
       
      </a-col>
    </a-row>
  </div>
</template>
<script>
import {getpsychTest,addTestResult} from '@/api/index'

export default {
  data() {
    return {
      testData:{
        title: "",
        createTime: "2022-05-16T17:43:06.000+0000",
        questions: [{
          title: "",
          answers: []
        }, 
        ]
      },
      test3: "2",
      data: [],
      checkedList: [],
      completed: false,
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      },
      testResult:[],
      formDate:{
        questionResults:[],
      }, 
      userInfo: {
        name: '133987',
        id: 0,
        role: "123456",
      },
    };
  },
  created(){
    this.userInfo = JSON.parse(sessionStorage.getItem("admin"))
      this.getTest()
  },
  methods: {
    getTest(){
      const tid = this.$route.params.id
      getpsychTest(tid).then(res=>{
          if(res.data.code === 200){//登录成功
              if(res.data.data){
                console.log( res.data.data.questions.length)
                this.testResult = new Array(res.data.data.questions.length).fill()
                console.log(this.testResult)
                this.testData = res.data.data
              }
          }
      })
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
      this.testResult.questionResults.push(e.target.value)
    },
    submit() {
      if (this.completed) {
        this.$message.success("您已经完成本次心理测试")
        return
      }
     this.testResult.findIndex((item) => {
      this.formDate.questionResults.push({
          result:item
        })
      });
      console.log(this.formDate.questionResults)
      this.formDate.tid = this.testData.id
      this.formDate.uid = this.userInfo.id
      addTestResult(this.formDate).then(res=>{
          if(res.data.code === 200){//登录成功
              if(res.data.data){
                 this.success()
                this.$router.push({path: '/test'})
              }
          }
      })

    },
    success(){
                this.$message({
                    message:'操作成功',
                    type:'success'
                });
            }
  },
  // mounted() {
  //   axios
  //   .get(api.Test, {
  //     headers: { Authorization: localStorage.token }
  //   })
  //   .then(response => {
  //       this.data = response.data.data
  //   })
  //   .catch(error => {
  //     if (error.response.status == 401) {
  //       this.$router.push({path: '/login'})
  //     }
  //   })
  // }
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
