<!-- 点位列表 -->
<template>
  <div class="operate-container">
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    customHeight="450"
    :isSelection="false"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import {getSubContDetailQuerySubCont} from '../../../api/verity/contractVerity.js'
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
        prop: 'checkCompany',
        label: '承接单位',
        width: 90
      }, {
        prop: 'price',
        label: '分包金额',
        width: 90
      }, {
        prop: 'targetDetail',
        label: '分包内容',
        width: 90
      }, {
        prop: 'startTime',
        label: '开始日期',
        width: 90
      }, {
        prop: 'endTime',
        label: '结束日期',
        width: 90
      }],
      multipleSelection: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getSubContDetailQuerySubCont(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
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
    this.fromValiData.contId = this.params.contId
    this.fromValiData.father = this.params.id
  }
}
</script>

<style scoped lang="scss">

</style>
