<template>
  <div class="operate-container">

    <div class=" title">
      <div class="content" v-html="params.detail">{{params.detail}}</div>
    </div>

    <div style="text-align:center;margin-top: 50px;">
      <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" @click="doSth()">确认</el-button>
    </div>
  </div>
</template>

<script>
import { getMsgSetMsgHasRead } from '../../api/home/home.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      fromValiData: {
        msgId: ''
      }
    }
  },
  methods: {
    doSth() {
      getMsgSetMsgHasRead(this.fromValiData)
        .then(res => {
          this.$parent.getListData()
          this.$layer.close(this.layerid)
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData.msgId = this.params.id
    }
  },
  created() {},
  destroyed() {
    this.doSth()
  }
}
</script>

<style scoped>
.title {
  margin: 20px 15px;
}
.content {
  text-align: center;
}
</style>
