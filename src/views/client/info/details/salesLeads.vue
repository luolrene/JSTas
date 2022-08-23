<!--销售机会 -->
<template>
    <div class="pc-container">
         <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()" v-if="false">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
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
import salesLeadsAdd from './salesLeads_add'
import number from '../../salesLeads/number'
import { getCrmSaleOpportunityQueryPageData } from '@/api/client/salesLeads.js'
export default {
  props: {
    params: Object
  },
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        custName: null
      },
      fromData: [
        {
          type: 'select',
          prop: 'stage',
          label: '销售阶段',
          data: [
            { name: '发现需求', id: '1' },
            { name: '确认需求', id: '2' },
            { name: '商务谈判', id: '3' },
            { name: '合同签订', id: '4' },
            { name: '输单', id: '5' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'contactsName',
          label: '客户联系人'
        },
        {
          prop: 'opportunityName',
          label: '销售机会名称'
        },
        {
          prop: 'opportunityId',
          label: '销售机会编号',
          type: 'view2'
        },
        {
          prop: 'estimatedAmount',
          label: '预计金额'
        },
        {
          prop: 'stage',
          label: '销售阶段'
        },
        {
          prop: 'executorName',
          label: '负责人'
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
      getCrmSaleOpportunityQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            if (xdd.stage === '1') {
              xdd.stage = '发现需求'
            }
            if (xdd.stage === '2') {
              xdd.stage = '确认需求'
            }
            if (xdd.stage === '3') {
              xdd.stage = '商务谈判'
            }
            if (xdd.stage === '4') {
              xdd.stage = '合同签订'
            }
            if (xdd.stage === '5') {
              xdd.stage = '输单'
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
    // 添加
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: salesLeadsAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            addParams: this.params,
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    handleDetails2(params) {
      this.$layer.iframe({
        content: {
          content: number, // 传递的组件对象
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
    this.fromValiData.custName = this.params.name
    this.fromValiData.custId = this.params.id
    this.getListData()
  },
  created() {}
}
</script>

<style scoped>
</style>
