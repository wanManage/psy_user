<template>
<div class="home-container" >
<el-container style="min-height: 900px;">
  <!-- <el-aside width="300px" >
      <el-card shadow="always">
        <span>系统公告</span>
        <el-divider></el-divider>
        <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
    </el-card>
  </el-aside> -->
  
  <el-container>
    
    <el-main style="padding-top: 0px;" >
    <div  v-for="(data, index) of pageInfo.data" :key="index" @click="deatil(data.id)">
    <el-card class="introCard" >
      <el-row :gutter="20" >
        <el-col :span="19"><div class="title" >{{data.title}}</div>
          <div class="describe">测测你的内心缺少了什么情感能量？</div>
          <div class="tis">
            <span class="testnum"> <el-icon :size="18" class="tis-icon"><edit /></el-icon> <label>3760人已测</label></span>
            <span class="comment"> <label>391</label></span>
            <span class="keep"> <label>660</label> </span>
            <span class="date"><label>{{data.createTime | formatDate}}</label></span>
          </div></el-col>
              <el-col :span="5"><div >
                <el-image
            style="width: 100px; height: 100px"
            src="https://imgco.xinli001.com/ceping/lingxi/scalePool/227d17b099de46b2a00e1efdae754656.png?x-oss-process=image/resize,p_60/quality,Q_80"
            :fit="fit"></el-image>
            <!-- <img src="https://imgco.xinli001.com/ceping/lingxi/scalePool/227d17b099de46b2a00e1efdae754656.png?x-oss-process=image/resize,p_60/quality,Q_80"> -->
          </div>
        </el-col>
      </el-row>
  </el-card>
  </div>

    
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

<script>
import {getpsychTesteAll} from '@/api/index'
import {makeSimpleDate} from '../../common/js/dateformat'
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        searchData:{
            num: 1,
            size: 10,
        },
        tableData: Array(20).fill(item),
        pageInfo:{
            pageIndex: 1,
            pageSize: 10,
            totalCount: 13,
            totalPage: 1,
            data:[
                {
                title: "",
                createTime:"",
              }
            ]
        } ,//查询的数据
      }
    },
    created(){
      // this.userInfo = JSON.parse(sessionStorage.getItem("admin"))
        
      this.getAll()
    },
    methods: {
      getAll(){
        getpsychTesteAll(this.searchData).then(res=>{
            if(res.data.code === 200){
                if(res.data.data){
                  this.pageInfo = res.data.data
                }
            }
        })
      },
        deatil(id){
          this.$router.push(`/test/${id}`)
    },
    },
  
    filters:{
            formatDate(val){
                return makeSimpleDate(val)
            }
        }
  };
</script>

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
  .introCard{
  /* width: 700px; */
  height: 140px;
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;
  }
  .title{
    font-size: 20px;
    color: #333;
    letter-spacing: .25px;
    text-align: left;
  }
  .describe{
    font-size: 14px;
    color: #999;
    line-height: 1.4em;
    height: 3em;
    margin-top: 10px;
  }
  .tis label{
    position: relative;
    margin-right: 50px;
    line-height: 18px;
  }
  .tis-icon{
    display: inline-block;
    top: 5px;
  }
  .img{
    width: 173px;
    height: 115px;
    position: absolute;
    right: 0;
    top: 20px;
    overflow: hidden;
  }
  .img image{
    width: 100%;
  }
</style>
