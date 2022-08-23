<!-- 样品管理 -->
<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary"
        :size="$layer_Size.buttonSize"
        class="default-btn"
        icon="el-icon-search"
        @click="doSearch()">查询</el-button>
      <el-button type="primary"
        :size="$layer_Size.buttonSize"
        class="default-btn"
        icon="el-icon-refresh"
        @click="doReset('fromValiData')">重置</el-button>
        <el-button type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon="el-icon-edit-outline"
          @click="handleBatchEdit()"
          :disabled="params.contStatus === '07'">批量保存</el-button>
      <el-upload
        class="upload-demo"
        :action="importControlAction"
        :headers="headers"
        :show-file-list="false"
        :on-success="onSuccess"
        :on-error="onError"
        :limit="30"
        style="display: inline-block;margin:0 10px">
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn">导入样品</el-button>
      </el-upload>
      <el-button type="primary"
        :size="$layer_Size.buttonSize"
        class="default-btn"
        icon=""
        @click="handleExport">导出样品</el-button>
    </fromSearch>
    <tableItem
      :obj="this"
      :tableData="tableData"
      :tableHeader="tableHeader"
      :dataSum='fromValiData.dataSum'
      :loading="loading"
      :isSelection="false"
      @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import {getSyReturnQuerySampNo} from '../../../api/check/returnSample.js'
import { getSamplingTaskSaveSampNoList } from '@/api/sampling/sampTask.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        { type: 'input', prop: 'sampNo', label: '样品编号' }
      ],
      tableData: [],
      tableHeader: [{
        prop: 'custSampNo',
        type: 'input',
        label: '客户样品编号'
      }, {
        prop: 'show',
        type: 'input',
        label: '样品表现'
      }, {
        prop: 'sampNo',
        label: '样品编号'
      }, {
        prop: 'sampLxName',
        type: 'input',
        label: '样品类型'
      }, {
        prop: 'targetName',
        label: '检测指标'
      }, {
        prop: 'cyTime',
        type: 'date',
        label: '采样时间'
      }, {
        prop: 'syDate',
        type: 'date',
        label: '收样时间'
      }],
      host: process.env.BASE_API + process.env.JS_Server,
      importControlAction: process.env.BASE_API + process.env.JS_Server + '/syReturn/loadin',
      headers: { token: this.$store.getters.userInfo.token }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getSyReturnQuerySampNo(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleBatchEdit() {
      let ids = []
      this.tableData.some((xdd, index) => {
        let params = JSON.parse(JSON.stringify(xdd))
        params.workType = '2' // 1新增 2修改
        ids.push(params)
      })
      getSamplingTaskSaveSampNoList(ids).then(res => {
        this.getListData()
        this.$share.message()
      })
    },
    handleExport() {
      window.open(
        this.host +
          '/syReturn/loadOutSampNo?' +
          'reportNo=' + this.params.reportNo +
          '&token=' + this.$store.getters.userInfo.token
      )
    },
    onSuccess(response, file, fileList) {
      this.$share.message(response.result)
      this.getListData()
    },
    onError() {
      this.$share.message('导入失败', '请联系管理员')
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted() {
    this.fromValiData.reportNo = this.params.reportNo
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
