<template>
  <div>
    <img src="static/img/default/noAuthority.png" style="padding-top: 150px;"/>
    <!-- <h1>您当前没有权限查看！</h1> -->
    <h2>您当前没有权限查看！</h2>
    <div class="error_div">
        <a @click="gotoHome" style="color: #1d17db;">返回首页</a>
        <p class="info">{{curCount}}秒后返回门户</p>
    </div>
  </div>
</template>

<script>
export default{
  name: '',
  data () {
    return {
      InterValObj: null,
      count: 5,
      curCount: 5
    }
  },
  methods: {
    SetRemainTime () {
      if (this.curCount === 0) {
        // 停止计时器
        // clearInterval(this.InterValObj)
        this.gotoHome()
      } else {
        this.curCount = this.curCount - 1
        // this.content = this.curCount + '秒后返回门户'
      }
    },
    runTime () {
      this.InterValObj = setInterval(() => {
        this.SetRemainTime()
      }, 1000)
    },
    gotoHome () {
      clearInterval(this.InterValObj)
      this.$router.push({path: '/', ftype: 1, status: 1, requireAuth: 1})
    }
  },
  created () {

  },
  mounted () {
    this.runTime()
  }
}
</script>

<style>
.info {color:#000}
</style>
