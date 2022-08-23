<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary"
        :size="$layer_Size.buttonSize"
        class="default-btn"
        icon="el-icon-search"
        @click="doSearch()">查询</el-button>
      <el-button type="primary"
        :size="$layer_Size.buttonSize"
        class="default-btn"
        icon="el-icon-refresh"
        @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary"
        :size="$layer_Size.buttonSize"
        class="default-btn"
        icon=""
        @click="doEditPlan"
        v-if="editPlan">指标方法修改</el-button>
      <el-button type="primary"
        :size="$layer_Size.buttonSize"
        class="default-btn"
        icon=""
        @click="doConfirmPlan"
        v-if="confirmPlan"
        v-show="params.funIsOk === '0'">方案确认</el-button>
    </fromSearch>
    <el-table
      :data="tableData"
      :span-method="getSpanMethod"
      border
      v-loading="loading"
      ref="detailTable"
      @selection-change="handleSelectionChange"
      :height="520"
      :header-cell-style="{background:'#F3F4F7',color:'#555'}"
      style="width: 100%">
      <el-table-column  align="center" label="序号" width="70">
        <template slot-scope="scope">
            {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="sampLb" align="center" label="样品类别" min-width="60"></el-table-column>
      <el-table-column prop="sampLx" align="center" label="样品类型" min-width="60"></el-table-column>
      <el-table-column prop="pointName" align="center" label="点位名称" min-width="60"></el-table-column>
      <el-table-column prop="pointNo" align="center" label="点位编号" min-width="60"></el-table-column>
      <el-table-column prop="pc" align="center" label="频次" min-width="40"> </el-table-column>
      <el-table-column prop="targetName" align="center" label="指标名称" min-width="90"></el-table-column>
      <el-table-column prop="checkDays" align="center" label="总检测天数" min-width="80"></el-table-column>
      <el-table-column prop="finishDays" align="center" label="已检测天数" min-width="80"></el-table-column>
      <el-table-column prop="targetDays" align="center" label="当前检测天数" min-width="90"></el-table-column>
      <el-table-column prop="funName" align="center" label="方法" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column type="selection" align="center" width="70" :selectable="getSelectable" v-if="selectTableShow"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import planEdit from './plan_edit.vue'
import {getReportTaskQueryCaseShow} from '../../../api/sampling/reportTask.js'
import {getTargetQueryFuns} from '../../../api/jcxxgl/targetDefend.js'
import {getReportTaskCheckCase} from '../../../api/contract/task.js'
export default {
  props: {
    layerid: '',
    params: Object,
    reportNo: String,
    confirmPlan: {
      type: Boolean,
      default: true
    },
    editPlan: {
      type: Boolean,
      default: true
    },
    selectTableShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: false,
      height: this.$layer_Size.tableSelfMaxHeight,
      fromValiData: {},
      fromData: [
        {type: 'input', prop: 'targetName', label: '指标名称'}
      ],
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    getListData () {
      this.fromValiData.reportNo = this.params.reportNo
      getReportTaskQueryCaseShow(this.fromValiData).then(res => {
        this.tableData = this.handleTableData(res.result)
        this.loading = false
        this.$nextTick(() => {
          this.tableData.forEach(xdd => {
            if (xdd.selected === '1') {
              this.$refs.detailTable.toggleRowSelection(xdd, true)
            }
          })
        })
      })
    },
    doEditPlan () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选指标', 'warning')
        return
      }
      let isSwitch = false
      this.multipleSelection.forEach((xdd, index) => {
        if (index < this.multipleSelection.length - 1) {
          if (xdd.targetName !== this.multipleSelection[index + 1].targetName) {
            isSwitch = true
          }
        }
      })
      if (isSwitch) {
        this.$share.message('勾选的指标必须相同', 'warning')
        return
      }
      let ids = {}
      ids.pageSize = 999
      ids.pageNow = 1
      ids.targetId = this.multipleSelection[0].targetId
      getTargetQueryFuns(ids).then(res => {
        this.$layer.iframe({
          content: {
            content: planEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              multipleSelection: this.multipleSelection,
              targetData: res.result.pageList
            }// props
          },
          area: this.$layer_Size.Max,
          title: '方法修改',
          maxmin: true,
          shadeClose: false
        })
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    doConfirmPlan (params) {
      this.$share.confirm({
        message: '此操作将进行方案确认, 是否继续?',
        confirm: () => {
          let ids = {}
          ids.reportNo = this.params.reportNo
          getReportTaskCheckCase(ids).then(res => {
            this.$share.message('确认成功')
            this.$layer.close(this.layerid)
            this.$parent.getListData()
          })
        }
      })
    },
    // 数据处理
    handleTableData (data) {
      let arr = []
      let sampIndex = 0 // 样品赋值位置
      let pointIndex = 0 // 点位赋值位置
      let sampNum = 1 // 样品相同数
      let pointNum = 1 // 点位相同数
      for (let i = 0; i < data.length; i++) {
        // 整合样品类别和类型
        if (i < data.length - 1) {
          if (data[i].sampLb === data[i + 1].sampLb) {
            sampNum++
          } else {
            data[sampIndex].sampNum = sampNum
            sampIndex = i + 1
            sampNum = 1
          }
        } else {
          // 只有一条数据的时候
          if (data.length === 1) {
            data[i].sampNum = pointNum
          } else {
            if (data[i].sampLb === data[i - 1].sampLb) {
              data[sampIndex].sampNum = sampNum
            } else {
              data[i].sampNum = sampNum
            }
          }
        }

        // 整合点位
        if (i < data.length - 1) {
          if (data[i].pointNo === data[i + 1].pointNo) {
            pointNum++
          } else {
            data[pointIndex].pointNum = pointNum
            pointIndex = i + 1
            pointNum = 1
          }
        } else {
          // 只有一条数据的时候
          if (data.length === 1) {
            data[i].pointNum = pointNum
          } else {
            if (data[i].pointNo === data[i - 1].pointNo) {
              data[pointIndex].pointNum = pointNum
            } else {
              data[i].pointNum = pointNum
            }
          }
        }
        arr.push(data[i])
      }
      return arr
    },
    getSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 2) {
        if (row.sampNum > 0) {
          return {
            rowspan: row.sampNum,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 3 || columnIndex === 4 || columnIndex === 5) {
        if (row.pointNum > 0) {
          return {
            rowspan: row.pointNum,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else {

      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getSelectable (row, index) {
      if (row.checkDays === 0) {
        return false
      } else {
        return true
      }
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
  .majorTaskAllTargetList{
    padding: 0 30px;width: calc(100% - 60px);
  }
</style>
