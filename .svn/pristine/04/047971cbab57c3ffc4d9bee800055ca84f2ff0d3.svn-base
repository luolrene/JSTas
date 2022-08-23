<!-- 分组管理 -->
<template>
  <div class="operate-container">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="4">
        <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
      </el-col>
      <el-col :span="20">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        </fromSearch>
        <tableItem
        :obj="this"
        :tableData="tableData"
        :tableHeader="tableHeader"
        :loading="loading"
        :dataSum='fromValiData.dataSum'
        :isSelection="false"
        customHeight="450"
        @handleSizeChange="handleSizeChange"
        @getCellClick="getCellClick">
        </tableItem>
        <div style="display: flex;margin-top: -45px;">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getGroupQueryPageData, getGroupQueryAllGroupsTree} from '../../api/jcxxgl/group.js'
export default {
  props: {
    layerid: ''
  },
  data () {
    return {
      loading: false,

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
      tableData: [],
      treeData: [],
      tableHeader: [{
        prop: 'name',
        label: '分组名称'
      }, {
        prop: 'exp',
        label: '备注'
      }]
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
      this.getListData(data.id)
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
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getCellClick (params) {
      this.$parent.getGroupData(params)
      this.$layer.close(this.layerid)
    },
    doBackToTop () {
      this.fromValiData.father = 0
      this.getTreeData()
      this.doReset('fromValiData')
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
