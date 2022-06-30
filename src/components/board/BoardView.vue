<template>
<div class="home-container" >
<el-container style="min-height: 900px;">
  <el-aside width="300px" >
      <el-card shadow="always">
        <span>系统公告</span>
        <el-divider></el-divider>
        <span> {{ this.notice.context  }}</span>
    </el-card>
  </el-aside>
  
  <el-container>
    
    <el-main style=" border: 1px solid #eee;margin-left: 10px;">
   <div class="title" style="text-align:center">系统公告</div>
    <!-- <div class="main">
      {{ content }}
    </div> -->
    <!-- <div class="appendix">更新时间 {{ readableDate }}</div> -->
    <span>发布时间：{{ this.notice.updateTime | formatDate }}</span>
    <!-- <span style="margin-left: 40px;">发布人：2022-05-14</span> -->
    <!-- <div class="appendix">更新时间 2022/4/20</div> -->
     <div class="main" style="margin-top: 20px;padding-left: 20px;">
      {{ this.notice.context  }}
    </div>
    </el-main>
  </el-container>
</el-container>
</div>

</template>

<style>
.home-container{
    min-width: 1020px;
    margin:0px auto;
    width: 80%;
}
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
import {getNotice} from '@/api/index'
  import {makeDate} from '@/common/js/dateformat'
  export default {
    data() {
      return {
        notice: {
          id: 1,
          title: "系统公告",
          context: "",
        }
      }
    },
    created() {
    this. getdata()
    },
    methods: {
      getdata(){
        getNotice(1).then(res=>{
              console.log(res.data.data)
              if(res.data.code === 200){//登录成功
                this.notice = res.data.data
              }
          })
      },
    },
    filters:{
        formatDate(val){
            return makeDate(val)
        }
    }
  }
</script>