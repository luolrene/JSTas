<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" :isSelection="false" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import verity from './verity.vue'
import detail from '../../bid/bidMange/detail.vue'
import details from '../../client/contactManage/details.vue'
import { getCrmBiddingToExamineQueryPageData } from '@/api/bid/bid.js'
export default {
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [],
      tableData: [],
      tableHeader: [
        {
          prop: 'custName',
          label: '客户名称',
          type: 'view',
          width: 90
        },
        {
          prop: 'opportunityName',
          label: '项目名称',
          type: 'view2',
          width: 90
        },
        {
          prop: 'fixedPrice',
          label: '项目限价',
          width: 90
        },
        {
          prop: 'startTime',
          label: '开标时间',
          width: 90
        },
        {
          prop: 'createUserName',
          label: '经办人',
          width: 90
        },
        {
          prop: 'step',
          label: '当前审核步骤',
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
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmBiddingToExamineQueryPageData(this.fromValiData)
        .then(res => {
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
        title: '客户详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails2(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '项目详情',
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
