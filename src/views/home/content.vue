<template>
  <div class="operate-container">
    <div class="title">标题：
      <span>{{params.theme}}</span>
    </div>
    <div class=" title"> 内容：
      <div class="content" v-html="params.mainBody"></div>
    </div>
    <div class=" title"> 处理结果：
      <div class="content">{{params.feedBack}}</div>
    </div>
    <div style="text-align:center;margin-top: 50px;">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" @click="doSth()">确认</el-button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {}
  },
  methods: {
    doSth() {
      this.$layer.close(this.layerid)
    }
  },
  mounted() { },
  created() { }
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
