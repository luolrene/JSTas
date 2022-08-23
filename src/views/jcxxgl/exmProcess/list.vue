<!-- 审核流程管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()">批量删除</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :loading="loading" :isPage="false"></tableItem>
  </div>
</template>

<script>
import edit from './edit.vue'
import process from './process.vue'
import {
  getPathQueryAllPath,
  getPathDelPaths
} from '../../../api/jcxxgl/exmProcess.js'
export default {
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {},
      fromData: [{ type: 'input', prop: 'name', label: '流程名称' }],
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '主流程名称',
          width: 160
        },
        {
          prop: 'typeName',
          label: '审核类别',
          width: 90
        },
        {
          prop: 'isDefaultName',
          label: '是否默认',
          width: 90
        },
        {
          prop: 'usedName',
          label: '是否启用',
          width: 90
        },
        {
          prop: 'exp',
          label: '备注',
          width: 90
        }
      ],
      button: {
        width: 250,
        buttonList: [
          { name: '流程明细', type: 'primary', click: 'handleProcess' },
          { name: '编辑', type: 'primary', click: 'handleEdit' },
          { name: '删除', type: 'danger', click: 'handleDelete' }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getPathQueryAllPath(this.fromValiData)
        .then(res => {
          res.result.forEach(xdd => {
            switch (xdd.type) {
              case '1':
                xdd.typeName = '普通合同'
                break
              case '2':
                xdd.typeName = '合同变更(金额不变)'
                break
              case '3':
                xdd.typeName = '合同变更(金额变化)'
                break
              case '4':
                xdd.typeName = '外包合同'
                break
              case '5':
                xdd.typeName = '招投标审核'
                break
              case '6':
                xdd.typeName = '开票信息审核'
                break
              case '7':
                xdd.typeName = '报价记录审核(含咨询)'
                break
              case '8':
                xdd.typeName = '报价记录审核(不含咨询)'
            }
            xdd.isDefaultName = xdd.isDefault === '1' ? '是' : '否'
            xdd.usedName = xdd.used === '1' ? '是' : '否'
          })
          this.tableData = res.result
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
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleProcess(params) {
      this.$layer.iframe({
        content: {
          content: process, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加流程明细',
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
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getPathDelPaths({ ids: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
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
