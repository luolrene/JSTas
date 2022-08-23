<template>
  <div class="login-container">
    <div class="loginBKimg"></div>
    <div class="formClass">
      <template v-if="isLoginShow === '1'">
        <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="login-form" style="position: relative;">
         <div
            @mouseover="isQRshow = true"
            @mouseleave="isQRshow = false"
            style="padding: 10px;position: absolute;z-index: 2;right: 0;top: 0;;cursor: pointer;">
            <div v-if="!isQRshow">
              <img src="../../../static/img/login/QRcode.png">
            </div>
            <div v-else style="position: absolute;z-index: 2;cursor: pointer;right: 15px;padding: 10px;border-radius: 20px;background-color: #0E6EB8;">
              <img src="../../../static/img/login/QRcode_all.png" style="width: 200px;height: 200px;">
              <span style="font-size: 14px;color: #FFFFFF;">TAS-APP  安卓手机浏览器或手机自带扫码下载</span>
            </div>
          </div>
          <div class="title-container">
            <img src="../../../static/img/login/TAS_logo.png" alt="" style="width: 80px;height: 70px;">
            <div class="title">TAS检测自动化系统</div>
          </div>
          <div style="width: 100%;display: flex;flex-direction: column;align-items: center;">
            <el-form-item prop="mobile">
              <span class="svg-container">
                <img src="../../../static/img/login/user.png"/>
              </span>
              <el-input
                 ref="mobile"
                 name="mobile"
                 placeholder="账号/手机号"
                 type="text"
                 autocomplete="on"
                 v-model.trim="loginForm.mobile"
                 maxlength="20"
                 tabindex="1">
              </el-input>
            </el-form-item>
             <el-form-item prop="pwd">
               <span class="svg-container">
                 <img src="../../../static/img/login/pwd.png"/>
               </span>
               <el-input
                 ref="pwd"
                 placeholder="密码"
                 v-model.trim="loginForm.pwd"
                 tabindex="1"
                 :type="passwordType"
                 @keyup.enter.native="handleLogin"
                 show-password>
               </el-input>
             </el-form-item>
          </div>
           <el-button type="primary" :size="$layer_Size.buttonSize" @click="handleLogin('loginForm')" :loading="loading" class="loginButton">登录</el-button>
         </el-form>
      </template>

      <template v-else>
        <el-form :model="loginForm_First" status-icon :rules="loginRules_First" ref="loginForm_First" label-width="100px" class="login-form">
          <div class="title-container">
            <img src="../../../static/img/login/TAS_logo.png" alt="" style="width: 80px;height: 70px;">
            <div class="title">TAS检测自动化系统</div>
          </div>
          <div style="width: 100%;display: flex;flex-direction: column;align-items: center;">
             <el-form-item prop="password">
               <el-input
                 placeholder="请输入新密码"
                 v-model.trim="loginForm_First.password"
                 tabindex="1"
                 :type="passwordType"
                 show-password>
               </el-input>
             </el-form-item>
             <el-form-item prop="npwc">
               <el-input
                 placeholder="重新输入新密码"
                 v-model.trim="loginForm_First.npwc"
                 tabindex="1"
                 :type="passwordType"
                 @keyup.enter.native="handleLogin_First"
                 show-password>
               </el-input>
             </el-form-item>
          </div>
           <el-button type="primary" :size="$layer_Size.buttonSize" @click="handleLogin_First('loginForm_First')" :loading="btnLoading" class="loginButton">密码修改</el-button>
         </el-form>
      </template>
    </div>
  </div>
</template>

<script>
import {getUserLogin, getUserChange} from '../../api/login.js'
import {Message} from 'element-ui'
import {b64Md5} from '../../utils/md5.js'
export default {
  name: 'login',
  data () {
    const passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}/
    var Validator1 = (rule, value, callback) => {
      if (!value || !value.trim()) {
        return callback(new Error('请重新输入新密码'))
      }
      let isValid = passwordreg.test(value)
      if (!isValid) {
        return callback(new Error('新密码必须是大写字母，小写字母，数字，特殊字符组成，且长度为8到16位!'))
      }
      if (value !== this.loginForm_First.password) {
        return callback(new Error('两次新密码不相同'))
      }
      callback()
    }
    var Validator2 = (rule, value, callback) => {
      if (!value || !value.trim()) {
        return callback(new Error('请输入新密码'))
      }
      let isValid = passwordreg.test(value)
      if (!isValid) {
        return callback(new Error('新密码必须是大写字母，小写字母，数字，特殊字符组成，且长度为8到16位!'))
      }
      callback()
    }
    return {
      radio: 2,
      isLoginShow: '1',
      isQRshow: false,
      checked: false,
      loginForm: {
        mobile: '',
        pwd: ''
      },
      loginRules: {
        mobile: [{required: true, message: '账号不可为空', trigger: 'blur'}],
        pwd: [{required: true, message: '密码不可为空', trigger: 'blur'}]
      },
      loginForm_First: {
        password: '',
        npwc: ''
      },
      loginRules_First: {
        password: [
          { validator: Validator2, required: true, trigger: 'blur' }
        ],
        npwc: [
          { validator: Validator1, required: true, trigger: 'blur' }
        ]
      },
      verHref: '',
      passwordType: 'password',
      capsTooltip: true,
      loading: false,
      btnLoading: false,
      errorNum: 0
    }
  },
  mounted () {
    if (this.loginForm.mobile === '') {
      this.$refs.mobile.focus()
    } else if (this.loginForm.pwd === '') {
      this.$refs.pwd.focus()
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let ids = {}
          ids.mobile = this.loginForm.mobile
          ids.pwd = b64Md5(this.loginForm.pwd).replace(/\+/g, '')
          this.loading = true
          getUserLogin(ids).then(res => {
            if (res.message === '80') {
              this.$confirm('账号初次登录将先进行密码修改', '修改密码', {
                confirmButtonText: '确定',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'warning',
                  message: `请进行密码修改`
                })
                this.isLoginShow = '2'
                this.$store.dispatch('setUserInfo', {token: res.result.token}).then(res => {})
              })
            } else {
              this.errorNum = res
              this.$store.dispatch('setUserInfo', res.result).then(res => {
                this.$router.push('/home')
              })
            }
            this.loading = false
          }).catch(pkerr => {
            this.loading = false
            Message({
              showClose: true,
              message: '服务器错误，请刷新重试',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },
    handleLogin_First () {
      this.$refs.loginForm_First.validate(valid => {
        if (valid) {
          let ids = {}
          ids.mobile = this.loginForm.mobile
          ids.pwd = b64Md5(this.loginForm.pwd).replace(/\+/g, '')
          ids.password = b64Md5(this.loginForm_First.password).replace(/\+/g, '')
          this.btnLoading = true
          getUserChange(ids).then(res => {
            this.$share.message('密码修改成功,请重新登录', 'success')
            this.isLoginShow = '1'
            this.loginForm.pwd = ''
            this.$store.dispatch('setUserInfo').then(res => {})
            this.btnLoading = false
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    }
  }
}
</script>
<style>
  .login-container .el-form-item__content{
    display: flex;
    margin-left: 0 !important;
  }
  .login-container .el-form-item{
    width: 65%;
    margin-bottom: 10%;
    display: flex;
  }
  .login-form .el-form-item__content{
    background-color: #FFFFFF;
    width: 100%;
    height: 42px;
    border-bottom: 1px solid #999999;
  }
  .login-form .el-input__inner{
    border: none;
  }
</style>
<style lang="scss" scoped>
  .loginBKimg{
    background-image: url('../../../static/img/login/jsjc_bk.jpg');
    // background-image: url('../../../static/img/login/bg.png');
    background-size:cover;
    background-repeat:no-repeat;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
  .formClass{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
  .login-container .login-form{
    padding-top: 2%;
    padding-bottom: 2%;
    margin-right: 15vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff;
    box-shadow: 0 2px 25px 0 rgba(0,0,0,.1);
    border-radius: 15px;
  }
  @media screen and (max-width:1600px){
    .login-container .login-form{
      width: 380px;
      height: 400px;
    }
  }
  @media screen and (min-width:1600px){
    .login-container .login-form{
      width: 460px;
      height: 480px;
    }
  }
  .title-container .title{
    font-size: 28px;
    font-weight: 700;
    // padding: 0 12%;
    margin-top: 2%;
  }
  .loginButton{
    width:60%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    font-size: 22px;
    font-weight: 700;
    color: #FFFFFF;
    background-color: #0195DB !important;
    border-radius: 45px;
    box-shadow: rgba(0, 53, 86, 0.2)6px 6px 14px 0px;
  }
</style>
