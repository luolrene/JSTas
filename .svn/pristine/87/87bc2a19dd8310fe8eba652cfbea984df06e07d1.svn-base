<!-- 报告任务列表 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <el-form-item label="监测计划:" prop="name">
        <el-input v-model="fromValiData.name" placeholder=""/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()" :disabled="params.contStatus==='07'">添加</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-s-custom" @click="doInputPerson()" :disabled="params.contStatus==='07'">人员分配</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-bangzhu" @click="handleLeaseTask()" :disabled="params.contStatus==='07'">仪器指派</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="" @click="handleLeaseTask_edit()" :disabled="params.contStatus==='07'">添加租赁任务</el-button>
      </el-form-item>
    </el-form>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    isSelectable
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import reportEdit from './report_edit.vue'
import pointList from './point_list.vue'
import inputPerson from '../../common/input_person.vue'
import leaseTaskEdit from './leaseTask_edit.vue'
import leaseTask from '../leaseTask/list.vue'
import planList from '../sampTask/plan_list.vue'
import {getReportTaskToOper, getReportTaskStartReportTask} from '../../../api/sampling/reportTask.js'
import {getReportTaskQueryPageList, getReportTaskAddOrModifyReport} from '../../../api/sampling/majorTask.js'
import {getSysQueryDict} from '../../../api/common.js'
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
        name: ''
      },
      tableData: [

      ],
      tableHeader: [{
        prop: 'name',
        label: '监测计划',
        width: 120
      }, {
        prop: 'reportNo',
        label: '报告编号',
        width: 90
      }, {
        prop: 'proName',
        label: '项目名称',
        width: 90
      }, {
        prop: 'leaseTask',
        label: '仪器指派任务',
        width: 90
      }, {
        prop: 'custName',
        label: '客户名称',
        width: 90
      }, {
        prop: 'isCycleName',
        label: '是否周期',
        width: 90
      }, {
        prop: 'opermanName',
        label: '当前处理人',
        width: 120
      }, {
        prop: 'statusName',
        label: '报告任务状态',
        width: 130
      }],
      multipleSelection: [],
      button: {
        width: 300,
        buttonList: [
          {name: '启动',
            type: 'primary',
            click: 'handleStart',
            condition: function (params) {
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          },
          {name: '撤回',
            type: 'primary',
            click: 'handleWithdraw',
            condition: function (params) {
              if (params.status === '1') {
                return true
              }
            }
          },
          {name: '放弃',
            type: 'primary',
            click: 'handleGiveUp',
            condition: function (params) {
              if (params.status === '0' || params.status === '1' || params.status === '2') {
                return true
              }
            }
          },
          {name: '方案选择',
            type: 'primary',
            click: 'handlePoint',
            condition: function (params) {
              return params.status !== '4'
            }
          },
          {name: '方案修改',
            type: 'primary',
            click: 'handlePlan',
            condition: function (params) {
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          },
          {name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: function (params) {
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          }
        ]
      },
      projectTypeData: [] // 项目类型
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.mainId = this.params.id
      getReportTaskQueryPageList(this.fromValiData).then(res => {
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
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handlePlan (params) {
      this.$layer.iframe({
        content: {
          content: planList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            reportNo: params.reportNo,
            confirmPlan: false
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '方案列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAdd () {
      this.$layer.iframe({
        content: {
          content: reportEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            addParams: this.params,
            projectTypeData: this.projectTypeData // 项目类型
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '添加报告任务',
        maxmin: true,
        shadeClose: false
      })
    },
    handleLeaseTask () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选未指派仪器任务的报告任务', 'warning')
        return
      }
      let isPass = true
      this.multipleSelection.forEach(xdd => {
        if (xdd.leaseTask !== null) {
          isPass = false
        }
      })
      if (!isPass) {
        this.$share.message('请勾选未分配仪器指派任务的报告任务', 'warning')
        return
      }
      this.$layer.iframe({
        content: {
          content: leaseTask, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            reportData: this.multipleSelection
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '仪器指派列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleLeaseTask_edit () {
      let reportNos = ''
      let isPass = true
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选未指派仪器任务的报告任务', 'warning')
        return
      }
      this.multipleSelection.forEach(xdd => {
        reportNos += xdd.reportNo + ','

        if (xdd.leaseTask !== null) {
          isPass = false
        }
      })
      if (!isPass) {
        this.$share.message('请勾选未分配仪器指派任务的报告任务', 'warning')
        return
      }
      this.$layer.iframe({
        content: {
          content: leaseTaskEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            reportNos: reportNos.substring(0, reportNos.length - 1)
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '添加租赁任务',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit (params) {
      this.$layer.iframe({
        content: {
          content: reportEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handlePoint (params) {
      this.$layer.iframe({
        content: {
          content: pointList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            pointType: '1'
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '点位录入列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleStart (params) {
      let that = this
      this.$share.confirm({
        message: '此操作将启动报告任务, 是否继续',
        type: 'success',
        confirm: function () {
          let ids = {}
          ids.reportNo = params.reportNo
          getReportTaskStartReportTask(ids).then(res => {
            if (res.code === 0) {
              that.getListData()
              that.$share.message('启动成功', 'success')
            } else {
              that.$share.message('请先对报告任务指派仪器', 'warning')
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    handleWithdraw (params) {
      let that = this
      this.$share.confirm({
        message: '此操作将撤回报告任务, 是否继续?',
        type: 'success',
        confirm: function () {
          let ids = JSON.parse(JSON.stringify(params))
          ids.status = '2'
          getReportTaskAddOrModifyReport(ids).then(res => {
            that.getListData()
            that.$share.message('撤回成功', 'success')
          })
        }
      })
    },
    handleGiveUp (params) {
      let that = this
      this.$share.confirm({
        message: '此操作将放弃报告任务, 是否继续?',
        type: 'success',
        confirm: function () {
          let ids = JSON.parse(JSON.stringify(params))
          ids.status = '4'
          getReportTaskAddOrModifyReport(ids).then(res => {
            that.getListData()
            that.$share.message('放弃成功', 'success')
          })
        }
      })
    },
    doInputPerson () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选报告任务', 'warning')
        return
      }
      this.$layer.iframe({
        content: {
          content: inputPerson, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            isFenp: '1' // 只能看到自己组及以下的人
          }// props
        },
        area: this.$layer_Size.Max,
        title: '人员列表',
        maxmin: true,
        shadeClose: false
      })
    },
    getPerson (params) {
      return new Promise((resolve, reject) => {
        let ids = {reportNo: ''}
        this.multipleSelection.forEach(xdd => {
          ids.reportNo += xdd.reportNo + ','
        })
        ids.operman = params.mobile
        ids.opermanName = params.name
        ids.reportNo = ids.reportNo.substring(0, ids.reportNo.length - 1)
        getReportTaskToOper(ids).then(res => {
          this.getListData()
          resolve(true)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getSelectable (row, index) {
      if (row.status !== '4') {
        return true
      } else {
        return false
      }
    },
    doSearch () {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
      this.$refs[formName].resetFields()
      this.getListData()
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getDicData () {
      let data = this.params.projectType.split(',')
      let ids = ''
      data.forEach(xdd => {
        if (xdd !== 'XMLX_4' && xdd !== 'XMLX_8') {
          ids += xdd + ','
        }
      })
      ids = ids.substring(0, ids.length - 1)
      getSysQueryDict({'type': 'XMLX', 'projectType': ids}).then(res => {
        this.projectTypeData = res.result
      })
    }
  },
  mounted () {
    this.getListData()
    this.getDicData()
  },
  created () {
    if (this.params.contStatus === '07') {
      this.button.buttonList.forEach(xdd => {
        if (xdd.name === '启动' || xdd.name === '撤回' || xdd.name === '放弃' || xdd.name === '编辑') {
          xdd.disabled = true
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
