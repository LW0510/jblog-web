<template>
  <el-card>
    <div class="my-clock" v-if="!getToken()">
      <clock :time="currentTime"></clock>
      <div>当前时间:{{currentTime}}</div>
    </div>
    <div class="me-author" v-else>
      <h1 class="me-author-name">{{authorInfo.nickName}}</h1>
      <div class="me-author-description">
        <span>
          <i class="el-icon-location-outline"></i>
          &nbsp;{{authorInfo.addr}}
        </span>
        <span>
          <i class="me-icon-job"></i>
          &nbsp;{{authorInfo.label}}
        </span>
      </div>
      <div class="me-author-tool">
        <i @click="showTool('1')" title="phone" class="iconfont icon-shouji"></i>
        <i @click="showTool('2')" title="github" class="iconfont icon-github"></i>
      </div>
    </div>
  </el-card>
</template>

<script>
import Clock from "vue-clock2";
import { getToken } from "@/request/auth";
export default {
  name: "CardMe",
  components: { Clock },
  data() {
    return {
      // 时钟相关
      timer: "", //定义一个定时器的变量
      currentTime: "" // 获取当前时间
    };
  },
  computed: {
    authorInfo() {
      let nickName = this.$store.state.name;
      let addr = this.$store.state.addr;
      let label = this.$store.state.label;
      let phone = this.$store.state.phone;
      return {
        nickName,
        addr,
        label,
        phone
      };
    }
  },
  methods: {
    showTool(flag) {
      let title = "";
      let message = "";
      if (flag == "1") {
        title = "phone";
        message = this.authorInfo.phone;
      } else {
        title = "github";
        message =
          '<a target="_blank" href="https://github.com">https://github.com</a>';
      }

      this.$message({
        duration: 0,
        showClose: true,
        dangerouslyUseHTMLString: true,
        message: "<strong>" + message + "</strong>"
      });
    },

    getToken() {
      return getToken();
    },

    //初始化时钟
    initClock() {
      var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(function() {
        _this.currentTime = //修改数据date
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate() +
          " " +
          new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          ": " +
          new Date().getSeconds();
      }, 1000);
    }
  },
    created() {
    //初始化时钟
    if (!getToken()) {
      this.initClock();
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>

<style scoped>

.my-clock{
  text-align: center;
}

.me-author-name {
  text-align: center;
  font-size: 30px;
  border-bottom: 1px solid #5fb878;
}

.me-author-description {
  padding: 8px 0;
}

.me-icon-job {
  padding-left: 16px;
}

.me-author-tool {
  text-align: center;
  padding-top: 10px;
}

.me-author-tool i {
  cursor: pointer;
  padding: 4px 10px;
  font-size: 30px;
}
</style>
