<!-- 样品列表 -->
<template>
  <div class="operate-container">
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :pageSize="50"
    :isSelection="false"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import {getSubSampQuerySampPage} from '@/api/contract/task.js'
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
        pageSize: 50,
        pageNow: 1
      },
      fromData: [],
      tableData: [

      ],
      tableHeader: [{
        prop: 'custSampNo',
        label: '客户样品编号',
        width: 120
      }, {
        prop: 'show',
        label: '样品表现',
        width: 90
      }, {
        prop: 'sampNo',
        label: '样品编号',
        width: 120
      }, {
        prop: 'targetName',
        label: '检测指标',
        width: 220
      }, {
        prop: 'cyTime',
        label: '采样时间',
        width: 90
      }]
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.subSampTaskId = this.params.id
      getSubSampQuerySampPage(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
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

  }
}
</script>

<style scoped lang="scss">

</style>
