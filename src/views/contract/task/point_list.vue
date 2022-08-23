<!-- 点位列表 -->
<template>
  <div class="operate-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="简洁版" name="first">
        <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
          <el-form-item label="点位名称:" prop="name">
            <el-input v-model="fromValiData.name" placeholder="请输入点位名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()" :disabled="params.status === '06'">添加</el-button>
            <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" :disabled="params.status === '06'">批量删除</el-button>
          </el-form-item>
        </el-form>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="详细版" name="second">
        <allTargetList :params="params" :layerid="layerid" ref="allTargetList"></allTargetList>
      </el-tab-pane>
    </el-tabs>
    <el-button
      v-if="params.isFnishCase==='0'"
      @click="handleaAffirm"
      :size="$layer_Size.buttonSize"
      type="primary"
      style="position: absolute;top: 52px;right: 160px;z-index: 999999;">方案确认</el-button>
    <el-button
      v-if="activeName==='second'"
      @click="handleAdd"
      :size="$layer_Size.buttonSize"
      type="primary"
      style="position: absolute;top: 52px;right: 50px;z-index: 999999;"
      :disabled="disabled">添加点位</el-button>
  </div>
</template>

<script>
import allTargetList from './allTargetList.vue'
import pointAdd from './point_add.vue'
import targetList from './target_list.vue'
import pointCopy from './point_copy.vue'
import {
  getContTaskQueryCheckPoint,
  getContTaskDelCheckPoint,
  getContFinishCase
} from '../../../api/contract/task.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {
    allTargetList
  },
  data() {
    return {
      loading: false,
      disabled: false,
      contId: '',
      fromValiData: {
        pageSize: '10',
        pageNow: '1',
        name: ''
      },
      tableData: [],
      tableHeader: [
        {
          prop: 'custPointName',
          label: '点位名称',
          width: 90
        },
        {
          prop: 'name',
          label: '点位编号',
          width: 90
        },
        {
          prop: 'typeName',
          label: '点位类型',
          width: 90
        },
        {
          prop: 'sampLbName',
          label: '样品类别',
          width: 90
        },
        {
          prop: 'sampLxName',
          label: '样品类型',
          width: 90
        },
        {
          prop: 'targets',
          label: '指标明细',
          width: 200
        },
        {
          prop: 'pc',
          label: '频次',
          width: 70
        },
        {
          prop: 'days',
          label: '初始检测天数',
          width: 90
        }
      ],
      button: {
        width: 300,
        buttonList: [
          { name: '指标录入', type: 'primary', click: 'handleTarget' },
          { name: '复制', type: 'primary', click: 'handleCopy' },
          { name: '编辑', type: 'primary', click: 'handleEdit' },
          { name: '删除', type: 'danger', click: 'handleDelete' }
        ]
      },
      multipleSelection: [],
      steps: [],
      activeName: 'second'
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.contId = this.params.id
      getContTaskQueryCheckPoint(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.type) {
              case '1':
                xdd.typeName = '采样'
                break
              case '2':
                xdd.typeName = '送样'
                break
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
    handleClick(e) {
      if (e.index === '0') {
        this.getListData()
      } else {
        this.$refs.allTargetList.getListData()
      }
    },
    handleTarget(params) {
      this.$layer.iframe({
        content: {
          content: targetList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            addParams: this.params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '指标列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleCopy(params) {
      this.$layer.iframe({
        content: {
          content: pointCopy, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Min,
        title: '点位复制',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: pointAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            contId: this.params.id,
            type: this.params.type
          } // props
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
          content: pointAdd, // 传递的组件对象
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
    doSearch() {
      this.fromValiData.pageNow = '1'
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = '1'
      this.$refs[formName].resetFields()
      this.getListData()
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getContTaskDelCheckPoint({ ids: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleaAffirm(params, title) {
      let index = '是否确认合同方案？'
      if (title) {
        index = title
      }
      this.$confirm(index, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        getContFinishCase({ contId: this.contId }).then(res => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.$parent.getListData()
          this.$layer.close(this.layerid)
        })
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
    }
  },
  mounted() {
    this.getListData()
  },
  created() {
    this.contId = this.params.id
    if (this.params.status === '06') {
      this.button.buttonList.forEach(xdd => {
        if (xdd.name === '复制' || xdd.name === '编辑' || xdd.name === '删除') {
          xdd.disabled = true
        }
      })
      this.disabled = true
    }
  }
}
</script>

<style scoped lang="scss">
</style>
