<!--节点详情 -->
<template>
  <div class="pc-container">
    <fromSearch
      ref="fromSearch"
      :obj="this"
      :fromValiData="fromValiData"
      :fromData="fromData"
    >
      <el-button
        type="primary"
        class="default-btn"
        icon="el-icon-search"
        @click="doSearch()"
        >查询</el-button
      >
      <el-button
        type="primary"
        class="default-btn"
        icon="el-icon-refresh"
        @click="doReset('fromValiData')"
        >重置</el-button
      >
      <!-- <el-button
        type="primary"
        class="default-btn"
        icon="el-icon-plus"
        @click="handleAdd()"
        >添加</el-button
      > -->
      <el-button
        type="danger"
        class="default-btn"
        icon="el-icon-delete"
        @click="handleBatchDel()"
        >批量删除</el-button
      >
    </fromSearch>
    <tableItem
      :obj="this"
      :tableData="tableData"
      :tableHeader="tableHeader"
      :dataSum="fromValiData.dataSum"
      :loading="loading"
      :button="button"
      :isSelection="false"
      @handleSizeChange="handleSizeChange"
    ></tableItem>
  </div>
</template>

<script>
// import nodeListEdit from './nodeList_edit'
import {
  getCrmSaleOpportunityNodeQueryPageData,
  getCrmSaleOpportunityNodeQueryDelByIds
} from '@/api/client/salesLeads.js'
export default {
  props: {
    params: Object
  },
  data() {
    return {
      loading: false,
      multipleSelection: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        custName: null,
        contactsName: null
      },
      fromData: [{ type: 'input', prop: 'createUserName', label: '创建人' }],
      tableData: [],
      tableHeader: [
        {
          prop: 'remarks',
          label: '备注描述'
        },
        {
          prop: 'stageName',
          label: '阶段'
        },
        {
          prop: 'createUserName',
          label: '创建人名'
        },
        {
          prop: 'createTime',
          label: '创建时间'
        }
      ],
      button: {
        width: 100,
        buttonList: [{ name: '删除', type: 'danger', click: 'handleDelete' }]
      }
    }
  },

  methods: {
    getListData() {
      this.loading = true
      getCrmSaleOpportunityNodeQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            if (xdd.stage === '1') {
              xdd.stageName = '发现需求'
            }
            if (xdd.stage === '2') {
              xdd.stageName = '确认需求'
            }
            if (xdd.stage === '3') {
              xdd.stageName = '商务谈判'
            }
            if (xdd.stage === '4') {
              xdd.stageName = '合同签订'
            }
            if (xdd.stage === '5') {
              xdd.stageName = '输单'
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
    // handleAdd() {
    //   this.$layer.iframe({
    //     content: {
    //       content: nodeListEdit, // 传递的组件对象
    //       parent: this, // 当前的vue对象
    //       data: {
    //         layerid: '',
    //         params: this.params
    //       }
    //     },
    //     area: this.$layer_Size.Normal,
    //     title: '添加',
    //     maxmin: true,
    //     shadeClose: false
    //   })
    // },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getCrmSaleOpportunityNodeQueryDelByIds({ ids: row.id }).then(res => {
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
    handleBatchDel() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = { id: '' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.handleDelete(ids)
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset() {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    }
  },
  mounted() {
    this.fromValiData.custName = this.params.custName
    this.fromValiData.fatherId = this.params.id
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
