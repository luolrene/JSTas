<!-- 现场仪器分配 -->
<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-check" @click="handleConfirm()">确认</el-button>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    customHeight="450"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import {getLeaseMachineItemQueryPageData} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    params: Object,
    reportNo: String,
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
        reportNo: '',
        machineXh: ''
      },
      fromData: [
        {type: 'input', prop: 'machineXh', label: '仪器型号'}
      ],
      tableData: [

      ],
      tableHeader: [ {
        prop: 'machineNo',
        label: '仪器编号',
        width: 90
      }, {
        prop: 'machineXh',
        label: '仪器型号',
        width: 90
      }, {
        prop: 'reportNo',
        label: '报告编号',
        width: 90
      }, {
        prop: 'name',
        label: '设备名称',
        width: 90
      }, {
        prop: 'reportNo',
        label: '报告编号',
        width: 90
      }],
      button: {
        width: 120,
        buttonList: [

        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.reportNo = this.reportNo
      getLeaseMachineItemQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          xdd.statusName = xdd.status === '1' ? '已完成' : '进行中'
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleConfirm () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选仪器', 'warning')
        return
      }
      this.$parent.getMachineData(this.multipleSelection)
      this.$layer.close(this.layerid)
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
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

</style>
