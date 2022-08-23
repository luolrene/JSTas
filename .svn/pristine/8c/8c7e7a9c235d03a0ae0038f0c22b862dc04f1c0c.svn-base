<!-- 点位列表 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <el-form-item>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()" :disabled="params.contStatus === '07'">添加</el-button>
        <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" :disabled="params.contStatus === '07'">批量删除</el-button>
      </el-form-item>
    </el-form>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    customHeight="450"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import sampleList from './sample_list.vue'
import pointAdd from './point_add.vue'
import {getSamplingTaskQuerySampPointPage, getSamplingTaskDelSampPoint} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {

  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      tableData: [

      ],
      tableHeader: [{
        prop: 'pointName',
        label: '点位编号',
        width: 90
      }, {
        prop: 'sampLbName',
        label: '样品类别',
        width: 90
      }, {
        prop: 'sampLxName',
        label: '样品类型',
        width: 90
      }, {
        prop: 'targets',
        label: '指标明细',
        width: 200
      }, {
        prop: 'pc',
        label: '频次',
        width: 90
      }, {
        prop: 'days',
        label: '检测天数',
        width: 90
      }],
      button: {
        width: 250,
        buttonList: [
          {name: '样品编号', type: 'primary', click: 'handleSample'},
          {name: '删除', type: 'danger', click: 'handleDelete'}
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.samplingTaskId = this.params.id
      getSamplingTaskQuerySampPointPage(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleAdd () {
      // 根据报告编号获取报告任务中的点位列表
      this.$layer.iframe({
        content: {
          content: pointAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.params
          }// props
        },
        area: this.$layer_Size.Max,
        title: '添加点位',
        maxmin: true,
        shadeClose: false
      })
    },
    handleSample (params) {
      this.$layer.iframe({
        content: {
          content: sampleList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            addParams: this.params
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '样品编号列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    handleDelete (row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getSamplingTaskDelSampPoint({ids: row.id}).then(res => {
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
    }
  },
  mounted () {
    this.getListData()
  },
  created () {
    if (this.params.contStatus === '07') {
      this.button.buttonList.forEach(xdd => {
        if (xdd.name === '删除') {
          xdd.disabled = true
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
