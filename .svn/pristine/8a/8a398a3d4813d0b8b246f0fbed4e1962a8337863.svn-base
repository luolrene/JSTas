<!-- 工作指派 -->
<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :loading="loading"
    :button="button"
    :isSelection="false"></tableItem>
  </div>
</template>

<script>
import assignEdit from './assign_edit.vue'
import { getCrmReportArrangementQueryPageData } from '@/api/client/report.js'
export default {
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {
        pageNow: 1,
        pageSize: 10
      },
      fromData: [{ type: 'input', prop: 'reportName', label: '报告主题' }],
      tableData: [],
      tableHeader: [
        {
          prop: 'reportName',
          label: '报告主题',
          width: 140
        },
        {
          prop: 'remarks',
          label: '备注',
          width: 90
        },
        {
          prop: 'createUserName',
          label: '创建人名称',
          width: 90
        },
        {
          prop: 'createTime',
          label: '创建时间',
          width: 140
        },
        {
          prop: 'submitUserName',
          label: '下发用户名称',
          width: 120
        }
      ],
      button: {
        width: 140,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleAssignEdit'
          }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmReportArrangementQueryPageData(this.fromValiData)
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
    doSearch() {
      this.getListData()
    },
    doReset(formName) {
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: assignEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
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
          content: assignEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAssignEdit(params) {
      this.$layer.iframe({
        content: {
          content: assignEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
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
