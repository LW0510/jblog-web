<template>
  <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
    <!-- 顶部搜索 -->
    <el-input placeholder="请输入搜索内容" v-model="topValue">
      <el-button slot="append" icon="el-icon-search" @click="topSearch()"></el-button>
    </el-input>

    <article-item v-for="a in articles" :key="a.id" v-bind="a"></article-item>

    <div class="no-record" v-if="noRecord">
      无记录
    </div>
  </scroll-page>
</template>

<script>
  import ArticleItem from '@/components/article/ArticleItem'
  import ScrollPage from '@/components/scrollpage'
  import {getArticles} from '@/api/article'

  export default {
    name: "ArticleScrollPage",
    props: {
      offset: {
        type: Number,
        default: 100
      },
      page: {
        type: Object,
        default() {
          return {}
        }
      },
      query: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    watch: {
      'query': {
        handler() {
          this.noData = false
          this.articles = []
          this.innerPage.pageNo = 1
          this.getArticles()
        },
        deep: true
      },
      'page': {
        handler() {
          this.noData = false
          this.articles = []
          this.innerPage = this.page
          this.getArticles()
        },
        deep: true
      }
    },
    data() {
      return {
        loading: false,
        noData: false,
        noRecord: false,
        innerPage: {
          pageSize: 10,
          pageNo: 1,
          name: 'create_time',
          sort: 'desc'
        },
        articles: [],
        topValue:''
      }
    },
    components: {
      'article-item': ArticleItem,
        'scroll-page': ScrollPage
    },
    methods: {
      load() {
        this.getArticles()
      },
      view(id) {
        this.$router.push({path: `/view/${id}`})
      },
      getArticles() {
        let that = this
        that.loading = true

        getArticles(that.query, that.innerPage).then(data => {

          let newArticles = data.rows
          if (newArticles && newArticles.length > 0) {
            that.innerPage.pageNo += 1
            that.articles = that.articles.concat(newArticles)
          } else {
            that.noData = true
          }

        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章加载失败!', showClose: true})
          }
        }).finally(() => {
          that.loading = false
        })

      },
      //顶部搜索
      topSearch(){
        let that = this
        that.noData = false
        that.articles = []
        that.noRecord = false
        that.innerPage.pageNo = 1
          
    
        that.loading = true
        let query = {
          title: that.topValue
        };
        getArticles(query, that.innerPage).then(data => {
          let newArticles = data.rows
          if (newArticles && newArticles.length > 0) {
            // that.innerPage.pageNo += 1
            that.articles = newArticles;
          } else {
            that.noData = true
            that.noRecord = true;
          }
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章加载失败!', showClose: true})
          }
        }).finally(() => {
          that.loading = false
        })
      }
    },
    created() {
      this.getArticles()
    }
  }
</script>

<style scoped>

  .el-card {
    border-radius: 0;
  }

  .el-card:not(:first-child) {
    margin-top: 10px;
  }

  .no-record {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;

    height:300px;
    margin:0 auto;
  
    
  }

</style>
