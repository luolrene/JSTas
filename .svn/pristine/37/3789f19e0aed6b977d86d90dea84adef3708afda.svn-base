<!--仪器租赁任务列表 -->
<template>
  <div class="pc-container" style="width: calc(100% - 30px);">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()">批量删除</el-button>
      <el-button  type="primary" :size="$layer_Size.buttonSize" icon="el-icon-check" @click="handleConfirm('fromValiData')" v-if="reportData.length > 0">确认</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import edit from './edit.vue'
import machineList from '../../storage/lease/machine_list.vue'
import {getLeaseTaskQueryPageData, getLeaseTaskDelLeaseTask, getLeaseTaskAddOrModify} from '../../../api/sampling/sampTask.js'
export default {
  components: {

  },
  props: {
    layerid: '',
    reportData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: false,
      boxshow: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
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
        label: '组名称',
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
        width: 210,
        buttonList: [
          {name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: function (params) {
              if (params.status === '0') {
                return true
              }
            }
          },
          {name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: function (params) {
              if (params.status === '0') {
                return true
              }
            }
          },
          {name: '仪器明细',
            type: 'primary',
            click: 'handleMachine',
            condition: function (params) {
              if (params.status !== '0') {
                return true
              }
            }
          }
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
    handleConfirm () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选一个仪器租赁任务', 'warning')
        return
      } else if (this.multipleSelection.length > 1) {
        this.$share.message('只能勾选一个仪器租赁任务', 'warning')
        return
      }
      let ids = JSON.parse(JSON.stringify(this.multipleSelection[0]))
      this.reportData.forEach(xdd => {
        ids.reportNo += ',' + xdd.reportNo
      })
      getLeaseTaskAddOrModify(ids).then(res => {
        this.$parent.getListData()
        this.$layer.close(this.layerid)
        this.$share.message('指派成功', 'success')
      })
    },
    handleAdd () {
      // 根据报告编号获取报告任务中的点位列表
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {

          }// props
        },
        area: ['700px', this.$layer_Size.layerSelfHeight],
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit (params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: ['700px', this.$layer_Size.layerSelfHeight],
        title: '编辑',
        maxmin: true,
        shadeClose: false
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
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    handleDelete (row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getLeaseTaskDelLeaseTask({ids: row.id}).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleBatchDel () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = {id: ''}
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.handleDelete(ids)
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

  },
  destroyed () {
    if (typeof (this.$parent.getListData) === 'function') {
      this.$parent.getListData()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
