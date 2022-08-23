<!-- 现场-检测任务管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" :isSelection="false" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import targetList from './target_list.vue'
import { getDetectionQueryPageTask } from '../../../api/check/checkTask.js'
import { getContractQueryContractById } from '../../../api/contract/msg.js'
import { getDetectionFinishMyJob } from '../../../api/report/edit.js'
export default {
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        status: '3', // -1未启动 0进行中 1完成 2放弃 3退回
        step: '4'
      },
      fromData: [
        { type: 'input', prop: 'proName', label: '项目名称' },
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'reportNo', label: '报告编号' }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'proName',
          label: '项目名称',
          type: 'view',
          width: 180,
          condition: function(params) {
            if (params.taskLev === '2') {
              return '#E6A23C'
            } else if (params.taskLev === '3') {
              return 'red'
            }
          }
        },
        {
          prop: 'custName',
          label: '客户名称',
          width: 120
        },
        {
          prop: 'reportNo',
          label: '报告任务编号',
          width: 120
        },
        {
          prop: 'statusName',
          label: '状态',
          width: 110
        },
        {
          prop: 'contStatusName',
          label: '合同状态',
          width: 110
        }
      ],
      button: {
        width: 120,
        buttonList: [
          {
            name: '完成',
            type: 'primary',
            click: 'handleFinish'
          },
          {
            name: '样品管理',
            type: 'primary',
            click: 'handleTarget'
          }
        ]
      }
    }
  },
  watch: {
    $route: {
      deep: true,
      handler: function(newV, oldV) {
        if (newV.params.type === '1') {
          this.fromValiData.isScene = '1'
          this.fromValiData.returnType = '2'
        } else if (newV.params.type === '2') {
          this.fromValiData.isScene = '0'
          this.fromValiData.returnType = '1'
        }
        this.getListData()
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getDetectionQueryPageTask(this.fromValiData)
        .then(res => {
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
                xdd.statusName = '退回' + '(' + xdd.returnDetail + ')'
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
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleFinish(params) { 
      this.$share.confirm({
        message: '此操作将完成报告, 是否继续？',
        type: 'success',
        confirm: () => {
          let ids = {}
          ids.ids = params.id
          ids.type = this.fromValiData.returnType
          getDetectionFinishMyJob(ids).then(res => {
            this.$share.message('完成成功', 'success')
            this.getListData()
          }).catch(err => {
            this.$message.error(err.message)
          })
        }
      })
    },
    handleDetails(params) {
      getContractQueryContractById({ contId: params.contId }).then(res => {
        this.$layer.iframe({
          content: {
            content: details, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: res.result
            } // props
          },
          area: this.$layer_Size.Self_Max,
          title: '查看详情',
          maxmin: true,
          shadeClose: false
        })
      })
    },
    handleTarget(params) {
      this.$layer.iframe({
        content: {
          content: targetList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            isScene: this.fromValiData.isScene // 是否现场1是0否
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '指标列表',
        maxmin: true,
        shadeClose: false
      })
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
    if (this.$route.params.type === '1') {
      this.fromValiData.isScene = '1'
      this.fromValiData.returnType = '2'
    } else if (this.$route.params.type === '2') {
      this.fromValiData.isScene = '0'
      this.fromValiData.returnType = '1'
    }
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
