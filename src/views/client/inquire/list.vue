<!-- 客户信息管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" >
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :isSelection="false" :dataSum="fromValiData.dataSum" :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import { getCustGetFuzzyQuerySum } from '@/api/client/info.js'
export default {
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [{ type: 'input', prop: 'name', label: '客户名称' }],
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '客户名称',
          type: 'view',
          width: 140
        },
        {
          prop: 'fuzzyQuery',
          label: '是否有合作',
          width: 90
        },
        {
          prop: 'createTime',
          label: '最近合作时间',
          width: 120
        },
         {
          prop: 'followUpPerson',
          label: '跟进人',
          width: 120
        }
      ]
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCustGetFuzzyQuerySum(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(item => {
            if (item.fuzzyQuerySum > 0) {
              item.fuzzyQuery = '是'
            } else {
              item.fuzzyQuery = '否'
            }
          })
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted() {},
  created() {}
}
</script>

<style scoped lang="scss">
</style>
