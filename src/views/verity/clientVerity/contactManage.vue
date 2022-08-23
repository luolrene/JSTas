<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" :isSelection="false" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import { getCustContactsQueryPageData } from '@/api/client/info.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      loading: true,
      props: {},
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        custId: null
      },
      fromData: [
        { type: 'input', prop: 'name', label: '联系人' },
        { type: 'input', prop: 'mobile', label: '联系人电话' }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '联系人姓名'
        },
        {
          prop: 'mobile',
          label: '联系人电话'
        },
        {
          prop: 'sex',
          label: '性别'
        },
        {
          prop: 'email',
          label: '邮箱'
        },
        {
          prop: 'addressDetailed',
          label: '详细地址'
        }
      ],
      button: {
        width: 260,
        buttonList: []
      }
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getCustContactsQueryPageData(this.fromValiData)
        .then(res => {
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.pageList.length
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
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
    this.fromValiData.custId = this.params.remarks
    this.getListData()
  },
  created() {
    this.fromValiData.custId = this.params.id
  }
}
</script>

<style scopsd>
</style>
