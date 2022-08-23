
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" :isSelection='false' @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from './details'
import verity from './verity.vue'
import { getCrmOfferControlQueryPageData } from '@/api/client/verity.js'
export default {
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        handle: null
      },
      fromData: [
        // {
        //   type: 'select',
        //   prop: 'offerState',
        //   label: '处理结果',
        //   data: [
        //     { name: '待审批', id: '1' },
        //     { name: '通过', id: '2' },
        //     { name: '退回', id: '3' }
        //   ]
        // }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'offerUserName',
          label: '申请人',
          width: 90
        },
        {
          prop: 'custName',
          label: '客户名称',
          width: 90,
          type: 'view'
        },
        {
          prop: 'createTime',
          label: '申请时间',
          width: 90
        },
        {
          prop: 'offerAmountOfmoney',
          label: '报价金额',
          width: 90
        },
        {
          prop: 'offer',
          label: '处理结果',
          width: 90
        }
      ],
      button: {
        buttonList: [
          {
            name: '审核',
            type: 'primary',
            click: 'handleVerity'
          }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmOfferControlQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.offerState) {
              case '1':
                xdd.offer = '待审批'
                break
              case '2':
                xdd.offer = '通过'
                break
              case '3':
                xdd.offer = '放弃'
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
    handleVerity(params) {
      this.$layer.iframe({
        content: {
          content: verity, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '审核',
        maxmin: true,
        shadeClose: false
      })
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: details, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '客户名称详情',
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
    this.getListData()
  },
  created() {}
}
</script>
<style scoped lang="scss">
</style>
