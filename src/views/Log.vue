<template>
  <div v-title :data-title="title">
    <el-container>
      <el-aside class="me-area">
        <ul class="me-month-list">
          <el-button @click="handleAdd()" size="small">日志新增</el-button>
        </ul>
      </el-aside>

      <el-main class="me-articles">
        <el-table v-loading="loading" :data="recordList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="内容" align="center" prop="content" />
          <el-table-column label="创建时间" align="center" prop="createdAt" width="180"></el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleQuery(scope.row)"
                v-hasPermi="['system:record:edit']"
              >详情</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:record:edit']"
              >修改</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />

        <el-dialog title="日志详情" :visible.sync="infoOpen" width="500px" append-to-body>
          <el-input type="textarea" :readonly="editFlag" :rows="10" v-model="form.content"></el-input>
        </el-dialog>
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="内容" prop="content">
              <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="form.content"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
  listRecord,
  getRecord,
  addRecord,
  updateRecord,
  delRecord
} from "@/api/record";

export default {
  name: "Log",
  data() {
    return {
      infoOpen: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      recordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: undefined,
        content: undefined,
        createdAt: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      contentInfo: "",
      editFlag: true
    };
  },
  created() {
    this.getList();
  },

  methods: {
    getList() {
      this.loading = true;

      listRecord(this.queryParams).then(response => {
        this.recordList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.editFlag = true;
      });
    },
    // 取消按钮
    cancel() {
      this.infoOpen = false;
      this.open = false;
      this.editFlag = true;
      this.id = undefined;
      this.userId = undefined;
      this.content = undefined;
      this.createdAt = undefined;
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.id = undefined;
      this.userId = undefined;
      this.content = undefined;
      this.createdAt = undefined;
      this.open = true;
      this.title = "添加日志";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {

              this.id = undefined;
      this.userId = undefined;
      this.content = undefined;
      this.createdAt = undefined;
      this.editFlag = false;
      const id = row.id || this.ids;
      getRecord(id).then(response => {
        this.form = response.data;
        this.editFlag = true;
        this.open = true;
        this.title = "修改日志";

      });
    },
    handleQuery(row) {
      this.id = undefined;
      this.userId = undefined;
      this.content = undefined;
      this.createdAt = undefined;
      const id = row.id || this.ids;
      getRecord(id).then(response => {
        this.form = response.data;
        this.infoOpen = true;
        this.title = "日志详情";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateRecord(this.form).then(response => {
              if (response.code === 200) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addRecord(this.form).then(response => {
              if (response.code === 200) {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除日志编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delRecord(ids);
        })
        .then(() => {
          this.getList();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        })
        .catch(function() {});
    }
  }
};
</script>

<style scoped>
.el-container {
  width: 640px;
}

.el-aside {
  position: fixed;
  left: 160px;
  top: 119px;
  margin-right: 50px;
  width: 150px !important;
}

.el-main {
  padding: 0px;
  line-height: 16px;
}

.me-month-list {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  list-style-type: none;
}

.me-month-item {
  margin-top: 18px;
  padding: 4px;
  font-size: 18px;
  color: #5fb878;
}

.me-order-list {
  float: right;
}
</style>
