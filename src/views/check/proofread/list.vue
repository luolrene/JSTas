<!-- 指标校对 -->
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
        status: '0,3',
        gsType: '1',
        targetStatus: '4' // 0初始 1审核中 2审核通过 3退回 4校对中
      },
      fromData: [
        {type: 'input', prop: 'proName', label: '项目名称'},
        {type: 'input', prop: 'custName', label: '客户名称'},
        {type: 'input', prop: 'reportNo', label: '报告编号'},
        {type: 'select',
          prop: 'gsType',
          label: '归属',
          isNoClear: true,
          data: [
            { id: '1', name: '我的' },
            { id: '2', name: '全部' }
          ]}
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
        label: '报告编号',
        width: 120
      }, {
        prop: 'statusName',
        label: '状态',
        width: 110
      },
      {
        prop: 'contStatusName',
        label: '合同状态',
        width: 110
      }],
      button: {
        width: 120,
        buttonList: [
          {name: '指标校对', type: 'primary', click: 'handleVerity'}
        ]
      }
    }
  },
  watch: {
    '$route': {
      deep: true,
      handler: function (newV, oldV) {
        if (newV.params.type === '1') {
          this.fromValiData.isScene = '1'
        } else if (newV.params.type === '2') {
          this.fromValiData.isScene = '0'
        }
        this.getListData()
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
          switch (xdd.contStatus) {
            case '02':
              xdd.contStatusName = '审核通过'
              break
            case '06':
              xdd.contStatusName = '进行中'
              break
            case '05':
              xdd.contStatusName = '已完成'
              break
            case '07':
              xdd.contStatusName = '变更审核'
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
    handleVerity (params) {
      this.$layer.iframe({
        content: {
          content: targetList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            isScene: this.fromValiData.isScene
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
    if (this.$route.params.type === '1') {
      this.fromValiData.isScene = '1'
    } else if (this.$route.params.type === '2') {
      this.fromValiData.isScene = '0'
    }
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
