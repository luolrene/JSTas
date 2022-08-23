<!--访客计划-->
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
    :isSelection="false"
    @handleSizeChange="handleSizeChange"></tableItem>
    </div>
</template>

<script>
import add from './visitorsToPlan_add.vue'
import edit from '../../visitorsToPlan/edit'
import postpone from '../../visitorsToPlan/postpone'
import detail from '../../visitorsToPlan/detail'
import {
  getCrmVisitorAddOrModify,
  getCrmVisitorQueryPageData
} from '@/api/client/visitorsToPlan.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        name: null,
        position: null,
        groupId: null
      },
      fromData: [
        { type: 'input', prop: 'contactsName', label: '联系人' },
        {
          type: 'select',
          prop: 'status',
          label: '状态',
          data: [
            { name: '未跟进', id: '1' },
            { name: '已跟进', id: '2' },
            { name: '延期', id: '3' },
            { name: '取消', id: '4' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '访客计划名称',
          type: 'view2'
        },
        {
          prop: 'contactsName',
          label: '联系人名字'
        },
        {
          prop: 'objective',
          label: '拜访目的'
        },
        {
          prop: 'remarks',
          label: '备注'
        },
        {
          prop: 'status',
          label: '跟进状态'
        },
        {
          prop: 'executorTime',
          label: '执行时间'
        },
        {
          prop: 'executorName',
          label: '执行人'
        }
      ]
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmVisitorQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            if (xdd.status === '1') {
              xdd.status = '未跟进'
            }
            if (xdd.status === '2') {
              xdd.status = '已跟进'
            }
            if (xdd.status === '3') {
              xdd.status = '延期'
            }
            if (xdd.status === '4') {
              xdd.status = '取消'
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
    // 查询
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    // 重置
    doReset() {
      this.fromValiData.groupId = null
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    // 添加
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: add, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.params
          }
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
            params: params,
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleChange(params, title) {
      params.status = '2'
      let index = '是否将跟进状态调整为已跟进?'
      if (title) {
        index = title
      }
      this.$confirm(index, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          getCrmVisitorAddOrModify(params).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getListData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
          this.getListData()
        })
    },
    handlePostponelPlan(params, title) {
      params.status = '4'
      let index = '是否将跟进状态调整为取消计划?'
      if (title) {
        index = title
      }
      this.$confirm(index, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          getCrmVisitorAddOrModify(params).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getListData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
          this.getListData()
        })
    },
    handleCancelPlan(params) {
      this.$layer.iframe({
        content: {
          content: postpone, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '延期计划',
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
        title: '访客计划详情',
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
    this.fromValiData.custId = this.params.id
    this.getListData()
  },
  created() {}
}
</script>
<style scoped>
</style>
