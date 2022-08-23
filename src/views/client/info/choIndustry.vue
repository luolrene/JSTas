<!-- 分组管理 -->
<template>
  <div class="operate-container">
    <el-row type="flex" class="row-bg" justify="center" :gutter="16">
      <el-col :span="5">
        <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
  <!--      <el-tree ref="myTree" node-key="id" highlight-current :expand-on-click-node="false" check-on-click-node :props="props" :data="treeData" @node-click="getNodeClick">
        </el-tree> -->
      </el-col>
      <el-col :span="19">
        <el-form :model="fromValiData" inline class="list-form" ref="fromValiData">
          <el-form-item label="行业名称：" prop="name">
            <el-input v-model="fromValiData.name" placeholder="" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
          </el-form-item>
        </el-form>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :dataSum='fromValiData.dataSum' customHeight="450" :isSelection="false" :pageSize="50" @handleSizeChange="handleSizeChange" @getCellClick="getCellClick">
        </tableItem>
        <div style="display: flex;margin-top: -45px;">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getIndusQueryPageData,
  getIndusQueryIndusTree
} from '@/api/jcxxgl/msgDefend.js'
export default {
  props: {
    layerid: ''
  },
  data() {
    return {
      loading: false,
      props: {
        label: 'name',
        children: 'children'
      },
      fromValiData: {
        pageSize: 50,
        pageNow: 1,
        father: '0'
      },
      tableData: [],
      treeData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '行业名称'
        },
        {
          prop: 'exp',
          label: '备注'
        }
      ]
    }
  },
  methods: {
    getListData(id) {
      this.loading = true
      if (id) this.fromValiData.father = id
      getIndusQueryPageData(this.fromValiData)
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
    getTreeData() {
      getIndusQueryIndusTree({}).then(res => {
        this.treeData = res.result
      })
    },
    getNodeClick(data, node, now) {
      this.getListData(data.id)
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.$refs[formName].resetFields()
      this.getListData()
    },
    doBackToTop() {
      this.fromValiData.father = '0'
      this.getTreeData()
      this.doReset('fromValiData')
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getCellClick(params) {
      sessionStorage.setItem('custId', JSON.stringify(params))
      this.$parent.fromValiData.industry = params.id
      this.$parent.fromValiData.industryName = params.name
      this.$layer.close(this.layerid)
    }
  },
  mounted() {
    this.getListData()
    this.getTreeData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
