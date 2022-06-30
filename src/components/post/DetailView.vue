<template>
  <div id="detail">
    <a-row>
      <a-col :span="16" :offset="4">
        <div class="title">
          {{ this.article.title }}
        </div>
        <div class="appendix">
          <a-icon type="clock-circle" />
          发布时间 {{ description }}
          <a-icon type="message" />
          评论 {{ commentCount }}
        </div>
        <a-divider />
        <div class="main" v-html="article.context">
        </div>
        <center>
          <img :src="article.image" alt="" width="500px" style="margin: 32px" />
        </center>
       
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {getArticle} from '@/api/index'
export default {
  props: ['id'],
  data() {
    return {
      title: '',
      description: '',
      commentCount: 3,
      content: '',
      image: '',
      article: {
      }
    };
  },
  mounted() {
    const id = this.$route.params.id
    getArticle(id).then(res=>{
        // console.log(res.data.data)
        if(res.data.code === 200){//登录成功
            if(res.data.data){
                this.article = res.data.data
                console.log(this.pageInfo)
            }
        }
    })
    // axios.get(api.Post+'/'+this.id, {
    //   headers: { Authorization: localStorage.token }
    // }).then(response => {
    //   this.title = response.data.data.title
    //   this.description = new Date(parseInt(response.data.data.createTime))
    //         .toLocaleString()
    //         .replace(/:\d{1,2}$/, " ");
    //   this.content = response.data.data.content
    //   this.image = response.data.data.cover
    // }).catch(error => {
    //   if (error.response) {
    //     if (error.response.status == 404) {
    //       this.$router.push({name: 'error404'})
    //     } else if (error.response.status == 500) {
    //       this.$router.push({name: 'error500'})
    //     } else if (error.response.status == 401) {
    //       this.$router.push({path: '/login'})
    //     }
    //   }
    // })
  },
  methods: {
    getArticle(){
      getArticle(this.article).then(res=>{
          console.log(res.data.data)
          if(res.data.code === 200){//登录成功
              if(res.data.data){
                  this.$router.push({path: '/admin/post'})
                  console.log(this.pageInfo)
              }
          }
      })
    },
  }
};
</script>

