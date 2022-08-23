<!-- 子任务列表 -->
<template>
  <div class="operate-container">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="4">
        <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
      </el-col>
      <el-col :span="20">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
          <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-show="taskType ==='sampling'">批量删除</el-button>
        </fromSearch>
        <tableItem
        :obj="this"
        :tableData="tableData"
        :tableHeader="tableHeader"
        :button="button"
        :loading="loading"
        :dataSum='fromValiData.dataSum'
        @handleSizeChange="handleSizeChange">
        </tableItem>
        <div style="display: flex;margin-top: -45px;">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import reportEdit from '../../sampling/majorTask/report_edit.vue'
import samplingEdit from '../../sampling/reportTask/sampling_edit.vue'
import reportPointList from '../../sampling/majorTask/point_list.vue'
import samplingPointList from '../../sampling/reportTask/point_list.vue'
import cycle from '../../sampling/majorTask/cycle.vue'
import {
  getReportTaskQueryPageList,
  getReportTaskAddOrModifyReport
} from '../../../api/sampling/majorTask.js'
import { getReportTaskStartReportTask } from '../../../api/sampling/reportTask.js'
import {
  getSamplingTaskQuerySamplingPageList,
  getSamplingTaskAddOrModifySamplingTask,
  getSamplingTaskDelSampTask
} from '../../../api/sampling/sampTask.js'
import { getSysQueryDict } from '../../../api/common.js'
export default {
  props: {
    params: Object
  },
  components: {},
  data() {
    return {
      loading: false,

      taskType: 'report',

      props: {
        label: 'name',
        children: 'children'
      },
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        name: null
      },
      fromData: [{ type: 'input', prop: 'name', label: '监测计划' }],
      paramsData: {
        father: 0
      },
      tableData: [],
      treeData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '任务名称',
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
          condition: (params) => {
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
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          },
          {
            name: '撤回',
            type: 'primary',
            click: 'handleWithdraw',
            condition: function(params) {
              if (params.status === '1') {
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
                params.status === '0' ||
                params.status === '1' ||
                params.status === '2'
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
              return params.status !== '4'
            }
          },
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: function(params) {
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          }
        ]
      },
      samplingParams: {},

      multipleSelection: [],
      projectTypeData: [] // 项目类型
    }
  },
  watch: {
    taskType(val, oldVal) {
      switch (val) {
        case 'report':
          this.button.buttonList.forEach((xdd, index) => {
            if (xdd.name === '删除') {
              this.button.buttonList.splice(index, 1)
            }
          })
          break
        case 'sampling':
          this.button.buttonList.push({
            name: '删除',
            type: 'danger',
            click: 'handleDelete'
          })
          break
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.type = '2'
      if (this.taskType === 'report') {
        this.fromValiData.mainId = this.params.id
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
        this.getTreeData()
      } else {
        this.fromValiData.reportNo = this.samplingParams.reportNo
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
            })
            this.tableData = res.result.pageList
            this.fromValiData.dataSum = res.result.dataSum
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      }
    },
    getTreeData() {
      this.treeData = []
      getReportTaskQueryPageList({
        pageSize: 99999,
        pageNow: 1,
        mainId: this.params.id
      }).then(res => {
        res.result.pageList.forEach(xdd => {
          if (xdd.status !== '4') {
            this.treeData.push(xdd)
          }
        })
      })
    },
    getNodeClick(data, node, now) {
      this.taskType = 'sampling'
      this.samplingParams = data
      this.getListData()
    },
    handleAdd() {
      if (this.taskType === 'report') {
        this.params.isCycleName = this.params.isCycle === '1' ? '是' : '否'
        this.$layer.iframe({
          content: {
            content: reportEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              addParams: this.params,
              projectTypeData: this.projectTypeData // 项目类型
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '添加',
          maxmin: true,
          shadeClose: false
        })
      } else {
        this.samplingParams.isCycleName =
          this.samplingParams.isCycle === '1' ? '是' : '否'
        this.$layer.iframe({
          content: {
            content: samplingEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              addParams: this.samplingParams
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '添加',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    handleEdit(params) {
      if (this.taskType === 'report') {
        this.$layer.iframe({
          content: {
            content: reportEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '编辑',
          maxmin: true,
          shadeClose: false
        })
      } else {
        this.$layer.iframe({
          content: {
            content: samplingEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '编辑',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    handlePoint(params) {
      if (this.taskType === 'report') {
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
      } else {
        this.$layer.iframe({
          content: {
            content: samplingPointList, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Max,
          title: '采样任务点位列表',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    handleStart(params) {
      let that = this
      if (this.taskType === 'report') {
        this.$share.confirm({
          message: '此操作将启动合同, 是否继续',
          type: 'success',
          confirm: function() {
            let ids = {}
            ids.reportNo = params.reportNo
            getReportTaskStartReportTask(ids).then(res => {
              that.getListData()
              that.$share.message('启动成功', 'success')
            })
          }
        })
      } else {
        this.$share.confirm({
          message: '此操作将启动合同, 是否继续',
          type: 'success',
          confirm: function() {
            let ids = JSON.parse(JSON.stringify(params))
            ids.status = '1'
            delete ids.statusName
            delete ids.isCycleName
            getSamplingTaskAddOrModifySamplingTask(ids).then(res => {
              that.getListData()
              that.$share.message('启动成功', 'success')
            })
          }
        })
      }
    },
    handleWithdraw(params) {
      let that = this
      if (this.taskType === 'report') {
        this.$share.confirm({
          message: '此操作将撤回合同, 是否继续',
          type: 'success',
          confirm: function() {
            let ids = JSON.parse(JSON.stringify(params))
            ids.status = '2'
            delete ids.statusName
            delete ids.isCycleName
            getReportTaskAddOrModifyReport(ids).then(res => {
              that.getListData()
              that.$share.message('撤回成功', 'success')
            })
          }
        })
      } else {
        this.$share.confirm({
          message: '此操作将撤回合同, 是否继续',
          type: 'success',
          confirm: function() {
            let ids = JSON.parse(JSON.stringify(params))
            ids.status = '2'
            delete ids.statusName
            delete ids.isCycleName
            getSamplingTaskAddOrModifySamplingTask(ids).then(res => {
              that.getListData()
              that.$share.message('撤回成功', 'success')
            })
          }
        })
      }
    },
    handleGiveUp(params) {
      let that = this
      if (this.taskType === 'report') {
        this.$share.confirm({
          message: '此操作将放弃合同, 是否继续',
          type: 'success',
          confirm: function() {
            let ids = JSON.parse(JSON.stringify(params))
            ids.status = '4'
            delete ids.statusName
            delete ids.isCycleName
            getReportTaskAddOrModifyReport(ids).then(res => {
              that.getListData()
              that.$share.message('放弃成功', 'success')
            })
          }
        })
      } else {
        this.$share.confirm({
          message: '此操作将放弃合同, 是否继续',
          type: 'success',
          confirm: function() {
            let ids = JSON.parse(JSON.stringify(params))
            ids.status = '4'
            delete ids.statusName
            delete ids.isCycleName
            getSamplingTaskAddOrModifySamplingTask(ids).then(res => {
              that.getListData()
              that.$share.message('放弃成功', 'success')
            })
          }
        })
      }
    },
    handleDetails2 (params) {
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
            }// props
          },
          area: this.$layer_Size.Normal,
          title: '周期检测内容',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getSamplingTaskDelSampTask({ ids: row.id }).then(res => {
            if (res.code === '0') {
              that.$message({
                type: 'success',
                message: '删除成功'
              })
            }
            that.getListData()
          })
        }
      })
    },
    handleBatchDel() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = { id: '' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.handleDelete(ids)
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
    doBackToTop() {
      this.taskType = 'report'
      this.doReset('fromValiData')
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getDicData() {
      let data = this.params.projectType.split(',')
      let ids = ''
      data.forEach(xdd => {
        if (xdd === 'XMLX_4' || xdd === 'XMLX_8') {
          ids += xdd + ','
        }
      })
      ids = ids.substring(0, ids.length - 1)
      getSysQueryDict({ type: 'XMLX', projectType: ids }).then(res => {
        this.projectTypeData = res.result
      })
    }
  },
  mounted() {
    this.getListData()
    this.getDicData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
