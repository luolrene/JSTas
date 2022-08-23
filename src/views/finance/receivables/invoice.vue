<template>
  <div class="operate-container">
    <!-- <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" icon="el-icon-plus" @click="doAdd()">添加</el-button>
    </fromSearch> -->
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
    </tableItem>
  </div>
</template>

<script>
import { getCrmBillIngQueryPageData } from '@/api/client/billingInfo.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        {
          type: 'select',
          prop: 'accountsType',
          label: '收款类型',
          data: [{ name: '预付款', id: '1' }, { name: '项目款', id: '2' }]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'custName',
          label: '客户名称',
          width: 120
        },
        {
          prop: 'contName',
          label: '项目名称',
          width: 90
        },
        {
          prop: 'billTime',
          label: '开票时间',
          width: 90
        },
        {
          prop: 'billMoney',
          label: '开票金额',
          width: 90
        },
        {
          prop: 'stateName',
          label: '状态',
          width: 90
        }
      ]
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmBillIngQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.state) {
              case '1':
                xdd.stateName = '进行中'
                break
              case '2':
                xdd.stateName = '已开票'
                break
              case '3':
                xdd.stateName = '退回' + '(' + xdd.reviewComments + ')'
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
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.fromValiData.pageNow = 1
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
  mounted() {
    if (this.params) {
      this.fromValiData.custId = this.params.custId
      this.fromValiData.contId = this.params.id
    }
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
