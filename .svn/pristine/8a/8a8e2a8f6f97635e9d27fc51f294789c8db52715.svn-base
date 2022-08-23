<!-- 采样任务列表 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <el-form-item label="采样任务名称:" prop="name">
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
    :loading="loading"
    :isSelection="false"
    customHeight="450"
    @getCellClick="getCellClick"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import {getSamplingTaskQuerySamplingPageList} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    addParams: Object,
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
        label: '采样任务名称',
        width: 160
      }, {
        prop: 'reportNo',
        label: '报告编号',
        width: 110
      }, {
        prop: 'isCycleName',
        label: '是否周期',
        width: 90
      }, {
        prop: 'opermanName',
        label: '当前处理人',
        width: 140
      }, {
        prop: 'statusName',
        label: '采样任务状态',
        width: 120
      }],
      selectData: null
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.contId = this.addParams.contId
      getSamplingTaskQuerySamplingPageList(this.fromValiData).then(res => {
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
    getCellClick (params) {
      this.selectData = params
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
    doConfirm () {
      if (this.selectData === null) {
        this.$share.message('请点击表格选择采样任务', 'warning')
        return
      }
      this.$parent.getSelectData(this.selectData).then((result) => {
        if (result) {
          this.$layer.close(this.layerid)
          this.$message({
            message: result,
            type: 'success',
            center: true,
            showClose: true,
            duration: 15000
          })
        }
      })
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
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

</style>
