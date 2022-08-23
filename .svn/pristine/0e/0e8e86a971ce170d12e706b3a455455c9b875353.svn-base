<template>
  <div class="operate-container">
    <el-row style="height: 100%;" :gutter="20">
      <el-col :span="6" style="height: 100%;">
        <fromItem
          ref="myFromItem"
          :obj="this"
          :layerid="layerid"
          :fromItemList="fromItemList"
          :fromValiData="fromValiData"
          :rules="rules"
          :btnLoading="btnLoading"
          :labelWidth="100">
          <el-form-item label="仪器明细选择:">
             <el-cascader style="width: 100%;"
              ref="cascaderId"
              v-model="options"
              :options="targetOptions"
              :props="props"
              :clearable="true"
              filterable>
            <template slot-scope="{ node, data }">
              <span>{{ data.name}}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              <span v-if="data.status">( {{data.statusName}} )</span>
            </template></el-cascader>
          </el-form-item>
        </fromItem>
      </el-col>
      <el-col :span="18" style="height: 100%;">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiDatab_B" :fromData="fromData"></fromSearch>
        <el-table
          :data="tableData"
          :span-method="getSpanMethod"
          border
          v-loading="loading"
          ref="detailTable"
          :height="height"
          style="width: 100%">
          <el-table-column  align="center" label="序号" min-width="70">
            <template slot-scope="scope">
                {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column prop="sampLb" align="center" label="样品类别" min-width="60"></el-table-column>
          <el-table-column prop="sampLx" align="center" label="样品类型" min-width="60"></el-table-column>
          <el-table-column prop="pointName" align="center" label="点位名称" min-width="60"></el-table-column>
          <el-table-column prop="pointNo" align="center" label="点位编号" min-width="60"></el-table-column>
          <el-table-column prop="pc" align="center" label="频次" min-width="40"> </el-table-column>
          <el-table-column prop="targetName" align="center" label="指标名称" min-width="110"></el-table-column>
          <el-table-column prop="checkDays" align="center" label="总检测天数" min-width="70"></el-table-column>
          <el-table-column prop="finishDays" align="center" label="已检测天数" min-width="70"></el-table-column>
          <el-table-column prop="targetDays" align="center" label="当前检测天数" min-width="90"></el-table-column>
          <el-table-column prop="funName" align="center" label="方法" min-width="140" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import choGroup from '../../common/group_list.vue'
import {getLeaseTaskAddOrModify, getLeaseMachineItemAddOrModify} from '../../../api/sampling/sampTask.js'
import {getReportTaskQueryCaseShow} from '../../../api/sampling/reportTask.js'
import {getUserQueryPageData} from '../../../api/jcxxgl/user.js'
import {getMachineQueryMachineTreeNew} from '../../../api/storage/equipment.js'
export default {
  props: {
    layerid: '',
    reportNos: String
  },
  data () {
    return {
      btnLoading: false,
      loading: false,
      height: this.$layer_Size.tableSelfMaxHeight,
      fromValiData: {
        groupName: '',
        reportNo: '',
        oper: ''
      },
      rules: {
        taskName: [{ required: true, message: '请填写任务名称', trigger: 'change' }],
        groupName: [{ required: true, message: '请选择分组', trigger: 'change' }],
        oper: [{ required: true, message: '请选择租借人', trigger: 'change' }]
      },
      fromItemList: [
        {label: '任务名称', prop: 'taskName', value: '', type: 'input', isRqd: true},
        {label: '报告编号', prop: 'reportNo', value: '', type: 'input', isRqd: true, disabled: true},
        {label: '分组', prop: 'groupName', value: '', type: 'inputChoice', isRqd: true, click: 'getGroupId'},
        {label: '租借人', prop: 'oper', value: '', type: 'select', isRqd: true, data: []},
        {label: '开始时间', prop: 'startTime', value: '', type: 'date', isRqd: true, labelWidth: '110'},
        {label: '结束时间', prop: 'endTime', value: '', type: 'date', isRqd: true, labelWidth: '110'}
      ],
      props: {
        value: 'id',
        label: 'name',
        children: 'children',
        multiple: true
      },
      targetOptions: [],
      options: [],
      tableData: [],

      fromValiDatab_B: {
        reportNo: ''
      },
      fromData: [
        {type: 'select',
          prop: 'reportNo',
          label: '报告编号',
          isNoClear: true,
          data: []}
      ]
    }
  },
  methods: {
    onSubmit () {
      let ids = JSON.parse(JSON.stringify(this.fromValiData))
      this.btnLoading = true
      getLeaseTaskAddOrModify(ids).then(res => {
        let params = {
          leaseTaskId: res.result,
          arrayValue: []
        }
        let data = this.$refs.cascaderId.getCheckedNodes({leafOnly: true})
        data.forEach(xdd => {
          params.arrayValue.push({
            machineType: xdd.path[0],
            machineName: xdd.path[1],
            machineId: xdd.path[2],
            machineNo: xdd.data.yqbh,
            machineXh: xdd.data.yqxh,
            leaseTaskId: res.result,
            reportNo: ids.reportNo
          })
        })
        getLeaseMachineItemAddOrModify(params).then(res2 => {
          this.$parent.getListData()
          this.$layer.close(this.layerid)
          this.$share.message()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      }).catch(() => {
        this.btnLoading = false
      })
    },
    doSearch () {
      let ids = {}
      ids.reportNo = this.fromValiDatab_B.reportNo
      getReportTaskQueryCaseShow(ids).then(res => {
        this.tableData = this.handleTableData(res.result)
        this.loading = false
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
    getGroupId () {
      this.$layer.iframe({
        content: {
          content: choGroup, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {

          }// props
        },
        area: this.$layer_Size.Max,
        title: '选择分组',
        maxmin: true,
        shadeClose: false
      })
    },
    getGroupData (params) {
      if (this.fromValiData.groupName !== params.name) {
        this.fromValiData.groupId = params.id
        this.fromValiData.groupName = params.name
        this.fromValiData.oper = ''
        let ids = {}
        ids.groupId = params.id
        ids.pageSize = 99999
        ids.pageNow = 1
        getUserQueryPageData(ids).then(res => {
          this.fromItemList.forEach(xdd => {
            if (xdd.prop === 'oper') {
              xdd.data = []
              res.result.pageList.forEach(arc => {
                xdd.data.push({
                  id: arc.name,
                  name: arc.name
                })
              })
            }
          })
        }).catch(err => {
          this.$message.error(err.message)
        })
      }
    },
    getLeaseData () {
      getMachineQueryMachineTreeNew({type: '2'}).then(res => {
        this.getRecursion(res.result)
        this.targetOptions = res.result
      })
    },
    getRecursion (data, editData) {
      data.forEach(xdd => {
        if (xdd.hasOwnProperty('children') && xdd.children.length > 0) {
          this.getRecursion(xdd.children, editData)
        } else {
          if (xdd.status !== undefined && xdd.status !== '') {
            // xdd.disabled = true
            switch (xdd.status) {
              case '0':
                xdd.statusName = '闲置'
                // xdd.disabled = false
                break
              case '1':
                xdd.statusName = '出借'
                break
              case '2':
                xdd.statusName = '预约'
                break
              case '3':
                xdd.statusName = '维修'
                break
              case '4':
                xdd.statusName = '损坏'
                break
            }

            if (editData !== undefined && editData.length > 0) {
              editData.forEach(arc => {
                if (arc.machineId === xdd.id) {
                  xdd.statusName = '闲置'
                  // xdd.disabled = false
                }
              })
            }
          }
        }
      })
    }
  },
  mounted () {
    this.fromValiData.reportNo = this.reportNos
    let data = this.reportNos.split(',')
    data.forEach(xdd => {
      this.fromData[0].data.push({
        id: xdd,
        name: xdd
      })
    })
    this.fromValiDatab_B.reportNo = this.fromData[0].data[0].id
    this.doSearch()
  },
  created () {
    this.getLeaseData()
  }
}
</script>

<style scoped lang="scss">

</style>
