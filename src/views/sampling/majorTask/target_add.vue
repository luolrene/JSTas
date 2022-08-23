<!-- 添加指标 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <el-form-item label="指标名称:" prop="name">
        <el-input v-model="fromValiData.name" placeholder=""/>
      </el-form-item>
      <el-form-item>
<!--        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button> -->
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
    customHeight="450"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import {getContTaskQueryList} from '../../../api/contract/task.js'
import {getReportTaskAddReportTarget} from '../../../api/sampling/majorTask.js'
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
        pageNow: 1
      },
      tableData: [

      ],
      tableHeader: [{
        prop: 'checkTypeName',
        label: '检测类别',
        width: 180
      }, {
        prop: 'targetName',
        label: '检测指标',
        width: 180
      }, {
        prop: 'funName',
        label: '检测方法',
        width: 400
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
      this.fromValiData.pointId = this.params.checkPointId
      getContTaskQueryList(this.fromValiData).then(res => {
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
        this.$share.message('请选择指标', 'warning')
        return
      }
      let ids = []
      this.multipleSelection.forEach(xdd => {
        ids.push({
          contTaskId: xdd.id,
          mainId: this.params.mainId,
          reportNo: this.params.reportNo,
          reportPointId: this.params.id,
          contId: this.params.contId
        })
      })
      getReportTaskAddReportTarget(ids).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
      })
    },
    // doSearch () {
    //   this.getListData()
    // },
    // doReset (formName) {
    //   this.$refs[formName].resetFields()
    //   this.getListData()
    // },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted () {
    console.log(this.params)
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
