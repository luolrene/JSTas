<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
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
import {getSubContQuerySubCont} from '../../../../api/verity/contractVerity.js'
export default {
  props: {
    params: Object
  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        {type: 'input', prop: 'proName', label: '项目名称'},
        {type: 'input', prop: 'custName', label: '客户名称'}
      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'proName',
        label: '项目名称',
        width: 180
      }, {
        prop: 'custName',
        label: '客户',
        width: 90
      }, {
        prop: 'detail',
        label: '分包明细',
        width: 90
      }, {
        prop: 'statusName',
        label: '状态',
        width: 90
      }],
      button: {
        width: 120,
        buttonList: [

        ]
      }
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.contId = this.params.id
      getSubContQuerySubCont(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '0':
              xdd.statusName = '初始'
              break
            case '1':
              xdd.statusName = '进行中'
              break
            case '2':
              xdd.statusName = '交付'
              break
            case '3':
              xdd.statusName = '完成'
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
