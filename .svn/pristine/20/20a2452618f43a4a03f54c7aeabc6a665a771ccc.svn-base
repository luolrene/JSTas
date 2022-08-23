<!-- 角色信息管理 -->
<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :isSelection="false"
    customHeight="450"
    @handleSizeChange="handleSizeChange"
    @getCellClick="getCellClick"></tableItem>
  </div>
</template>

<script>
import {getRoleQueryPageData} from '../../api/jcxxgl/role.js'
export default {
  props: {
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
        keyWord: null
      },
      fromData: [
        {type: 'input', prop: 'keyWord', label: '角色名称'}
      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'name',
        label: '角色名称'
      }, {
        prop: 'exp',
        label: '备注'
      }]
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getRoleQueryPageData(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    doSearch () {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getCellClick (params) {
      this.$parent.getRoleData(params)
      this.$layer.close(this.layerid)
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
