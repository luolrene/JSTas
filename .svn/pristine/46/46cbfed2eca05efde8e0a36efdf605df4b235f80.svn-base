<template>
    <div class="operate-container">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
            <el-button type="primary" :size="$layer_Size.buttonSize" icon="el-icon-plus" @click="doAdd()">添加</el-button>
        </fromSearch>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :button="button" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
        </tableItem>
    </div>
</template>

<script>
import edit from './returnedEdit.vue'
import {
  getCrmAccountsReceivableTakeBackQueryPageData
  // getCrmAccountsReceivableTakeBackDelByIds
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
      fromData: [],
      tableData: [],
      tableHeader: [
        {
          prop: 'takeBackMoney',
          label: '回款金额',
          width: 100
        },
        {
          prop: 'createUserName',
          label: '操作人',
          width: 100
        },
        {
          prop: 'takeBackTime',
          label: '回款时间',
          width: 100
        },
        {
          prop: 'remark',
          label: '备注',
          width: 150
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
          //     name: '删除',
          //     type: 'danger',
          //     click: 'handleDelete',
          // }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getCrmAccountsReceivableTakeBackQueryPageData(this.fromValiData).then(
        res => {
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        }
      )
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
    // handleDelete(row) {
    //   let that = this
    //   this.$share.confirm({
    //     confirm: function() {
    //       getCrmAccountsReceivableTakeBackDelByIds({ ids: row.id }).then(
    //         res => {
    //           if (res.code === 0) {
    //             that.$message({
    //               type: 'success',
    //               message: '删除成功'
    //             })
    //           }
    //           that.getListData()
    //         }
    //       )
    //     }
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
