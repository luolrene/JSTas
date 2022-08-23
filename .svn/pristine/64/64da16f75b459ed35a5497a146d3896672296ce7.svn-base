<template>
  <div class="pc-container nodeDefend">
    <el-row :gutter="20">
      <el-col :span="3" style="overflow-y: auto;height: calc(100vh - 200px);">
        <el-steps direction="vertical" :space="60">
          <el-step v-for="(item,index) in stepListData" :key="index">
            <span slot="title" style="cursor: pointer;" @click="clickStep(item,index)" :style="{color:index === activeColor ? '#018CCF' :''}">
              {{item.name}}
            </span>
          </el-step>
        </el-steps>
      </el-col>
      <el-col :span="21">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
          <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()">批量删除</el-button>
        </fromSearch>
        <tableItem
        :obj="this"
        :tableData="tableData"
        :tableHeader="tableHeader"
        :button="button"
        :dataSum='fromValiData.dataSum'
        :loading="loading"
        @handleSizeChange="handleSizeChange"></tableItem>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import edit from './edit.vue'
import {getSysQueryDict} from '../../../api/common.js'
import {getReportJdQueryPageList, getReportJdDelOpers} from '../../../api/jcxxgl/nodeDefend.js'
export default {
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [

      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'operName',
        label: '负责人姓名',
        width: 120
      }, {
        prop: 'operMobile',
        label: '负责人电话',
        width: 120
      }, {
        prop: 'jdNo',
        label: '节点编号',
        width: 120
      }],
      button: {
        width: 120,
        buttonList: [
          {name: '删除', type: 'danger', click: 'handleDelete'}
        ]
      },
      multipleSelection: [],

      activeColor: 0,
      stepListData: []
    }
  },
  methods: {
    getListData () {
      getReportJdQueryPageList(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    getNodeData () {
      getSysQueryDict({'type': 'RWJD'}).then(res => {
        this.stepListData = res.result
        if (res.result.length > 0) {
          this.fromValiData.jdNo = res.result[0].id
          this.fromValiData.jdNoName = res.result[0].name
          this.getListData()
        }
      })
    },
    clickStep (params, index) {
      this.activeColor = index
      this.fromValiData.jdNo = params.id
      this.fromValiData.jdNoName = params.name
      this.getListData(params.id)
    },
    handleAdd () {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            addParams: this.fromValiData
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit (params) {
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
        confirm: function () {
          getReportJdDelOpers({ids: row.id}).then(res => {
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
    this.getNodeData()
  },
  created () {

  }
}
</script>

<style lang="scss">
.nodeDefend .el-steps--simple{
  padding: 15px !important;
}
</style>
