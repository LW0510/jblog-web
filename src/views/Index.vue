<template>
  <div v-title data-title="ForFun Find Yourself">
    <el-container>
      <el-main class="me-articles">
        <article-scroll-page></article-scroll-page>
      </el-main>

      <el-aside>
        <card-me class="me-area"></card-me>
        <card-tag :tags="hotTags"></card-tag>
        <card-article cardHeader="最热文章" :articles="hotArticles"></card-article>
        <card-archive v-if="articleArchiveDisplay" cardHeader="文章归档" :archives="archives"></card-archive>
        <card-article v-if="newArticleDisplay" cardHeader="最新文章" :articles="newArticles"></card-article>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import ArticleScrollPage from "@/views/common/ArticleScrollPage";
import CardArticle from "@/components/card/CardArticle";
import CardMe from "@/components/card/CardMe";
import CardTag from "@/components/card/CardTag";
import CardArchive from "@/components/card/CardArchive";

import { articleList, getHotArtices, getNewArtices } from "@/api/article";
import { getHotTags } from "@/api/tag";
import { listArchives } from "@/api/article";
import { getToken } from "@/request/auth";



export default {
  name: "Index",
  data() {
    return {
      newArticleDisplay: false,
      articleArchiveDisplay: false,

      hotTags: [],
      hotArticles: [],
      newArticles: [],
      archives: []
    };
  },
  components: {
    "card-article": CardArticle,
    "card-me": CardMe,
    "card-tag": CardTag,
    ArticleScrollPage,
    CardArchive
  },
  methods: {
    getUserInfo() {
      let that = this;
      that.$store
        .dispatch("getUserInfo")
        .then(data => {})
        .catch(() => {
          that.$message({
            message: "获取用户信息失败",
            type: "error",
            showClose: true
          });
        });
    },
    getHotArtices() {
      let that = this;
      getHotArtices()
        .then(data => {
          that.hotArticles = data.rows;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "最热文章加载失败!",
              showClose: true
            });
          }
        });
    },
    getNewArtices() {
      let that = this;
      let userId = this.$store.state.id;
      getNewArtices(userId)
        .then(data => {
          that.newArticles = data.rows;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "最新文章加载失败!",
              showClose: true
            });
          }
        });
    },
    getHotTags() {
      let that = this;
      getHotTags()
        .then(data => {
          that.hotTags = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "最热标签加载失败!",
              showClose: true
            });
          }
        });
    },
    listArchives() {
      listArchives()
        .then(data => {
          this.archives = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "文章归档加载失败!",
              showClose: true
            });
          }
        });
    }

  },
  created() {
    //刷新页面，获取用户信息（如果当前用户之前已经登录过）
    if (getToken()) {
      this.newArticleDisplay = true;
      this.articleArchiveDisplay = true;
      this.getUserInfo();
    }
    this.getHotArtices();
    if(getToken()){
this.getNewArtices();
    }
    this.getHotTags();
    this.listArchives();
  }
};
</script>

<style scoped>
.el-container {
  width: 960px;
}

.el-aside {
  margin-left: 20px;
  width: 260px;
}


.el-main {
  padding: 0px;
  line-height: 16px;
}

.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 20px;
}
</style>
