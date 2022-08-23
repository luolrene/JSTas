<!-- 收样任务管理 -->
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
import sampleList from './sample_list.vue'
import planList from '../../sampling/sampTask/plan_list.vue'
import { getSamplingTaskQuerySamplingPageList } from '../../../api/sampling/sampTask.js'
import { getContractQueryContractById } from '../../../api/contract/msg.js'
export default {
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        name: '',
        status: '1', // 启动
        // type: '1', // 1采样 2送样
        isjy: '1' // 是否交样  1是0否
      },
      fromData: [
        {type: 'input', prop: 'reportNo', label: '报告编号'},
        { type: 'input', prop: 'name', label: '采样任务名称' },
        {
          type: 'select',
          prop: 'status',
          label: '采样任务状态',
          data: [
            { id: '0', name: '未启动' },
            { id: '1', name: '启动' },
            { id: '2', name: '撤回' },
            { id: '3', name: '完成' },
            { id: '4', name: '放弃' }
          ]
        },
        {
          type: 'select',
          prop: 'type',
          label: '采样类别',
          data: [{ id: '1', name: '采样' }, { id: '2', name: '送样' }]
        }
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
          prop: 'name',
          label: '采样任务名称',
          width: 120
        },
        {
          prop: 'name',
          label: '报告名称',
          width: 90
        },
        {
          prop: 'reportNo',
          label: '报告编号',
          width: 90
        },
        {
          prop: 'isCycleName',
          label: '是否周期',
          width: 90
        },
        {
          prop: 'opermanName',
          label: '现场负责人',
          width: 140
        },
        {
          prop: 'statusName',
          label: '采样任务状态',
          width: 110
        },
        {
          prop: 'funIsOkName',
          label: '方案状态',
          width: 110
        },
        {
          prop: 'contStatusName',
          label: '合同状态',
          width: 110
        }
      ],
      button: {
        width: 200,
        buttonList: [
          {
            name: '方案确认',
            type: 'primary',
            click: 'handlePlan',
            condition: function(params) {
              if (params.status === '1' && params.funIsOk === '0') {
                return true
              }
            }
          },
          {
            name: '任务单下载',
            type: 'primary',
            click: 'handleTaskFile',
            condition: function(params) {
              if (params.type === '2') {
                return true
              }
            }
          },
          {
            name: '样品管理',
            type: 'primary',
            click: 'handleSample',
            condition: function(params) {
              if (params.status === '1' && params.funIsOk === '1') {
                return true
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getSamplingTaskQuerySamplingPageList(this.fromValiData)
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
            switch (xdd.isCycle) {
              case '1':
                xdd.isCycleName = '是'
                break
              case '0':
                xdd.isCycleName = '否'
                break
            }
            switch (xdd.funIsOk) {
              case '1':
                xdd.funIsOkName = '已确认'
                break
              case '0':
                xdd.funIsOkName = '未确认'
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
    handlePlan(params) {
      this.$layer.iframe({
        content: {
          content: planList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '方案列表',
        maxmin: true,
        shadeClose: false
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
    handleTaskFile(params) {
      window.open(
        process.env.BASE_API +
          process.env.JS_Server +
          '/samplingTask/downTaskPaper?sampTaskId=' +
          params.id +
          '&token=' +
          this.$store.getters.userInfo.token
      )
    },
    handleSample(params) {
      this.$layer.iframe({
        content: {
          content: sampleList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            isScene: '0'
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '样品列表',
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
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
