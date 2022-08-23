<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" icon="el-icon-plus" @click="doAdd()">添加</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :button="button" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
    </tableItem>
  </div>
</template>

<script>
import edit from './receivables_edit.vue'
import {
  getCrmAccountsReceivableQueryPageData,
  getCrmAccountsReceivableDelByIds
} from '@/api/finance/receivables.js'
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
          label: '应收款类型',
          data: [{ name: '预付款', id: '1' }, { name: '项目款', id: '2' }]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'accountsTypeName',
          label: '应收款类型',
          width: 150
        },
        {
          prop: 'accountsTime',
          label: '应收款时间',
          width: 100
        },
        {
          prop: 'accountsMoney',
          label: '应收款金额',
          width: 100
        },
        {
          prop: 'accountsMoneyAlready',
          label: '已收金额',
          width: 100
        },
        {
          prop: 'accountsMoneyNot',
          label: '未收金额',
          width: 100
        },
        {
          prop: 'accountsAccountEstimate',
          label: '正常账龄',
          width: 100
        },
        {
          prop: 'accountsAccountActual',
          label: '实际账龄',
          width: 100
        },
        {
          prop: 'remarks',
          label: '备注',
          width: 200
        }
      ],
      button: {
        width: 240,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit'
          }
          // {
          //   name: '回款信息',
          //   type: 'primary',
          //   click: 'handleReturnedMoney'
          // }
          // {
          //   name: '删除',
          //   type: 'danger',
          //   click: 'handleDelete',
          // }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getCrmAccountsReceivableQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.accountsType) {
            case '1':
              xdd.accountsTypeName = '预付款'
              break
            case '2':
              xdd.accountsTypeName = '项目款'
          }
          if (xdd.accountsJudgeBilling === 2) {
            xdd.accountsJudgeBillingName = '已开票'
          } else {
            xdd.accountsJudgeBillingName = '未开票'
          }
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      })
    },
    doAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
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
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            receivableData: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
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
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getCrmAccountsReceivableDelByIds({ ids: row.id }).then(res => {
            if (res.code === 0) {
              that.$message({
                type: 'success',
                message: '删除成功'
              })
            }
            that.getListData()
          })
        }
      })
    },
    // // 回款信息
    // handleReturnedMoney(params) {
    //   this.$layer.iframe({
    //     content: {
    //       content: returned, // 传递的组件对象
    //       parent: this, // 当前的vue对象
    //       data: {
    //         params: params
    //       } // props
    //     },
    //     area: this.$layer_Size.Max,
    //     title: '回款信息',
    //     maxmin: true,
    //     shadeClose: false
    //   })
    // },
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
      this.fromValiData.contId = this.params.id
    }
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
