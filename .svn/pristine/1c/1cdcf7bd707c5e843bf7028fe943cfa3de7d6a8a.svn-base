<!--报价记录 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()" >添加</el-button>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :button="button"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :isSelection="false"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import quotationRecordAdd from './quotationRecord_add'
import { getCrmOfferQueryPageData } from '@/api/client/quotationRecord.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      loading: false,
      offerUser: '',
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        {
          type: 'input',
          prop: 'offerUserName',
          label: '报价人'
        },
        {
          type: 'select',
          prop: 'offerState',
          label: '状态',
          data: [
            { id: '1', name: '未记录' },
            { id: '2', name: '已记录' },
            { id: '3', name: '放弃' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'offerDescribe',
          label: '描述'
        },
        {
          prop: 'offerAmountOfmoney',
          label: '金额'
        },
        {
          prop: 'offerStateName',
          label: '状态'
        },
        {
          prop: 'offerTime',
          label: '报价时间'
        },
        {
          prop: 'offerUserName',
          label: '报价人'
        }
      ],
      button: {
        buttonList: []
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmOfferQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.offerState) {
              case '1':
                xdd.offerStateName = '未记录'
                break
              case '2':
                xdd.offerStateName = '已记录'
                break
              case '3':
                xdd.offerStateName = '放弃'
                break
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
      this.getListData()
    },
    doReset(formName) {
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: quotationRecordAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
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
    // this.offerUser = this.params.createUser
    this.fromValiData.custName = this.params.name
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
