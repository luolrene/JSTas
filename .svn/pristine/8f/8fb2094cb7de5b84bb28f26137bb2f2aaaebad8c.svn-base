<template>
  <div class="majorTaskAllTargetList">
    <el-table
      :data="tableData"
      :span-method="getSpanMethod"
      border
      v-loading="loading"
      height="500"
      ref="detailTable"
      @selection-change="handleSelectionChange"
      :header-cell-style="{background:'#F3F4F7',color:'#555'}"
      style="width: 100%">
      <el-table-column  align="center" label="序号" width="70">
        <template slot-scope="scope">
            {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="sampLB" align="center" label="样品类别" min-width="90"></el-table-column>
      <el-table-column prop="sampLx" align="center" label="样品类型" min-width="90"></el-table-column>
      <el-table-column prop="pointName" align="center" label="点位名称" min-width="90">
        <template slot-scope="scope">
          <span style="color: #409EFF;cursor: pointer;" @click="getCellClick(scope.row,'point')">{{scope.row.pointName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pointNo" align="center" label="点位编号" min-width="140">
        <template slot-scope="scope">
          <el-input v-model="scope.row.pointNo" placeholder="" style="width: 80%"></el-input>
          <el-tooltip class="item" effect="dark" content="保存" placement="top">
            <span class="icon iconfont inputIconClass" @click="getConservePointNo(scope.row)">&#xec09;</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="pc" align="center" label="频次" min-width="70"> </el-table-column>
      <el-table-column prop="packName" align="center" label="包名" min-width="70">
        <template slot-scope="scope">
          <span style="color: #409EFF;cursor: pointer;" @click="getCellClick(scope.row,'pack')">{{scope.row.packName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="targetName" align="center" label="指标名称" min-width="120"></el-table-column>
      <el-table-column prop="checkDays" align="center" label="总检测天数" min-width="80"></el-table-column>
      <el-table-column prop="finishDays" align="center" label="已检测天数" min-width="80"></el-table-column>
      <el-table-column prop="targetDays" align="center" label="当前检测天数" min-width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.targetDays" @keydown.native="inputLimit" placeholder="" style="width: 94%"></el-input>
        </template>
      </el-table-column>
      <el-table-column type="selection" align="center" width="90" :selectable="getSelectable"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getContTaskQueryAllPointOfCont, getReportTaskAddCheckProgramme, getContTaskChangePointNo} from '../../../api/sampling/majorTask.js'
export default {
  props: {
    params: Object,
    layerid: '',
    pointType: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      fromValiData: {},
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    onSubmit () {
      let isPassMin = false
      let isPassMax = false
      if (this.multipleSelection.length === 0) {
        this.$share.message('请选择指标', 'warning')
        return
      }
      this.multipleSelection.forEach(xdd => {
        if (Number(xdd.targetDays) > xdd.checkDays) {
          isPassMax = true
        }
        if (xdd.targetDays === 0 || xdd.targetDays === '0') {
          isPassMin = true
        }
      })
      if (isPassMin) {
        this.$share.message('检测天数不能为0', 'warning')
        return
      }
      if (isPassMax) {
        this.$share.message('检测天数不能大于总天数', 'warning')
        return
      }
      getReportTaskAddCheckProgramme(this.multipleSelection).then(res => {
        this.$share.message()
        this.getListData()
      })
    },
    onBatchDays () {
      this.$prompt('请输入天数', '批量录入天数', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        inputPattern: /^[1-9]\d*$/,
        inputErrorMessage: '天数为数字'
      }).then(({ value }) => {
        this.multipleSelection.forEach(xdd => {
          xdd.targetDays = value
        })
        this.$share.message('批量录入成功')
      })
    },
    getListData () {
      this.fromValiData.reportNo = this.params.reportNo
      this.fromValiData.contId = this.params.contId
      this.loading = true
      getContTaskQueryAllPointOfCont(this.fromValiData).then(res => {
        this.tableData = this.handleTableData(res.result)
        this.loading = false
        this.$nextTick(() => {
          this.tableData.forEach(xdd => {
            if (xdd.selected === '1') {
              this.$refs.detailTable.toggleRowSelection(xdd, true)
            }
          })
        })
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    // 数据处理
    handleTableData (data) {
      let arr = []
      let sampIndex = 0 // 样品赋值位置
      let pointIndex = 0 // 点位赋值位置
      let packIndex = 0 // 包名赋值位置
      let sampNum = 1 // 样品相同数
      let pointNum = 1 // 点位相同数
      let packNum = 1 // 包名相同数
      for (let i = 0; i < data.length; i++) {
        // 整合样品类别和类型
        if (i < data.length - 1) {
          if (data[i].sampLB === data[i + 1].sampLB) {
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
            if (data[i].sampLB === data[i - 1].sampLB) {
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

        // 整合包名
        if (i < data.length - 1) {
          if (data[i].packName === data[i + 1].packName) {
            packNum++
          } else {
            data[packIndex].packNum = packNum
            packIndex = i + 1
            packNum = 1
          }
        } else {
          // 只有一条数据的时候
          if (data.length === 1) {
            data[i].packNum = packNum
          } else {
            if (data[i].packName === data[i - 1].packName) {
              data[packIndex].packNum = packNum
            } else {
              data[i].packNum = packNum
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
      } else if (columnIndex === 6) {
        if (row.packNum > 0) {
          return {
            rowspan: row.packNum,
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
    getConservePointNo(params) {
      let ids = {
        newPointNo: params.pointNo,
        contId: params.contId,
        checkPointId: params.pointId
      }
      getContTaskChangePointNo(ids).then(res => {
        this.$share.message()
        this.getListData()
      })
    },
    getCellClick (row, name) {
      console.log(row)
      if (name === 'point') {
        this.tableData.forEach(xdd => {
          if (xdd.pointId === row.pointId) {
            this.$refs.detailTable.toggleRowSelection(xdd)
          }
        })
      } else if (name === 'pack') {
        this.tableData.forEach(xdd => {
          if (xdd.packName === row.packName && xdd.pointNo === row.pointNo) {
            this.$refs.detailTable.toggleRowSelection(xdd)
          }
        })
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getSelectable (row, index) {
      if (row.targetDays === 0) {
        return false
      } else {
        return true
      }
    },
    // 检验是否为数字
    inputLimit (e) {
      let num = e.target.value || ''
      let code = e.which || e.keyCode
      let str = (e.key && e.key !== 'Unidentified') ? e.key : num.substr(num.length - 1)
      // 无论任何情况，皆可执行
      if (code === '8') {
        return true
      }
      if (e.code === 'Backspace' || e.key === '.') {
        e.returnValue = true
        return true
      }
      // 没有满足任何一种情况，中断执行
      if (!(/[\d.]/.test(str) || code === '190')) {
        e.returnValue = false
        return false
      }
      return true
    }
  },
  mounted () {
    this.getListData()
  },
  created () {
    this.fromValiData.pointType = this.pointType
  }
}
</script>

<style lang="scss">
  .majorTaskAllTargetList .el-table th{
    background-color: #eefaf6 !important;
  }
  .majorTaskAllTargetList .el-table td{ padding: 0 !important }

  .majorTaskAllTargetList .el-table--enable-row-transition .el-table__body td{
    height: 38px;
    color: #333333;
  }
  .majorTaskAllTargetList .el-input__inner{
    height: 28px;
  }
</style>
