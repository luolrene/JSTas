<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="4">
      <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
    </el-col>
    <el-col :span="20" style="padding-left: 15px;">
      <p style="font-size:22px;text-align:center">{{title}}</p>
      <tableItem
      :obj="this"
      :tableData="tableData"
      :tableHeader="tableHeader"
      :loading="loading"
      :dataSum='fromValiData.dataSum'
      :button="button"
      @handleSizeChange="handleSizeChange">
      </tableItem>
      <div style="display: flex;margin-top: -45px;">
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import planList from '../../../sampling/sampTask/plan_list.vue'
import nodeShow from '../nodeShow.vue'
import {
  getContractQueryStructure,
  getContractQueryPageData
} from '../../../../api/contract/msg.js'
import {
  getMainTaskQueryPageList,
  getReportTaskQueryPageList
} from '../../../../api/sampling/majorTask.js'
import { getSamplingTaskQuerySamplingPageList } from '../../../../api/sampling/sampTask.js'

export default {
  props: {
    params: Object
  },
  data() {
    return {
      loading: false,
      title: '合同任务列表',
      props: {
        label: 'name',
        children: 'children'
      },
      treeData: [],
      tableData: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      clickParams: {},
      level: 1, // 1合同任务   2主任务   3报告任务   4采样任务
      tableHeader: [],
      tableHeader_contract: [
        {
          prop: 'project',
          label: '项目名称',
          width: 180
        },
        {
          prop: 'plateName',
          label: '项目板块',
          width: 90
        },
        {
          prop: 'projectTypeName',
          label: '项目类型',
          width: 90
        },
        {
          prop: 'proTerm',
          label: '项目期限',
          width: 90
        },
        {
          prop: 'statusName',
          label: '合同状态',
          width: 90
        }
      ],
      tableHeader_majorTask: [
        {
          prop: 'custName',
          label: '客户名称',
          width: 90
        },
        {
          prop: 'proName',
          label: '项目名称',
          width: 180
        },
        {
          prop: 'taskName',
          label: '主任务名称',
          width: 110
        },
        {
          prop: 'cyTerm',
          label: '采样期限',
          width: 90
        },
        {
          prop: 'proTerm',
          label: '项目期限',
          width: 90
        },
        {
          prop: 'statusName',
          label: '主任务状态',
          width: 110
        },
        {
          prop: 'opermanName',
          label: '现场负责人',
          width: 140
        }
      ],
      tableHeader_reportTask: [
        {
          prop: 'custName',
          label: '客户名称',
          width: 90
        },
        {
          prop: 'proName',
          label: '项目名称',
          width: 180
        },
        {
          prop: 'name',
          label: '监测计划',
          width: 90
        },
        {
          prop: 'reportNo',
          label: '报告编号',
          width: 140
        },
        {
          prop: 'reportMoney',
          label: '报告金额',
          width: 140
        },
        {
          prop: 'reportStart',
          label: '报告开始日期',
          width: 120
        },
        {
          prop: 'complete',
          label: '报告完成日期',
          width: 120
        },
        // {
        //   prop: 'stepName',
        //   label: '当前环节',
        //   width: 140
        // },
        {
          prop: 'isCycleName',
          label: '是否周期',
          width: 90
        },
        {
          prop: 'statusName',
          label: '报告任务状态',
          width: 120
        },
        {
          prop: 'opermanName',
          label: '现场负责人',
          width: 140
        }
      ],
      tableHeader_sampTask: [
        {
          prop: 'proName',
          label: '项目名称',
          width: 180
        },
        {
          prop: 'name',
          label: '采样任务名称',
          width: 120
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
        }
      ],
      button: {
        buttonList: []
      },
      button_default: {
        buttonList: []
      },
      button_reportTask: {
        width: 200,
        buttonList: [
          {
            name: '节点展示',
            type: 'primary',
            click: 'handleNodeShow',
            condition: function(params) {
              if (params.status === '1' || params.status === '3') {
                return true
              }
            }
          },
          {
            name: '方案查看',
            type: 'primary',
            click: 'handlePlan_reportTask',
            condition: function(params) {
              if (params.status === '1' || params.status === '3') {
                return true
              }
            }
          }
        ]
      },
      button_sampTask: {
        width: 120,
        buttonList: [
          {
            name: '方案查看',
            type: 'primary',
            click: 'handlePlan_sampTask',
            condition: function(params) {
              if (params.status === '1') {
                return true
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    level(newV, oldV) {
      if (newV === 1) {
        this.title = '合同任务列表'
      } else if (newV === 2) {
        this.title = '主任务列表'
      } else if (newV === 3) {
        this.title = '报告任务列表'
      }
    }
  },
  methods: {
    // 列表数据
    getListData(params) {
      let ids = JSON.parse(JSON.stringify(this.fromValiData))
      switch (this.level) {
        case 1:
          this.tableHeader = this.tableHeader_contract
          this.button = this.button_default
          ids.contId = this.params.id
          this.getContractData(ids)
          break
        case 2:
          this.tableHeader = this.tableHeader_majorTask
          this.button = this.button_default
          ids.type = params.type
          ids.contId = params.id
          ids.isShow = '1'
          this.getMajorTaskData(ids)
          break
        case 3:
          this.tableHeader = this.tableHeader_reportTask
          this.button = this.button_reportTask
          ids.type = params.type
          ids.mainId = params.id
          ids.isShow = '1'
          ids.orderBy = 'reportNo,asc'
          this.getReportTaskData(ids)
          break
        // case 4:
        //   this.tableHeader = this.tableHeader_sampTask
        //   this.button = this.button_sampTask
        //   ids.type = params.type
        //   ids.reportNo = params.id
        //   ids.isShow = '1'
        //   this.getSampTaskData(ids)
        //   break
      }
    },
    // 所有任务-树形
    getTreeData() {
      getContractQueryStructure({ contId: this.params.id }).then(res => {
        this.treeData = res.result
      })
    },
    // 合同任务数据
    getContractData(ids) {
      this.loading = true
      getContractQueryPageData(ids)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.status) {
              case '00':
                xdd.statusName = '草稿'
                break
              case '01':
                xdd.statusName = '审核中'
                break
              case '02':
                xdd.statusName = '审核通过'
                break
              case '03':
                xdd.statusName = '审核退回'
                break
              case '04':
                xdd.statusName = '放弃'
                break
              case '05':
                xdd.statusName = '已完成'
                break
              case '06':
                xdd.statusName = '进行中'
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
    // 主任务数据
    getMajorTaskData(ids) {
      getMainTaskQueryPageList(ids)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.status) {
              case '0':
                xdd.statusName = '未启动'
                break
              case '1':
                xdd.statusName = '进行中'
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
    // 报告任务数据
    getReportTaskData(ids) {
      this.loading = true
      getReportTaskQueryPageList(ids)
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
            switch (xdd.step) {
              case '1':
                xdd.stepName = '现场'
                break
              case '2':
                xdd.stepName = '实验室'
                break
              case '3':
                xdd.stepName = '报告编辑'
                break
              case '4':
                xdd.stepName = '财务结算'
                break
              case '5':
                xdd.stepName = '报告寄送'
                break
              case '6':
                xdd.stepName = '寄送完成'
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
    // 采样任务数据
    getSampTaskData(ids) {
      this.loading = true
      getSamplingTaskQuerySamplingPageList(ids)
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
    handleNodeShow(params) {
      this.$layer.iframe({
        content: {
          content: nodeShow, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '节点展示',
        maxmin: true,
        shadeClose: false
      })
    },
    handlePlan_reportTask(params) {
      this.$layer.iframe({
        content: {
          content: planList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            reportNo: params.reportNo,
            confirmPlan: false,
            editPlan: false,
            selectTableShow: false
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '方案列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handlePlan_sampTask(params) {
      this.$layer.iframe({
        content: {
          content: planList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            confirmPlan: false,
            editPlan: false,
            selectTableShow: false
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '方案列表',
        maxmin: true,
        shadeClose: false
      })
    },
    getNodeClick(data, node, now) {
      this.level = node.level + 1
      this.clickParams = data
      this.getListData(data)
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      // this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    doBackToTop() {
      this.level = 1
      this.title = '合同任务列表'
      this.getTreeData()
      this.doReset('fromValiData')
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData(this.clickParams)
    }
  },
  mounted() {
    this.getTreeData()
    this.getListData()
  },
  created() {
    this.tableHeader = this.tableHeader_contract
  }
}
</script>

<style scoped lang="scss">
</style>
