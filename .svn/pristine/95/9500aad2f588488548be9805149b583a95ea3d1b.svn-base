<!-- 点位列表 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <el-form-item label="点位名称:" prop="name">
        <el-input v-model="fromValiData.name" placeholder="请输入点位名称"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()">批量删除</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-s-promotion" @click="handleSampling()">添加点位至采样任务</el-button>
      </el-form-item>
    </el-form>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    :customHeight="customHeight"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import pointAdd from './point_add.vue'
import pointEdit from './point_edit.vue'
import samplingList from './sampling_list.vue'
import targetList from './target_list.vue'
import pointCopy from '../task/point_copy.vue'
import {
  getContTaskQueryCheckPoint,
  getContTaskDelCheckPoint
} from '../../../api/contract/task.js'
import { getContTaskAddPointsToSampTask } from '../../../api/contract/changeCont.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {},
  data() {
    return {
      loading: false,
      customHeight: this.$layer_Size.tableSelfMaxHeight,

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
          label: '检测天数',
          width: 90
        }
      ],
      button: {
        width: 300,
        buttonList: [
          { name: '指标录入', type: 'primary', click: 'handleTarget' },
          { name: '复制', type: 'primary', click: 'handleCopy' },
          { name: '天/频修改', type: 'primary', click: 'handleEdit' },
          { name: '删除', type: 'danger', click: 'handleDelete' }
        ]
      },
      multipleSelection: [],
      steps: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.contId = this.params.contId
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
    handleTarget(params) {
      this.$layer.iframe({
        content: {
          content: targetList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
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
            contId: this.params.contId
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
          content: pointEdit, // 传递的组件对象
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
    handleSampling() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选点位', 'warning')
        return
      }
      this.$layer.iframe({
        content: {
          content: samplingList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            addParams: this.params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '采样任务列表',
        maxmin: true,
        shadeClose: false
      })
    },
    getSelectData(params) {
      let ids = {}
      ids.pointList = this.multipleSelection
      ids.sampTask = params
      return new Promise((resolve, reject) => {
        getContTaskAddPointsToSampTask(ids)
          .then(res => {
            this.getListData()
            resolve(res.result)
          })
          .catch(err => {
            reject(err)
          })
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
            if (res.code === '0') {
              that.$message({
                type: 'success',
                message: '删除成功'
              })
            }
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
  created() {}
}
</script>

<style scoped lang="scss">
</style>
