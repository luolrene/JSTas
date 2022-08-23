<!-- 添加点位 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <el-form-item label="点位名称:" prop="name">
        <el-input v-model="fromValiData.name" placeholder=""/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-check" @click="doConfirm()">确认</el-button>
      </el-form-item>
    </el-form>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    customHeight="450"></tableItem>
  </div>
</template>

<script>
import {getReportTaskQueryPagePoint} from '../../../api/sampling/majorTask.js'
import {getSamplingTaskAddSampPoint} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {

  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        name: ''
      },
      tableData: [

      ],
      tableHeader: [{
        prop: 'pointName',
        label: '点位名称',
        width: 90
      }, {
        prop: 'reportNo',
        label: '报告编号',
        width: 90
      }, {
        prop: 'sampLbName',
        label: '样品类别',
        width: 90
      }, {
        prop: 'sampLxName',
        label: '样品类型',
        width: 90
      }, {
        prop: 'targets',
        label: '指标明细',
        width: 200
      }, {
        prop: 'pc',
        label: '频次',
        width: 90
      }, {
        prop: 'days',
        label: '检测天数',
        width: 90
      }],
      button: {
        buttonList: []
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.reportNo = this.params.reportNo
      this.fromValiData.chooseFlag = '1'
      getReportTaskQueryPagePoint(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    doConfirm () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请选择点位', 'warning')
        return
      }
      let ids = {ids: ''}
      this.multipleSelection.forEach(xdd => {
        ids.ids += xdd.id + ','
      })
      ids.samplingTaskId = this.params.id
      ids.ids = ids.ids.substring(0, ids.ids.length - 1)
      getSamplingTaskAddSampPoint(ids).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
      })
    },
    doSearch () {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
      this.$refs[formName].resetFields()
      this.getListData()
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
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

</style>
