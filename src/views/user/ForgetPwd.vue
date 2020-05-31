<template>
  <div id="register" v-title data-title="找回密码 - For Fun">
    <!--<video preload="auto" class="me-video-player" autoplay="autoplay" loop="loop">
          <source src="../../static/vedio/sea.mp4" type="video/mp4">
      </video>-->

    <div class="me-login-box me-login-box-radius">
      <h1>Fan 找回密码</h1>

      <el-form ref="userForm" :model="userForm" :rules="rules">


                <el-form-item prop="email">
          <el-input placeholder="邮箱" v-model="userForm.email"></el-input>
        </el-form-item>

        <el-form-item prop="code">
            
            <el-row :gutter="20">
                <el-col :span="16"> <el-input placeholder="邮箱认证码" v-model="userForm.code"></el-input></el-col>
                <el-col :span="8"><el-button :disabled="countDownObj.isDisabled" type="text" @click.native.prevent="sendMailCode">{{countDownObj.buttonName}}</el-button></el-col>
            </el-row>
             
            
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="密码" v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item prop="password2">
          <el-input placeholder="确认密码" v-model="userForm.password2"></el-input>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native.prevent="retrievePassword('userForm')">提交</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import {sendMailCode,retrievePassword} from '@/api/user'

  export default {
    name: 'Register',
    data() {

      // 确认密码校验
        var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
      return {
        userForm: {
          email: '',
          code: '',
          password: '',
          password2: '',
          uuid: ''
        },
        //倒计时对象
        countDownObj:{
        buttonName: "获取认证码",
				isDisabled: false,
				time: 60
        },
        rules: {
                email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          password2: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      sendMailCode(){
        let that = this;
       
             if(that.userForm.email !== ''){
                 sendMailCode(that.userForm.email).then(response =>{
                     that.userForm.uuid = response.uuid;

                     //倒计时
                     this.countDown();
                 });
             }else{
                 that.$message('邮箱不能为空');
             }
     },
    
      retrievePassword(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {

            retrievePassword(that.userForm).then(response => {
                 that.$message({message: response.msg, type: 'success', showClose: true});
                that.$router.push({path: '/login'})
            });

          } else {
            return false;
          }
        });

      },

      //倒计时
      countDown(){
        let me = this;
					me.countDownObj.isDisabled = true;
					let interval = window.setInterval(function() {
						me.countDownObj.buttonName = '（' + me.countDownObj.time + '秒）后重新发送';
						--me.countDownObj.time;
						if(me.countDownObj.time < 0) {
							me.countDownObj.buttonName = "重新发送";
							me.countDownObj.time = 60;
							me.countDownObj.isDisabled = false;
							window.clearInterval(interval);
						}
					}, 1000);
      }

    }
  }
</script>

<style scoped>
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
    width: 350px;
    height: 380px;
    background-color: white;
    margin-top: 75px;
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
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
  }

  .me-login-design-color {
    color: #5FB878 !important;
  }

  .me-login-button {
    text-align: center;
  }

  .me-login-button button {
    width: 100%;
  }

</style>
