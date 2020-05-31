<template>
  <div class="container">
    <el-row>
      <el-col :span="6">
        <div class="aside-1">
          <div class="user-info">
            <div class="user">
              <div class="user-avatar">
                <img class="me-header-picture" :src="user.avatar" />
              </div>
              <div class="username">shadow</div>
            </div>
            <div>
              <span>0发布</span>
              <span>0阅读</span>
            </div>
            <div>
              <!-- <el-button type="text">编辑个人信息</el-button> -->
              <router-link to="/profile">编辑个人信息</router-link>
            </div>
          </div>
        </div>
        <div class="aside-2">
          <div class="article-list">
            <el-row>
              <el-button type="text">审核的文章</el-button>
            </el-row>
            <el-row>
              <el-button type="text">发表的评论</el-button>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="center">
          <div class="articles-center">
            <div class="panel-heading">发表的文章</div>

            <el-table
              v-loading="loading"
              :data="articleList"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column label="作者" align="center" prop="nickname" />
              <el-table-column label="标题" align="center" prop="title" />
              <el-table-column label="摘要" align="center" prop="summary" />
              <el-table-column label="标签" align="center" prop="tags" />
              <el-table-column label="浏览量" align="center" prop="viewNum" />
              <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="handleUpdate(scope.row)"
                    v-hasPermi="['system:article:edit']"
                  >修改</el-button>
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.row)"
                    v-hasPermi="['system:article:remove']"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    user() {
      let login = this.$store.state.username.length != 0;
      let avatar = this.$store.state.avatar;
      return {
        login,
        avatar
      };
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 60px;
  height: 100%;
  width: 100%;
  position: fixed;
}

.el-row {
  margin-top: 5px;
}

.aside-1 {
  position: relative;
  background-color: #f6f6f6;
  height: 250px;
}

.aside-1 > .user-info {
  /* div 水平垂直居中 */
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 300px;
  height: 230px;
  margin: auto;
  color: #666;
  background: #fff;

  text-align: center;
}

.aside-2 {
  position: relative;
  background-color: #f6f6f6;
  height: 250px;
}

.aside-2 > .article-list {
  /* div 水平垂直居中 */
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 300px;
  height: 230px;
  margin: auto;
  color: #666;
  background: #fff;

  text-align: center;
}

.center {
  position: relative;
  background-color: #f6f6f6;
  height: 500px;
}

.articles-center {
  position: absolute;
  margin-top: 10px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 940px;
  height: 480px;
  margin: auto;
  color: #666;
  background: #fff;
}

/* 头像 */
.me-header-picture {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #5fb878;
}
</style>