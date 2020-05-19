<template>
  <div v-title :data-title="title">
    <el-container class="me-area">
      <el-main class="me-main">
        <!--<el-steps class="me-log-box" :space="100"  direction="vertical">
                 <el-step title="步骤 1" status="process"  icon="el-icon-time" description="步骤 1步骤 1步骤 1步骤 1步骤 1"></el-step>
                 <el-step title="步骤 2" status="process" icon="el-icon-time"></el-step>
                 <el-step title="步骤 3" status="process" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                   <el-step title="步骤 3" status="process" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>

                 <el-step title="步骤 3" status="process" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                 <el-step title="步骤 3" status="process" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                 <el-step title="步骤 3" status="process" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                 <el-step title="步骤 3" status="process" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                 <el-step title="步骤 3" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                 <el-step title="步骤 3" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                 <el-step title="步骤 3" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                 <el-step title="步骤 3" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                 <el-step title="步骤 3" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                 <el-step title="步骤 3" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                 <el-step title="步骤 3" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                 <el-step title="步骤 3" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                 <el-step title="步骤 3" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>
                 <el-step title="步骤 3" icon="el-icon-time" description="这是一段很长很长很长的描述性文字"></el-step>

              </el-steps>-->
        <pre>

			## 2020-04-12

      ```
      # 使用vue的Webpack模板生成脚手架
      ```

      ## 2020-04-13

      ```
      # 引入ElementUI

      # babel-plugin-component自定义主题
      # 首页
      # 登陆页
      # 注册页面
      # 日志页
      ```

            ## 2020-05-15 ~ 18（大更新）

      ```
      # API:
      # FileUploadUtils 类增强
      # AddressUtils 新增获取当前应用访问根路径方法
      # 解决Mybatis配置类引起的 配置文件中相关配置失效的问题
      # 新增头像文件的本地静态资源映射路径的配置
      # 新增取消对 *.png、*.jpg图片的拦截
      # 新增对springboot启动之后的监听器MyCommandLineRunner，完成项目初始化工作
      # 新增分页工具类（对分页参数的封装）
      # 相关blog接口的重构
      # 新增blog中所需的默认头像

      #前台
      #新增登录界面背景图
      #更新文章资源
      #相关bug修复

      #后台
      #更新登录界面背景图
      #修复登录后无法获取头像的问题
      #新增文章审核、文章列表、分类管理、标签管理页面
      #相关bug修复

      ```

			 </pre>
      </el-main>
    </el-container>
    </div>
</template>

<script>
  export default {
    name: 'Log',
    data() {
      return {}
    },
    computed: {
      title (){
        return '日志 - For Fun'
      }
    }
  }
</script>

<style scoped>
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
