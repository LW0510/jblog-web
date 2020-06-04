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
              <div class="nickname">{{user.nickName}}</div>
            </div>
            <div>
              <span>{{publishNum}}发布</span>
              <span>{{readNum}}阅读</span>
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
              <el-button type="text" @click.native.prevent="getList('')">发布的文章</el-button>
            </el-row>
            <el-row>
              <el-button type="text" @click.native.prevent="getList('0')">审核中的文章</el-button>
            </el-row>
            <el-row>
              <el-button type="text" @click.native.prevent="getList('2')">审核拒绝的文章</el-button>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="center">
          <div class="articles-center">
            <div class="panel-heading">{{tableTitle}}</div>

            <el-table
              v-loading="loading"
              :data="articleList"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column label="作者" align="center" prop="nickName" />
              <el-table-column label="标题" align="center" prop="title" />
              <el-table-column label="摘要" align="center" prop="summary" />
              <el-table-column label="标签" align="center" prop="tags2" />
              <el-table-column label="浏览量" align="center" prop="viewNum" />
              <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text "
                    icon="el-icon-edit"
                    :disabled="editDisabled"
                    @click="handleUpdate(scope.row)"
                    v-hasPermi="['system:article:edit']"
                  >修改</el-button>

                  <el-button
                    size="mini"
                    type="text "
                    icon="el-icon-delete"
                    :disabled="deleteDisabled"
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
import { articleList, deleteArticle } from "@/api/article";
export default {
  data() {
    return {
      editDisabled: false,
      deleteDisabled: false,

      //阅读量
      readNum: 0,
      publishNum: 0,
      // 文章表格数据
      articleList: [],
      tableTitle: "发表的文章",
      //查询参数
      queryParams: {
        userId: "",
        year: "",
        month: "",
        tagId: "",
        title: "",
        categoryId: "",
        status: ""
      }
    };
  },
  computed: {
    user() {
      let userId = this.$store.state.userId;
      let nickName = this.$store.state.name;
      let avatar = this.$store.state.avatar;
      return {
        userId,
        nickName,
        avatar
      };
    }
  },
  methods: {
    /** 查询文章列表 */
    getList(flag) {
      this.loading = true;
      this.queryParams.userId = this.user.userId;
      if (flag === "0") {
        this.editDisabled = false;
        this.deleteDisabled = false;
        this.queryParams.status = "0";
        this.tableTitle = "审核中的文章";
      } else if (flag === "2") {
        this.editDisabled = true;
        this.deleteDisabled = false;
        this.queryParams.status = "2";
        this.tableTitle = "审核拒绝的文章";
      } else {
        this.editDisabled = true;
        this.deleteDisabled = false;
        this.queryParams.status = "1";
        this.tableTitle = "发布的文章";
      }
      let pageParams = {
        pageNo: 1,
        pageSize: 10,
        orderField: "create_time",
        order: "desc"
      };
      articleList(this.queryParams, pageParams).then(response => {
        this.articleList = response.rows;
        this.total = response.totalCount;
        this.loading = false;

          //初始化阅读量和发布量，确保当前tab页为 “发表的文章页面”
          if(this.queryParams.status ==='1'){
            this.readNum = 0;
            this.publishNum = 0;
            this.initReadAndPublishNum(this.articleList);
          }
      });
    },
    handleDelete(row) {
      this.$confirm('是否确认删除文章编号为"' + row.id + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return deleteArticle(row.id);
        })
        .then(() => {
          this.getList(this.queryParams.status);
         //初始化阅读量和发布量，确保当前tab页为 “发表的文章页面”
          if(this.queryParams.status ==='1'){
            this.readNum = 0;
            this.publishNum = 0;
            this.initReadAndPublishNum(this.articleList);
          }
          this.$message({
            message: "文章删除成功",
            type: "success"
          });
        })
        .catch(function() {});
    },
          handleUpdate(row) {
        this.$router.push({path: `/write/${row.id}`})
      },
      initReadAndPublishNum(articleList){
        let rnum = 0;
        let pnum = 0;
        articleList.forEach(function(e) {
          if(e.status === '1'){
            pnum += 1;
            rnum += e.viewNum;
          }
        });
        this.readNum = rnum;
        this.publishNum = pnum;
      },
  },
  created() {
    this.getList("1");
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