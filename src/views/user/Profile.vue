<template>
  <div class="profile">
    <div class="me-profile-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 个人中心 -->
        <el-tab-pane label="个人信息" name="myInfo">
          <el-form :model="userInfo" label-width="80px">
            <el-form-item label="用户名">{{userInfo.userName}}</el-form-item>
            <el-form-item label="性别">{{userInfo.sex}}</el-form-item>
            <el-form-item label="头像">{{userInfo.avatar}}</el-form-item>
            <el-form-item label="昵称">{{userInfo.nickName}}</el-form-item>
            <el-form-item label="邮箱">{{userInfo.email}}</el-form-item>
            <el-form-item label="电话号码">{{userInfo.phonenumber}}</el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 修改信息 -->
        <el-tab-pane label="修改信息" name="updateInfo">
          <el-form ref="userForm" :model="userForm" :rules="userRules" label-width="80px">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="userForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-input v-model="userForm.sex"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <el-input v-model="userForm.avatar"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="userForm.nickName"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="phonenumber">
              <el-input v-model="userForm.phonenumber"></el-input>
            </el-form-item>

            <el-form-item>
              <el-row type="flex" justify="center">
                <el-col :push="6">
                  <el-button
                    :loading="updateInfoLoading"
                    size="medium"
                    type="primary"
                    style="width:40%;"
                    @click.native.prevent="handleUpdateInfo"
                  >
                    <span v-if="!updateInfoLoading">提交</span>
                    <span v-else>更 新 中...</span>
                  </el-button>
                </el-col>
                <el-col>
                  <el-button
                    size="medium"
                    type="primary"
                    style="width:40%;"
                    @click.native.prevent="resetInfo"
                  >重置</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 修改密码 -->
        <el-tab-pane label="修改密码" name="updatePwd">
          <el-form ref="pwdObj" :model="pwdObj" :rules="pwdRules" label-width="80px">
            <el-form-item label="原密码" prop="oldPassword">
              <el-input v-model="pwdObj.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="pwdObj.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="rePassword">
              <el-input v-model="pwdObj.rePassword"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center">
              <el-button
                :loading="updatePwdLoading"
                size="medium"
                type="primary"
                style="width:20%;"
                @click.native.prevent="handleUpdatePwd"
              >
                <span v-if="!updatePwdLoading">提交</span>
                <span v-else>更 新 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getCurrUser } from "@/api/user";
export default {
  data() {
    return {
      activeName: "myInfo",

      updateInfoLoading: false,
      updatePwdLoading: false,

      //用户表单
      userForm: {
        userName: "",
        nickName: "",
        email: "",
        phonenumber: "",
        sex: "",
        avatar: ""
      },

      //密码表单
      pwdObj: {
        oldPassword: "",
        newPassword: "",
        rePassword: ""
      },

      //个人信息
      userInfo: {},

      userRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ]
      },
      pwdRules: {
        oldPassword: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ],
        rePassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // tab页点击
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //更新个人信息
    handleUpdateInfo() {},
    //更新密码
    handleUpdatePwd() {},
    getUserInfo() {
      getCurrUser().then(response => {
        this.userInfo = response.data.user;
      });
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>
<style scoped>
.container {
  position: relative;
}

.me-profile-box {
  border-radius: 6px;
  background: #ffffff;
  width: 600px;
  height: 480px;
  padding: 25px 25px 5px 25px;
}
</style>