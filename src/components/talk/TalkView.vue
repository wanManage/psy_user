<template>
<div class="home-container" >

  <div style="padding-left: 20px;">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
          <el-form-item label="咨询师名字">
              <el-input  v-model="searchData.username" placeholder="咨询师名字" clearable></el-input>
          </el-form-item>
          <el-form-item label="性别">
              <el-select  v-model="searchData.sex"  placeholder="请选择需要查询的性别" clearable> 
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="getAll">查询</el-button>
          </el-form-item>
      </el-form>
  </div>
<el-container style="min-height: 900px;">
  <el-container>
    
    <el-main style="padding-top: 0px;">
     <el-card class="consultant" v-for="(consultant, index) of pageInfo.data" :key="index">
       <el-row :gutter="20">
        <el-col :span="5">
          <div style="margin-left: 10px;">
            <img class="talkImg" :src="consultant.img == null? 'https://imgco.xinli001.com/ceping/lingxi/scalePool/227d17b099de46b2a00e1efdae754656.png?x-oss-process=image/resize,p_60/quality,Q_80': consultant.img"  />
          </div>
        </el-col>
        <el-col :span="15">
          <div class="title">{{consultant.username}}</div>
          <div class="describe">测测你的内心缺少了什么情感能量？</div>
          <div class="tis">
            <span class="testnum"> <el-icon :size="18" class="tis-icon"><edit /></el-icon> <label>3760人已测</label></span>
            <span class="comment"> <label>391</label></span>
              <span  class="price">￥600</span>
            </div>
        </el-col>
        <el-col :span="2">
          <el-button round @click="message(consultant.id)" style="margin-top: 35px;border: 1px solid #6982fa;color: #6982fa;">心理咨询</el-button>
        </el-col>
        </el-row>
      </el-card>
    </el-main>

    <el-aside width="300px" >
      <el-card shadow="always">
        <span>系统公告</span>
        <el-divider></el-divider>
        <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
      </el-card>
    </el-aside>
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

  .talkImg{
    width: 110px;
    height: 110px;
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
    box-sizing: border-box;
  }
  .consultant{
    margin-bottom: 20px;
  }
  .price{
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #ffa202;
  }
</style>

<script>
import {getConsultantAll} from '@/api/index'
  export default {
    data() {
      return {
        searchData:{
                    num: 1,
                    size: 10,
                    username:'',
                    idCard:'',
                    account: "",
                    sex: "",
                },
                pageInfo:{
                    pageIndex: 1,
                    pageSize: 10,
                    totalCount: 13,
                    totalPage: 1,
                    data:[
                       
                    ]
                } ,//查询的数据
      }
    },
    created(){
      this.getAll()
    },
    methods:{
      getAll(){
          if (this.searchData.username == ""){
            console.log("kong")
            delete this.searchData.username;
              // this.$delete(this.searchData,'name'); 
          }
          if (this.searchData.sex == ""){
              console.log("kong")
              delete this.searchData.sex;
              // this.$delete(this.searchData,'name'); 
          }
          for (let key in this.searchData) {
              // 如果对象属性的值不为空，就保存该属性（如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
              if (this.searchData[key] === "") {
                  delete this.searchData[key];
              }
          }
          getConsultantAll(this.searchData).then(res=>{
              console.log(res.data.data)
              if(res.data.code === 200){//登录成功
                  if(res.data.data){
                      this.pageInfo = res.data.data
                      console.log(this.pageInfo)
                  }else{
                      this.pageInfo.totalCount = 0
                      this.pageInfo.pageIndex = 0
                      delete this.pageInfo.data;
                  }
              }
          })
      },
      message(id){ 
        this.$router.push(`/message/${id}`)
      }
    }
  };
</script>