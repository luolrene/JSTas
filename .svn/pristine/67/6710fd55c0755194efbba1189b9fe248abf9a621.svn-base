<template>
  <div class="header-panel">
    <div class="header-panel-left">
      <img src="../../static/img/login/logo_jsjc.png" alt="" style="margin-right: 10px;">
     <img src="../../static/img/login/OA_logo.png"
        title="办公自动化系统"
        style="margin-right: 10px;width: 50px;height: 35px;cursor: pointer;"
        @click="getToOA">
      <img src="../../static/img/login/header_logo.png" alt="" style="margin-right: 10px;">
      <span>TAS检测自动化系统</span>
    </div>
    <div class="header-panel-right">
      <el-avatar :src="avatarImg" :size="40" style="margin-right: 10px;"></el-avatar>
      <el-dropdown style="color: #ffffff;">
        <span class="el-dropdown-link">
          {{this.$store.getters.userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="getMessage">个人资料</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="getUpdpass">修改密码</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div style="margin-left:20px;display: flex;align-items: center;">
        <i class="el-icon-edit-outline" style="font-size:23px;color:#fff;"></i>
        <span @click="getFeedback" style="color:#fff;font-size:13px;cursor: pointer">我要反馈</span>
      </div>
      <div style="margin-left:20px">
        <el-badge :value='this.num' class="item" v-if="this.num>0">
          <i class="el-icon-message-solid" style="font-size:23px;color:#fff;cursor: pointer" @click="pushInfo"></i>
        </el-badge>
        <i v-else class="el-icon-message-solid" style="font-size:23px;color:#fff;cursor: pointer" @click="pushInfo"></i>
      </div>
      <div style="height: 100%;display: flex;align-items: center;margin-left: 15px;padding-top: 6px;" title="退出登录" @click="logout">
        <img src="../../static/img/home/signOut.png" alt="" style="cursor: pointer;width: 80%;user-select: none;">
      </div>
    </div>
  </div>
</template>

<script>
import {getUserLoginout} from '../api/login.js'
import {getMsgQueryNoReadNum} from '@/api/home/home.js'
import userInfo from '../views/home/userInfo.vue'
import updpass from '../views/home/updpass.vue'
import feedback from '../views/home/feedback.vue'
import push from '../views/home/push.vue'
export default {
  components: {},
  data() {
    return {
      num: '',
      avatarImg: ''
    }
  },
  methods: {
    getToOA() {
      window.open('http://oa.9sjc.top' + '/#/home?token=' + this.$store.getters.userInfo.token);
    },
    logout() {
      this.$store.dispatch('setUserInfo').then(res => {
        getUserLoginout().then(res => { })
        this.$router.push('/login')
        window.location.reload()
      })
    },
    getMessage() {
      this.$layer.iframe({
        content: {
          content: userInfo, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: ['450px', '300px'],
        title: '个人信息',
        maxmin: true,
        shadeClose: false
      })
    },
    getUpdpass() {
      this.$layer.iframe({
        content: {
          content: updpass, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: ['500px', '400px'],
        title: '修改密码',
        maxmin: true,
        shadeClose: false
      })
    },
    getFeedback() {
      this.$layer.iframe({
        content: {
          content: feedback, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Self_Max,
        title: '用户反馈列表',
        maxmin: true,
        shadeClose: false
      })
    },
    pushInfo() {
      this.$layer.iframe({
        content: {
          content: push, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {}
        },
        area: this.$layer_Size.Max,
        title: '消息推送',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    if (this.$store.getters.userInfo.sex === '女') {
      this.avatarImg = 'static/img/home/user/user_default_woman.png'
    } else {
      this.avatarImg = 'static/img/home/user/user_default_man.png'
    }

    getMsgQueryNoReadNum({})
      .then(res => {
        this.num = res.result
        this.loading = false
      })
      .catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
  },
  created() { }
}
</script>

<style lang="scss">
$background-color: #0295db;
$font-size-A: 18px;
$font-size-B: 18px;
.header-panel {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  .header-panel-left {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    span {
      color: #ffffff;
    }
  }
  .header-panel-right {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 100%;
  }
}
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
.feed:hover {
  color: red;
}
</style>
