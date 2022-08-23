<!-- 分组管理 -->
<template>
  <div class="pc-container">
    <el-row type="flex" class="row-bg" justify="center" :gutter="16">
      <el-col :span="4">
        <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
      </el-col>
      <el-col :span="20">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
          <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()">批量删除</el-button>
        </fromSearch>
        <tableItem
        :obj="this"
        :tableData="tableData"
        :tableHeader="tableHeader"
        :button="button"
        :loading="loading"
        :dataSum='fromValiData.dataSum'
        @handleSizeChange="handleSizeChange">
        </tableItem>
        <div style="display: flex;margin-top: -45px;">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import edit from './edit.vue'
import {getGroupQueryPageData, getGroupDelGroup, getGroupQueryAllGroupsTree} from '../../../api/jcxxgl/group.js'
export default {
  components: {

  },
  data () {
    return {
      loading: false,

      presentNode: '',

      props: {
        label: 'name',
        children: 'children'
      },
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        keyWord: null,
        father: '0'
      },
      fromData: [
        {type: 'input', prop: 'keyWord', label: '分组名称'}
      ],
      paramsData: {
        father: 0
      },
      tableData: [],
      treeData: [],
      tableHeader: [{
        prop: 'name',
        label: '分组名称',
        width: 250
      }, {
        prop: 'exp',
        label: '备注',
        width: 250
      }],
      button: {
        width: 250,
        buttonList: [
          {name: '编辑', type: 'primary', click: 'handleEdit'},
          {name: '删除', type: 'danger', click: 'handleDelete'}
        ]
      },

      multipleSelection: []
    }
  },
  methods: {
    getListData (id) {
      this.loading = true
      if (id) this.fromValiData.father = id
      getGroupQueryPageData(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    getTreeData () {
      getGroupQueryAllGroupsTree({}).then(res => {
        this.treeData = res.result
      })
    },
    getNodeClick (data, node, now) {
      this.paramsData.fatherName = data.name
      this.paramsData.father = data.id
      this.presentNode = node
      this.getListData(data.id)
    },
    appendTree (params) {
      this.$refs.myTree.$refs.elTree.append(params, this.presentNode)
    },
    editTree (params) {
      let xdd = this.$refs.myTree.$refs.elTree.getNode(params.id)
      xdd.data.exp = params.exp
      xdd.data.father = params.father
      xdd.data.id = params.id
      xdd.data.name = params.name
    },
    doSearch () {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    doBackToTop () {
      this.fromValiData.father = 0
      this.getTreeData()
      this.doReset('fromValiData')
    },
    handleAdd () {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.paramsData
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit (params) {
      params.fatherName = this.paramsData.fatherName
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete (row) {
      let that = this
      this.$share.confirm({
        message: '此操作将永久删除该数据及其' + '<span style="color:red;font-weight:700">子数据</span>' + ', 是否继续?',
        confirm: function () {
          getGroupDelGroup({id: row.id}).then(res => {
            let ids = row.id.split(',')
            if (ids.length > 0) {
              ids.forEach(xdd => {
                that.$refs.myTree.$refs.elTree.remove(xdd)
              })
            } else {
              that.$refs.myTree.$refs.elTree.remove(row.id)
            }
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleBatchDel () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = {id: ''}
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.handleDelete(ids)
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted () {
    this.getListData()
    this.getTreeData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
