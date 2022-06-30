<template>
  <div>
    <div class="title">推荐文章</div>
    <a-list
      itemLayout="vertical"
      size="large"
      :pagination="pagination"
      :dataSource="listData"
    >
      <a-list-item slot="renderItem" slot-scope="item" key="item.title">
        <img slot="extra" width="272" alt="cover" 
        :src="item.cover == ''? 'https://ossimg.xinli001.com/20200221/2fe9a2e7e659d487a8aa22b38a709fb8.jpeg?x-oss-process=image/quality,Q_80': item.cover" />
        <a-list-item-meta :description="item.createTime">
          <a slot="title" :href="'/post/'+item.id">{{ item.title }}</a>
        </a-list-item-meta>
        <!-- {{ item.content }} -->
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import api from "@/api/index";
import axios from "axios";
export default {
  data() {
    return {
      listData: [],
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      }
    };
  },
  mounted() {
    axios
      .get(api.Post, {
        headers: { Authorization: localStorage.token }
      })
      .then(response => {
        var rawList = response.data.data
        rawList.map(element => {
          element.createTime = new Date(parseInt(element.createTime))
            .toLocaleString()
            .replace(/:\d{1,2}$/, " ");
        })
        this.listData = rawList
      })
      .catch(error => {
        this.$router.error({path: '/login'})
        console.log(error);
      });
  }
};
</script>
<style></style>
