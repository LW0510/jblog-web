<template>
  <div class="me-message" v-title :data-title="title">
    <el-container class="me-area">
      <el-main class="me-main">

  <comment :comments="commentData"></comment>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import * as CommentData from './mockdata'
import comment from '@/components/comment'
  export default {
        components: {
      comment
    },
    name: 'MessageBoard',
    data() {
      return {
        commentData: []
      }
    },
    computed: {
      title (){
        return '留言板 - For Fun'
      }
    },
    created(){
      this.commentData = CommentData.comment.data;
    }
  }
</script>

<style scoped>
  .me-message {
  }

  .el-container {
    width: 700px;
  }

  .me-main {
    overflow: hidden;
  }

  .me-log-box {
    margin-left: 30%;
    margin-top: 20px;

  }

</style>
