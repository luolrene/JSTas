<!-- 现场-检测任务管理 -->
<template>
  <div class="pc-container">
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
import details from '../../contract/msg/details.vue'
import targetList from './target_list.vue'
import {getDetectionQueryPageTask} from '../../../api/check/checkTask.js'
import {getContractQueryContractById} from '../../../api/contract/msg.js'
export default {
  components: {

  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        isScene: '1', // 是否现场 1是 0否
        status: '0', // -1未启动 0进行中 1完成 2放弃 3退回
        targetStatus: '0' // 0初始 1审核中 2审核通过 3退回
      },
      fromData: [
        {type: 'input', prop: 'proName', label: '项目名称'},
        {type: 'input', prop: 'custName', label: '客户名称'},
        {type: 'input', prop: 'reportNo', label: '报告编号'},
        {type: 'select',
          prop: 'status',
          label: '任务状态',
          data: [
            {id: '-1', name: '未启动'},
            {id: '0', name: '进行中'},
            {id: '1', name: '完成'},
            {id: '2', name: '放弃'}
          ],
          click: 'getChangeStatus'}
      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'proName',
        label: '项目名称',
        type: 'view',
        width: 180,
        condition: function (params) {
          if (params.taskLev === '2') {
            return '#E6A23C'
          } else if (params.taskLev === '3') {
            return 'red'
          }
        }
      }, {
        prop: 'custName',
        label: '客户名称',
        width: 120
      }, {
        prop: 'reportNo',
        label: '报告任务编号',
        width: 120
      }, {
        prop: 'statusName',
        label: '状态',
        width: 110
      }],
      button: {
        width: 120,
        buttonList: [
          {name: '样品管理',
            type: 'primary',
            click: 'handleTarget',
            condition: function (params) {
              if (params.status === '0' || params.status === '1') {
                return true
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getDetectionQueryPageTask(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '-1':
              xdd.statusName = '未启动'
              break
            case '0':
              xdd.statusName = '进行中'
              break
            case '1':
              xdd.statusName = '完成'
              break
            case '2':
              xdd.statusName = '放弃'
              break
            case '3':
              xdd.statusName = '退回'
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
    getChangeStatus (params) {
      if (params === '1') {
        this.fromValiData.targetStatus = '2'
      } else {
        this.fromValiData.targetStatus = '0'
      }
      this.doSearch()
    },
    handleDetails (params) {
      getContractQueryContractById({contId: params.contId}).then(res => {
        this.$layer.iframe({
          content: {
            content: details, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: res.result
            }// props
          },
          area: this.$layer_Size.Self_Max,
          title: '查看详情',
          maxmin: true,
          shadeClose: false
        })
      })
    },
    handleTarget (params) {
      this.$layer.iframe({
        content: {
          content: targetList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            isScene: this.fromValiData.isScene // 是否现场1是0否
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '指标列表',
        maxmin: true,
        shadeClose: false
      })
    },
    doSearch () {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
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
