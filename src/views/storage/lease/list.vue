<!--仪器租赁管理 -->
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
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import machineList from './machine_list.vue'
import {getLeaseTaskQueryPageData} from '../../../api/sampling/sampTask.js'
import {getLeaseTaskAllLeaseTaskOpen, getLeaseTaskAllLeaseTaskEnd} from '../../../api/storage/lease.js'
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
        reportNo: '',
        proName: '',
        status: '0'
      },
      fromData: [
        {type: 'input', prop: 'reportNo', label: '报告编号'},
        {type: 'select',
          prop: 'status',
          label: '任务状态',
          data: [
            {id: '0', name: '进行中'},
            {id: '1', name: '已完成'},
            {id: '2', name: '租借中'}
          ]}
      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'taskName',
        label: '任务名称',
        width: 90
      }, {
        prop: 'reportNo',
        label: '报告编号',
        width: 90
      }, {
        prop: 'groupName',
        label: '分组名称',
        width: 90
      }, {
        prop: 'oper',
        label: '租借人',
        width: 90
      }, {
        prop: 'startTime',
        label: '开始时间',
        width: 90
      }, {
        prop: 'endTime',
        label: '结束时间',
        width: 90
      }, {
        prop: 'statusName',
        label: '状态',
        width: 90
      }],
      button: {
        width: 250,
        buttonList: [
          {name: '仪器明细', type: 'primary', click: 'handleMachine'},
          {name: '一键租赁',
            type: 'primary',
            click: 'handleOpen',
            condition: function (params) {
              if (params.status === '0') {
                return true
              }
            }},
          {name: '一键归还',
            type: 'primary',
            click: 'handleEnd',
            condition: function (params) {
              if (params.status === '2') {
                return true
              }
            }}
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getLeaseTaskQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '0':
              xdd.statusName = '进行中'
              break
            case '1':
              xdd.statusName = '已完成'
              break
            case '2':
              xdd.statusName = '租借中'
              break
          }
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleMachine (params) {
      this.$layer.iframe({
        content: {
          content: machineList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Max,
        title: '仪器明细列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleOpen (params) {
      let that = this
      this.$share.confirm({
        message: '此操作将租赁所有仪器, 是否继续？',
        type: 'success',
        confirm: function () {
          let ids = {}
          ids.id = params.id
          getLeaseTaskAllLeaseTaskOpen(ids).then(res => {
            that.getListData()
            that.$share.message('租赁成功', 'success')
          })
        }
      })
    },
    handleEnd (params) {
      let that = this
      this.$share.confirm({
        message: '此操作将归还所有仪器, 是否继续？',
        type: 'success',
        confirm: function () {
          let ids = {}
          ids.id = params.id
          getLeaseTaskAllLeaseTaskEnd(ids).then(res => {
            that.getListData()
            that.$share.message('归还成功', 'success')
          })
        }
      })
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    doSearch () {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
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
