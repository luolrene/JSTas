<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    :isSelection="false"
    customHeight="500"
    :isPage="false"></tableItem>
  </div>
</template>

<script>
import {getOriginalQueryAllModels} from '../../../api/check/checkTask.js'
export default {
  props: {
    layerid: ''
  },
  data () {
    return {
      radio: 3,
      loading: false,
      fromValiData: {
        type: '2'
      },
      fromData: [
        {type: 'input', prop: 'fileName', label: '文件名'},
        {type: 'input', prop: 'fileNo', label: '文件编号'}
      ],
      tableData: [],
      tableHeader: [{
        prop: 'fileName',
        label: '文件名',
        width: 420
      }, {
        prop: 'fileNo',
        label: '文件编号',
        width: 140
      }],
      button: {
        width: 140,
        buttonList: [
          {name: '下载',
            type: 'primary',
            click: 'downLoad'
          }
        ]
      },
      host: process.env.BASE_API + process.env.JS_Server
    }
  },
  methods: {
    getListData() {
      getOriginalQueryAllModels(this.fromValiData).then(res => {
        this.tableData = res.result
      })
    },
    downLoad(params) {
      window.open(this.host + '/originalCy/downLoadModel?' +
      'fileName=' + params.fileName +
      '&token=' + this.$store.getters.userInfo.token +
      '&type=' + params.fileType)
    },
    doSearch () {
      this.getListData()
    },
    doReset (formName) {
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    }
  },
  mounted () {
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
  .el-radio{
    margin-right: 0;
    margin-bottom: 15px;
  }
  .el-radio.is-bordered+.el-radio.is-bordered{
    margin-left: 0;
  }
</style>
