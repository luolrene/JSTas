<!-- 租借仪器明细 -->
<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" customHeight="450" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import {
  getLeaseMachineItemQueryPageData,
  getLeaseMachineItemBackMachine
} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {},
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        machineNo: '',
        reportNo: '',
        machineXh: ''
      },
      fromData: [
        { type: 'input', prop: 'machineNo', label: '仪器编号' },
        { type: 'input', prop: 'reportNo', label: '报告编号' },
        { type: 'input', prop: 'machineXh', label: '仪器型号' }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'machineNo',
          label: '仪器编号',
          width: 90
        },
        {
          prop: 'machineXh',
          label: '仪器型号',
          width: 90
        },
        {
          prop: 'name',
          label: '设备名称',
          width: 90
        },
        {
          prop: 'statusName',
          label: '设备状态',
          width: 90
        },
        {
          prop: 'reportNo',
          label: '报告编号',
          width: 90
        }
      ],
      button: {
        width: 120,
        buttonList: [
          {
            name: '仪器归还',
            type: 'primary',
            click: 'getBack',
            condition: params => {
              if (params.status === '1') {
                return true
              } else {
                return false
              }
            }
          }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.leaseTaskId = this.params.id
      this.fromValiData.status = ['1', '2'].join(',')
      getLeaseMachineItemQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.status) {
              case '0':
                xdd.statusName = '闲置'
                break
              case '1':
                xdd.statusName = '出借'
                break
              case '2':
                xdd.statusName = '预约'
                break
              case '3':
                xdd.statusName = '维修'
                break
              case '4':
                xdd.statusName = '损坏'
                break
              case '5':
                xdd.statusName = '停用'
                break
              case '6':
                xdd.statusName = '报废'
                break
              case '7':
                xdd.statusName = '送检'
                break
            }
          })
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    getBack(params, title) {
      let obj = {}
      obj.leaseTaskId = params.leaseTaskId
      obj.machineIds = params.machineId
      getLeaseMachineItemBackMachine(obj)
      let index = '是否归还该仪器?'
      if (title) {
        index = title
      }
      this.$confirm(index, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          getLeaseMachineItemBackMachine(params).then(res => {
            this.$message({
              type: 'success',
              message: '归还成功'
            })
            this.getListData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    }
  },
  mounted() {
    this.getListData()
  },
  destroyed() {
    this.$parent.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
