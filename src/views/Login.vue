<template>
  <div id="login" v-title data-title="登录 - For Fun">
    <!--<video preload="auto" class="me-video-player" autoplay="autoplay" loop="loop">
          <source src="../../static/vedio/sea.mp4" type="video/mp4">
    </video>-->

    <div class="me-login-box me-login-box-radius">
      <h1>Fan 登录</h1>

      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="userForm.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="密码" v-model="userForm.password"></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input
            v-model="userForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="login('userForm')"
          >
            <!-- <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" /> -->
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" />
          </div>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native.prevent="login('userForm')">登录</el-button>
        </el-form-item>
      </el-form>

      <!-- <div class="me-login-design">
        <p>Designed by
          <strong>
            <router-link to="/" class="me-login-design-color">ForFun</router-link>
          </strong>
        </p>
      </div>-->
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login"
export default {
  name: "Login",
  data() {
    return {

      //验证码地址
      codeUrl: "",
      //用户表单
      userForm: {
        username: "admin",
        password: "admin123",
        code: "",
        uuid: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },

  created() {
    this.getCode();
  },

  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.userForm.uuid = res.uuid;
      });
    },
    login(formName) {
      let that = this;

      this.$refs[formName].validate(valid => {
        if (valid) {
          that.$store
            .dispatch("login", that.userForm)
            .then(() => {
              that.$router.go(-1);
            })
            .catch(error => {
              that.$message({
                message: error,
                type: "error",
                showClose: true
              });
              //重新获取验证码
              that.getCode();
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
#login {
  min-width: 100%;
  min-height: 100%;
}

.me-video-player {
  background-color: transparent;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  position: absolute;
  left: 0;
  z-index: 0;
  top: 0;
}

.me-login-box {
  position: absolute;
  width: 300px;
  height: 260px;
  background-color: white;
  margin-top: 150px;
  margin-left: -180px;
  left: 50%;
  padding: 30px;
}

.me-login-box-radius {
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
}

.me-login-box h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  vertical-align: middle;
}

.me-login-design {
  text-align: center;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
}

.me-login-design-color {
  color: #5fb878 !important;
}

.me-login-button {
  text-align: center;
}

.me-login-button button {
  width: 100%;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
