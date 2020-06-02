<template>
  <div class="profile">
    <div class="me-profile-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 个人中心 -->
        <el-tab-pane label="个人信息" name="myInfo">
          <el-form :model="userInfo" label-width="80px">
            <el-form-item label="头像">
              <img class="me-header-picture" :src="user.avatar" />
            </el-form-item>
            <el-form-item label="用户名">{{userInfo.userName}}</el-form-item>
            <el-form-item label="性别">{{userInfo.sex | sexFilter(this.sexOptions)}}</el-form-item>

            <el-form-item label="昵称">{{userInfo.nickName}}</el-form-item>
            <el-form-item label="邮箱">{{userInfo.email}}</el-form-item>
            <el-form-item label="电话号码">{{userInfo.phonenumber}}</el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 修改信息 -->
        <el-tab-pane label="修改信息" name="updateInfo">
          <el-form ref="userForm" :model="userForm" :rules="userRules" label-width="80px">
            <el-row>
              <el-col :span="10">
                            <el-form-item label="用户名" prop="userName">
              <el-input v-model="userForm.userName"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
              <el-select v-model="userForm.sex" placeholder="请选择">
                <el-option
                  v-for="item in sexOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
              </el-col>
              <el-col :span="14">
                            <el-form-item label="头像" prop="avatar">
              <!-- <el-input v-model="userForm.avatar"></el-input> -->
            <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                 :http-request="upLoad"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <img v-if="user.avatar" :src="user.avatar" class="avatar">
                <!-- <span v-if="imageUrl" class="el-upload-action" @click.stop="handleRemove()">
                    <i class="el-icon-delete"></i>
                </span> -->
                <i  v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
            </el-upload>
            </el-form-item>
              </el-col>
            </el-row>


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
                @click.native.prevent="handleUpdatePwd('pwdObj')"
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
import { getCurrUser, updateUserPwd,avatarUpload } from "@/api/user";
import { getDicts } from "@/api/dict/data";
export default {
  data() {
    // 确认密码校验
    var rePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwdObj.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeName: "myInfo",

      updateInfoLoading: false,
      updatePwdLoading: false,

      //头像上传url
      uploadUrl: 'http://localhost:8080/avatar/upload',

      //用户表单
      userForm: {
        userName: "",
        nickName: "",
        email: "",
        phonenumber: "",
        sex: undefined,
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

      sexOptions: [],

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
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
          { required: true, validator: rePassword, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    user() {
      let login = this.$store.state.username.length != 0;
      let avatar = this.$store.state.avatar;
      let userId = this.$store.state.id;
      return {
        login,
        avatar,
        userId
      };
    }
  },
  methods: {
    // tab页点击
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //更新个人信息
    handleUpdateInfo() {},
    //更新密码
    handleUpdatePwd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateUserPwd(this.pwdObj.oldPassword, this.pwdObj.newPassword).then(
            response => {
              this.$message({
                message: "修改成功",
                type: "success"
              });
            }
          );
        } else {
          return false;
        }
      });
    },
    getUserInfo() {
      getCurrUser().then(response => {
        this.userInfo = response.data.user;

        //初始化 userForm数据
        Object.keys(this.userForm).forEach(key => {
          this.userForm[key] = this.userInfo[key];
        });
      });
    },
    getSexDictInfo() {
      getDicts("sys_user_sex").then(response => {
        this.sexOptions = response.data;
        console.log(this.sexOptions);
      });
    },

    //头像上传相关
     // 移除图片
    handleRemove() {
      this.imageUrl = ''
    },
    // 上传成功回调
    handleAvatarSuccess(res, file) {
      debugger;
      this.imageUrl = res.data.url
    },

    //自定义头像上传
    upLoad(file){
      let userId = this.user.userId;
      const formData = new FormData();
       formData.append('file',file.file);
      formData.append('userId',userId);
      avatarUpload(formData).then(response => {
        this.$store.commit('SET_AVATAR',response.url);
          this.$message({
          message: '修改成功',
          type: 'success'
        });
      });
    },

    // 上传前格式和图片大小限制
    beforeAvatarUpload(file) {
      const type = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!type) {
        this.$message.error('图片格式不正确!(只能包含jpg，png，webp，JPEG)')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return type && isLt2M

  }
  },
  created() {
    this.getSexDictInfo();
    this.getUserInfo();
  },
  filters: {
    sexFilter(data, sexOptions) {
      for (let item of sexOptions) {
        if (item["dictValue"] === data) {
          return item["dictLabel"];
        }
      }
    }
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

/* 头像上传相关 */
.avatar-uploader{
  width: 100PX;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  /* background: url('../assets/img/defaultHead.jpg') no-repeat; */
  background-size: 100% 100%;
}
.avatar-uploader-icon{
  font-size: 0;
  color: #fff;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
}
.avatar-uploader-icon{
  font-size: 28px;
  background-color: rgba(0, 0, 0, .3);
}
.avatar {
  position: relative;
  width: 100px;
  height: 100px;
  display: block;
}
.el-upload-action {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0;
  color: #fff;
  text-align: center;
  line-height: 120px;

}
.el-upload-action:hover {
  font-size: 20px;
  background-color: #000;
  background-color: rgba(0, 0, 0, .3)
}
</style>