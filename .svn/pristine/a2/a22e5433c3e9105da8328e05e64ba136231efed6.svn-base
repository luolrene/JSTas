<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="4">
      <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
    </el-col>
    <el-col :span="20">
     <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        <el-button type="primary" v-show="presentLevel=== '指标'" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        <el-button type="danger" v-show="presentLevel=== '指标'" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()">批量删除</el-button>
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
</template>

<script>
import priceEdit from './price_edit.vue'
import {getTargetPriceQueryTargetTree, getTargetPriceQueryPageList, getTargetPriceDelDatas} from '@/api/jcxxgl/targetDefend.js'
export default {
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        name: '',
        father: '0'
      },
      fromData: [
        { type: 'input', prop: 'name', label: '名称' }
      ],
      props: {
        label: 'name',
        children: 'children'
      },
      treeData: [],
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '名称',
          width: 140
        }
      ],
      button: {
        width: 100,
        buttonList: [
          {name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: (params) => {
              if (this.presentLevel === '指标') {
                return true
              }
            }},
          {name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: (params) => {
              if (this.presentLevel === '指标') {
                return true
              }
            }}
        ]
      },
      presentLevel: '其他',
      presentNode: ''
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getTargetPriceQueryPageList(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    getTreeData () {
      getTargetPriceQueryTargetTree({}).then(res => {
        this.treeData = res.result
      })
    },
    handleAdd () {
      this.$layer.iframe({
        content: {
          content: priceEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.fromValiData
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit (params) {
      params.fatherName = this.fromValiData.fatherName
      this.$layer.iframe({
        content: {
          content: priceEdit, // 传递的组件对象
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
      this.$share.confirm({
        message: '此操作将永久删除该数据, 是否继续?',
        confirm: () => {
          getTargetPriceDelDatas({ids: row.id}).then(res => {
            let ids = row.id.split(',')
            if (ids.length > 0) {
              ids.forEach(xdd => {
                this.$refs.myTree.$refs.elTree.remove(xdd)
              })
            } else {
              this.$refs.myTree.$refs.elTree.remove(row.id)
            }
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getListData()
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
    getNodeClick (data, node, now) {
      if (node.level === 1) {
        this.presentLevel = '指标'
        this.fromValiData.father = data.id
        this.fromValiData.fatherName = data.name
        this.presentNode = node
        this.getListData()
      } else {
        this.presentLevel = '其他'
      }
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
      this.fromValiData.father = '0'
      this.presentLevel = '其他'
      this.getTreeData()
      this.doReset('fromValiData')
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
