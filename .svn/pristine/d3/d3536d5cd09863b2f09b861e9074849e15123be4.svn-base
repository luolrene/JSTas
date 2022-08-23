<!-- 添加点位 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <el-form-item label="点位名称:" prop="name">
        <el-input v-model="fromValiData.name" placeholder=""/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-check" @click="doConfirm()">确认</el-button>
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
    customHeight="450"></tableItem>
  </div>
</template>

<script>
import {getContTaskQueryCheckPoint} from '../../../api/contract/task.js'
import {getReportTaskAddReportPoint} from '../../../api/sampling/majorTask.js'
export default {
  props: {
    params: Object,
    fatherTableData: Array,
    layerid: '',
    pointType: {
      type: String,
      default: null
    }
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
        label: '点位名称',
        width: 90
      }, {
        prop: 'sampLbName',
        label: '样品类别',
        width: 90
      }, {
        prop: 'sampLxName',
        label: '样品类型',
        width: 90
      }, {
        prop: 'targets',
        label: '指标明细',
        width: 200
      }, {
        prop: 'pc',
        label: '频次',
        width: 90
      }, {
        prop: 'days',
        label: '总检测天数',
        width: 90
      }, {
        prop: 'finishDays',
        label: '已检测天数',
        width: 90
      }, {
        prop: 'checkDay',
        label: '检测天数',
        type: 'input',
        number: true,
        placeholder: '请输入检测天数',
        width: 140
      }],
      button: {
        buttonList: []
      },
      multipleSelection: [],
      steps: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.contId = this.params.contId
      getContTaskQueryCheckPoint(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          xdd.checkDay = 1
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    doConfirm () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请选择点位', 'warning')
        return
      }
      this.getTestData(this.multipleSelection).then(arg => {
        if (arg) {
          let ids = []
          this.multipleSelection.some(xdd => {
            ids.push({
              checkPointId: xdd.id,
              reportNo: this.params.reportNo,
              contId: this.params.contId,
              mainId: this.params.mainId,
              days: xdd.checkDay
            })
          })
          getReportTaskAddReportPoint(ids).then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
          })
        }
      })
    },
    getTestData (data) {
      return new Promise(resolve => {
        let test = true
        data.some((xdd, index) => {
          if ((Number(xdd.checkDay)) === 0) {
            this.$message({
              message: '选中数据的第' + (index + 1) + '行，检测天数必须大于1天',
              type: 'warning'
            })
            test = false
            return true
          }
          if ((Number(xdd.checkDay) + xdd.finishDays) > xdd.days) {
            this.$message({
              message: '选中数据的第' + (index + 1) + '行，检测天数填写过多',
              type: 'warning'
            })
            test = false
            return true
          }
        })
        resolve(test)
      })
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
    getSelectable (row, index) {
      let tf = true
      if (this.fatherTableData.length > 0) {
        this.fatherTableData.forEach(xdd => {
          if (row.name === xdd.pointName) {
            tf = false
          }
        })
      }
      if (row.finishDays >= row.days) {
        tf = false
      }
      return tf
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

<style scoped lang="scss">

</style>
