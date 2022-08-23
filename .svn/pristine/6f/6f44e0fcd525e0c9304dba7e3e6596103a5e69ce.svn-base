<!-- 原始记录-检测项目-依据-方法 勾选 -->
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
      <el-button
        v-if="isSelection"
        type="primary"
        :size="$layer_Size.buttonSize"
        class="default-btn"
        icon="el-icon-check"
        @click="doConfirm('fromValiData')">确认</el-button>
    </fromSearch>
    <el-table
      :data="tableData"
      :span-method="getSpanMethod"
      border
      v-loading="loading"
      ref="detailTable"
      @cell-click="getCellClick"
      @selection-change="handleSelectionChange"
      :header-cell-style="{background:'#F3F4F7',color:'#555'}"
      :header-row-style="{background:'red'}"
      style="width: 100%">
      <el-table-column
        v-if="isSelection"
        type="selection"
        align="center"
        width="55">
      </el-table-column>
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
      <el-table-column prop="targetName" align="center" label="指标名称" min-width="100"></el-table-column>
      <el-table-column prop="checkDays" align="center" label="总检测天数" min-width="65"></el-table-column>
      <el-table-column prop="finishDays" align="center" label="已检测天数" min-width="65"></el-table-column>
      <el-table-column prop="targetDays" align="center" label="当前检测天数" min-width="75"></el-table-column>
      <el-table-column prop="funName" align="center" label="方法" min-width="160" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getReportTaskQueryCaseShow} from '@/api/sampling/reportTask.js'
export default {
  props: {
    layerid: '',
    reportNo: String,
    isSelection: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
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
      this.fromValiData.reportNo = this.reportNo
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
    getCellClick(params) {
      if (!this.isSelection) {
        this.$layer.close(this.layerid)
        this.$parent.getProjectListParams(params)
      }
    },
    doConfirm() {
      this.$layer.close(this.layerid)
      let params = {targetName:''}
      this.multipleSelection.forEach(xdd => {
        params.targetName += xdd.targetName + '，'
      })
      params.targetName = params.targetName.substring(0, params.targetName.length - 1)
      this.$parent.getProjectListParams(params)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
  >>> .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #B0E6FF;
    color: #000000;
    cursor: pointer;
  }
</style>
