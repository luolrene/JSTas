<template>
    <div class="operate-container">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="仪器编号:">
                <el-input v-model="input" placeholder="请输入仪器编号">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :size="$layer_Size.buttonSize" icon="el-icon-plus" class="default-btn" @click="addData">添加</el-button>
                <el-button type="primary" :size="$layer_Size.buttonSize" icon="el-icon-download" class="default-btn" @click="handleDownload">确认下载</el-button>
            </el-form-item>
        </el-form>
        <div class="title">仪器编号:</div>
        <div class="content" v-html="yqbh">{{yqbh}}</div>
    </div>
</template>

<script>
// import { getMachineDownZipFile } from '../../../api/storage/equipment.js'
export default {
  data() {
    return {
      input: '',
      yqbh: ''
    }
  },
  methods: {
    addData() {
      if (this.yqbh) {
        this.yqbh += ',' + this.input
      } else {
        this.yqbh += this.input
      }
      this.input = ''
    },
    handleDownload() {
      if (this.yqbh) {
        window.open(
          process.env.BASE_API +
            process.env.JS_Server +
            '/machine/downZipFile?yqbh=' +
            this.yqbh +
            '&token=' +
            this.$store.getters.userInfo.token
        )
      }
    }
  },
  mounted() {},
  created() {}
}
</script>

<style scoped lang='scss'>
.title {
  font-size: 16px;
  font-weight: 350;
}
.content {
  margin: 20px;
}
</style>
