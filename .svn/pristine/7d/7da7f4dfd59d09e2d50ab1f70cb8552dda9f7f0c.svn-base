<template>
  <div>
    <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" @click="doDownLoadPrinter()">下载打印软件</el-button>
    <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" @click="doGainPrinter()">获取打印机</el-button>
    <el-select v-model="value" placeholder="请选择" @change="changePrint">
      <el-option
        v-for="(item,index) in selectList"
        :key="index"
        :label="item.name"
        :value-key="value"
        :value="item">
      </el-option>
    </el-select>
    <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" @click="doPrintPrinter()" v-if="printShow">开始打印</el-button>
    <img :src="printSrc" alt="">
  </div>
</template>

<script>
import {initprint, getAllPrintersApi, selectPrinterApi, prints} from '../../utils/labelprint.js'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      printShow: false,
      selectList: [],
      value: null,
      printSrc: '',
      host: process.env.BASE_API + process.env.JS_Server
    }
  },
  methods: {
    // 下载
    doDownLoadPrinter() {
      window.open(this.host + '/file/downloadJcSoft')
    },
    // 获取打印机
    doGainPrinter() {
      getAllPrintersApi(this)
    },
    // 切换打印机
    changePrint(e) {
      this.printShow = true
      selectPrinterApi(e.name, e.id)
    },
    // 开始打印
    doPrintPrinter() {
      prints(this.data, this.data.length, 1, this)
    }
  },
  mounted () {
    initprint()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
