<template>
<div class="home-container" >
  <div style="padding-left: 20px;">
        <el-form :inline="true" :model="searchData" class="demo-form-inline">
            <el-form-item label="文章标题">
                <el-input  v-model="searchData.title" placeholder="文章标题" clearable></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary"  @click="getAll">查询</el-button>
            </el-form-item>
            
        </el-form>
    </div>
<el-container style="min-height: 900px;">

  
  <el-container>
    <el-main style=" padding-top: 0px;">
    <el-card class="article_card" v-for="(article, index) of pageInfo.data" :key="index">
      <div  class="content" @click="deatil(article.id)">
        <el-row :gutter="20">
          <el-col :span="6">          
            <img :src="article.img == null? 'https://ossimg.xinli001.com/20200221/2fe9a2e7e659d487a8aa22b38a709fb8.jpeg?x-oss-process=image/quality,Q_80': article.img"  class="image"/>
          </el-col>
          <el-col :span="18">
            <div class="article">
              <P class="art_title">
                {{article.title}}
              </P>
              <!-- <P class="Context">
                {{article.context}}
              </P> -->
              <p class="time" style="padding-top: 50px;">发布时间：{{article.updateTime | formatDate }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    
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

  .article_card{
    height: 136px;
    width: 480px;
    margin-right: 20px;
    margin-top: 20px;
    border-radius: 10px;
    float: left;
  }
 .article_card.content {
    display: flex;
  }
  .art_title{
    font-size: 16px;
    color: #333;
    font-weight: 700;
    margin-bottom: 8px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin-right: 35px;
  }
 .image {
    width: 88px;
    height: 88px;
    object-fit: cover;
    object-position: center;
  }
  .time{
    font-size: 12px;
    /* color: #5c96ff; */
    color: #999;
    line-height: 14px;
  }
</style>

<script>
 import {getArticleAll} from '@/api/index'
  import {makeDate} from '@/common/js/dateformat'
  export default {
    data() {
     return {
          loading:false,
          currentPage:1,
          // pageInfo: {},
          form:{//提交查询的数据
              username:'',
              sex:''
          },
          searchData:{
              num: 1,
              size: 20,
              title:'',
          },
          pageInfo:{
              pageIndex: 1,
              pageSize: 10,
              totalCount: 0,
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
      deatil(id){
          this.$router.push(`/post/${id}`)
      },
        getAll(){
            if (this.searchData.title == ""){
                console.log("kong")
                delete this.searchData.title;
                // this.$delete(this.searchData,'name'); 
            }
            if (this.searchData.account == ""){
                console.log("kong")
                delete this.searchData.account;
                // this.$delete(this.searchData,'name'); 
            }
            for (let key in this.searchData) {
                // 如果对象属性的值不为空，就保存该属性（如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
                if (this.searchData[key] === "") {
                    delete this.searchData[key];
                }
            }
            getArticleAll(this.searchData).then(res=>{
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
    },
     filters:{
            formatDate(val){
                return makeDate(val)
            }
        }
  };
</script>