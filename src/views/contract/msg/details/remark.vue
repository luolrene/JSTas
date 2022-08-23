<!--审核备注 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    customHeight="450"
    :isSelection="false"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import edit from './remarkEdit.vue'
import {getContractRemarksQueryPageData} from '../../../../api/contract/msg.js'
export default {
  props: {
    params: Object
  },
  components: {

  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        userName: ''
      },
      fromData: [
        {type: 'input', prop: 'userName', label: '用户名称'}
      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'userName',
        label: '用户名称',
        width: 90
      }, {
        prop: 'userMobile',
        label: '用户手机号码',
        width: 90
      }, {
        prop: 'remarks',
        label: '备注内容',
        width: 90
      }, {
        prop: 'remarksTime',
        label: '备注时间',
        width: 90
      }]
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.contId = this.params.id
      getContractRemarksQueryPageData(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleAdd () {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            addParams: this.params
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    doSearch () {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
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
