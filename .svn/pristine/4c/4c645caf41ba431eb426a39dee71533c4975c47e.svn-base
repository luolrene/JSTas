<!-- 点位详细版 -->
<template>
  <div class="majorTaskAllTargetList" style='padding: 0 30px;'>
    <el-table
      :data="tableData"
      :span-method="getSpanMethod"
      border
      v-loading="loading"
      :max-height="tableHeight"
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
      <el-table-column prop="pointName" align="center" label="点位名称" min-width="90"></el-table-column>
      <el-table-column prop="pointNo" align="center" label="点位编号" min-width="90"></el-table-column>
      <el-table-column prop="pointTypeName" align="center" label="点位类型" min-width="90"></el-table-column>
      <el-table-column prop="pc" align="center" label="频次" min-width="70"> </el-table-column>
      <el-table-column prop="targetName" align="center" label="指标名称" min-width="120"></el-table-column>
      <el-table-column prop="checkDays" align="center" label="总检测天数" min-width="90"></el-table-column>
      <el-table-column prop="finishDays" align="center" label="已检测天数" min-width="90"></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" plain @click="handleCopy(scope.row)" style="margin: 5px 0;" :disabled="disabled">复制点位</el-button>
          <el-button type="primary" size="mini" plain @click="handleEdit(scope.row)" style="margin: 5px 0;" :disabled="disabled">编辑</el-button>
          <el-button type="primary" size="mini" plain @click="handleTarget(scope.row)" style="margin-left: 0 !important;margin-bottom: 5px;">录入指标</el-button>
          <el-button type="danger" size="mini" plain @click="handleDelete(scope.row)" style="margin: 5px 0;" :disabled="disabled">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import pointAdd from './point_add.vue'
import targetList from './target_list.vue'
import pointCopy from './point_copy.vue'
import {getContTaskQueryAllPointOfCont} from '../../../api/sampling/majorTask.js'
import {getContTaskDelCheckPoint} from '../../../api/contract/task.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      loading: false,
      disabled: false,
      fromValiData: {},
      tableData: [],
      multipleSelection: [],

      tableHeight: document.documentElement.clientHeight - 260
    }
  },
  methods: {
    getListData () {
      this.fromValiData.contId = this.params.id
      this.loading = true
      getContTaskQueryAllPointOfCont(this.fromValiData).then(res => {
        res.result.forEach(xdd => {
          switch (xdd.pointType) {
            case '1':
              xdd.pointTypeName = '采样'
              break
            case '2':
              xdd.pointTypeName = '送样'
              break
            case '3':
              xdd.pointTypeName = '采样，送样'
              break
          }
        })

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
    handleTarget (params) {
      this.$layer.iframe({
        content: {
          content: targetList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            addParams: this.params
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '指标列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleCopy (params) {
      this.$layer.iframe({
        content: {
          content: pointCopy, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Min,
        title: '点位复制',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit (params) {
      this.$layer.iframe({
        content: {
          content: pointAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            detailParams: params
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete (row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getContTaskDelCheckPoint({ids: row.pointId}).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
    },
    // 数据处理
    handleTableData (data) {
      let arr = []
      let sampIndex = 0 // 样品类别赋值位置
      let sampLXIndex = 0 // 样品类型赋值位置
      let pointIndex = 0 // 点位赋值位置
      let sampNum = 1 // 样品类别相同数
      let sampLXNum = 1 // 样品类型赋值位置
      let pointNum = 1 // 点位相同数
      for (let i = 0; i < data.length; i++) {
        // 整合样品类别
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
        // 整合样品类型
        if (i < data.length - 1) {
          if (data[i].sampLx === data[i + 1].sampLx) {
            sampLXNum++
          } else {
            data[sampLXIndex].sampLXNum = sampLXNum
            sampLXIndex = i + 1
            sampLXNum = 1
          }
        } else {
          // 只有一条数据的时候
          if (data.length === 1) {
            data[i].sampLXNum = pointNum
          } else {
            if (data[i].sampLx === data[i - 1].sampLx) {
              data[sampLXIndex].sampLXNum = sampLXNum
            } else {
              data[i].sampLXNum = sampLXNum
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
      if (columnIndex === 1) {
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
      } else if (columnIndex === 2) {
        if (row.sampLXNum > 0) {
          return {
            rowspan: row.sampLXNum,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 3 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6 || columnIndex === 10) {
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
    }
  },
  mounted () {
    this.getListData()
  },
  created () {
    if (this.params.status === '06') {
      this.disabled = true
    }
  }
}
</script>

<style lang="scss">
  .majorTaskAllTargetList .el-table td, .el-table th{ padding: 0 !important }

  .majorTaskAllTargetList .el-table--enable-row-transition .el-table__body td{
    height: 38px;
    color: #333333;
  }
  .majorTaskAllTargetList .el-input__inner{
    height: 28px;
  }
</style>
