<!-- 送样报告 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>
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
      :isSelection="false"
      @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import reportPointList from '../../sampling/majorTask/point_list.vue'
import cycle from '../../sampling/majorTask/cycle.vue'
import {
  getReportTaskQueryPageList,
  getReportTaskAddOrModifyReport
} from '../../../api/sampling/majorTask.js'
import { getReportTaskStartReportTask } from '../../../api/sampling/reportTask.js'
export default {
  data() {
    return {
      loading: false,
      boxshow: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        status: '2',
        type: '2',
        name: null
      },
      fromData: [
        { type: 'input', prop: 'name', label: '监测计划' },
        { type: 'input', prop: 'reportNo', label: '报告编号' }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '监测计划',
          width: 90
        },
        {
          prop: 'reportNo',
          label: '报告编号',
          width: 90
        },
        {
          prop: 'proName',
          label: '项目名称',
          width: 90
        },
        {
          prop: 'custName',
          label: '客户名称',
          width: 90
        },
        {
          prop: 'isCycleName',
          label: '是否周期',
          type: 'view2',
          width: 90,
          condition: params => {
            if (params.isCycle === '1') {
              return '#F56C6C'
            }
          }
        },
        {
          prop: 'statusName',
          label: '报告任务状态',
          width: 130
        }
      ],
      button: {
        width: 350,
        buttonList: [
          {
            name: '启动',
            type: 'primary',
            click: 'handleStart',
            condition: function(params) {
              if (
                (params.status === '0' || params.status === '2') &&
                params.contStatus !== '07'
              ) {
                return true
              }
            }
          },
          {
            name: '撤回',
            type: 'primary',
            click: 'handleWithdraw',
            condition: function(params) {
              if (params.status === '1' && params.contStatus !== '07') {
                return true
              }
            }
          },
          {
            name: '放弃',
            type: 'primary',
            click: 'handleGiveUp',
            condition: function(params) {
              if (
                (params.status === '0' ||
                  params.status === '1' ||
                  params.status === '2') &&
                params.contStatus !== '07'
              ) {
                return true
              }
            }
          },
          {
            name: '点位录入',
            type: 'primary',
            click: 'handlePoint',
            condition: function(params) {
              return params.status !== '4' && params.contStatus !== '07'
            }
          }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getReportTaskQueryPageList(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.status) {
              case '0':
                xdd.statusName = '未启动'
                break
              case '1':
                xdd.statusName = '启动'
                break
              case '2':
                xdd.statusName = '撤回'
                break
              case '3':
                xdd.statusName = '完成'
                break
              case '4':
                xdd.statusName = '放弃'
                break
            }
            switch (xdd.contStatus) {
              case '00':
                xdd.contStatusName = '草稿'
                break
              case '01':
                xdd.contStatusName = '审核中'
                break
              case '02':
                xdd.contStatusName = '审核通过'
                break
              case '03':
                xdd.contStatusName = '审核退回'
                break
              case '04':
                xdd.contStatusName = '放弃'
                break
              case '05':
                xdd.contStatusName = '已完成'
                break
              case '06':
                xdd.contStatusName = '进行中'
                break
              case '07':
                xdd.contStatusName = '变更审核'
                break
            }
            switch (xdd.isCycle) {
              case '1':
                xdd.isCycleName =
                  '是' +
                  (xdd.checkDetail === null ? '' : '(' + xdd.checkDetail + ')')
                break
              case '0':
                xdd.isCycleName = '否'
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
    handlePoint(params) {
      this.$layer.iframe({
        content: {
          content: reportPointList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            pointType: '2'
          } // props
        },
        area: this.$layer_Size.Max,
        title: '报告任务点位列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleStart(params) {
      this.$share.confirm({
        message: '此操作将启动合同, 是否继续',
        type: 'success',
        confirm: () => {
          let ids = {}
          ids.reportNo = params.reportNo
          getReportTaskStartReportTask(ids).then(res => {
            this.getListData()
            this.$share.message('启动成功', 'success')
          })
        }
      })
    },
    handleWithdraw(params) {
      this.$share.confirm({
        message: '此操作将撤回合同, 是否继续',
        type: 'success',
        confirm: () => {
          let ids = JSON.parse(JSON.stringify(params))
          ids.status = '2'
          getReportTaskAddOrModifyReport(ids).then(res => {
            this.getListData()
            this.$share.message('撤回成功', 'success')
          })
        }
      })
    },
    handleGiveUp(params) {
      this.$share.confirm({
        message: '此操作将放弃合同, 是否继续',
        type: 'success',
        confirm: () => {
          let ids = JSON.parse(JSON.stringify(params))
          ids.status = '4'
          getReportTaskAddOrModifyReport(ids).then(res => {
            this.getListData()
            this.$share.message('放弃成功', 'success')
          })
        }
      })
    },
    handleDetails2(params) {
      if (params.isCycle === '1') {
        let isShow = false
        if (params.checkDetail === null) {
          isShow = true
        }
        this.$layer.iframe({
          content: {
            content: cycle, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params,
              isShow: isShow
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '周期检测内容',
          maxmin: true,
          shadeClose: false
        })
      }
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
  created() {}
}
</script>

<style scoped lang="scss">
</style>
