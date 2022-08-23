<!-- 点位列表 -->
<template>
  <div class="operate-container">
   <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="简洁版" name="first">
        <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
          <el-form-item>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()" :disabled="params.status === '1' || params.status ==='3' || params.contStatus === '07'">添加</el-button>
            <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" :disabled="params.status === '1' || params.status ==='3' || params.contStatus === '07'">批量删除</el-button>
          </el-form-item>
        </el-form>
        <tableItem
        :obj="this"
        :tableData="tableData"
        :tableHeader="tableHeader"
        :dataSum='fromValiData.dataSum'
        :button="button"
        :loading="loading"
        @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="详细版" name="second">
        <allTargetList :params="params" :layerid="layerid" :pointType="pointType" ref="allTargetList"></allTargetList>
      </el-tab-pane>
    </el-tabs> -->
    <div style="float: right;margin-bottom: 15px;margin-right: 30px;">
      <el-button v-if="activeName==='second'" :disabled="params.status === '1' || params.status ==='3' || params.contStatus === '07'"
      type="primary" :size="$layer_Size.buttonSize" @click="onBatchDays">批量录入天数</el-button>
      <el-button v-if="activeName==='second'" :disabled="params.status === '1' || params.status ==='3' || params.contStatus === '07'"
      type="primary" :size="$layer_Size.buttonSize" @click="onSubmit">保存</el-button>
    </div>
    <allTargetList :params="params" :layerid="layerid" :pointType="pointType" ref="allTargetList"></allTargetList>
  </div>
</template>

<script>
import pointAdd from './point_add.vue'
import targetList from './target_list.vue'
import allTargetList from './allTargetList.vue'
import {getReportTaskQueryPagePoint, getReportTaskDelReportPoint} from '../../../api/sampling/majorTask.js'
export default {
  props: {
    params: Object,
    layerid: '',
    pointType: {
      type: String,
      default: '1'
    }
  },
  components: {
    allTargetList
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
        label: '点位名称',
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
        width: 70
      }, {
        prop: 'days',
        label: '检测天数',
        width: 90
      }],
      button: {
        width: 250,
        buttonList: [
          {name: '指标录入', type: 'primary', click: 'handlePoint'},
          {name: '删除', type: 'danger', click: 'handleDelete', disabled: false}
        ]
      },
      multipleSelection: [],
      projectTypeData: [], // 项目类型
      activeName: 'second'
    }
  },
  methods: {
    onSubmit () {
      this.$refs.allTargetList.onSubmit()
    },
    onBatchDays () {
      this.$refs.allTargetList.onBatchDays()
    },
    handleClick (e) {
      if (e.index === '0') {
        this.getListData()
      } else {
        this.$refs.allTargetList.getListData()
      }
    },
    getListData () {
      this.loading = true
      this.fromValiData.reportNo = this.params.reportNo
      getReportTaskQueryPagePoint(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleAdd () {
      // 根绝合同id去获取合同任务中的点位列表
      this.$layer.iframe({
        content: {
          content: pointAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.params,
            fatherTableData: this.tableData,
            pointType: this.pointType
          }// props
        },
        area: this.$layer_Size.Max,
        title: '添加点位',
        maxmin: true,
        shadeClose: false
      })
    },
    handlePoint (params) {
      this.$layer.iframe({
        content: {
          content: targetList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            addParams: this.params,
            params: params
          }// props
        },
        area: this.$layer_Size.Max,
        title: '指标录入列表',
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
          getReportTaskDelReportPoint({ids: row.id}).then(res => {
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
    // this.getListData()
  },
  created () {
    if (this.params.status === '1' || this.params.status === '3' || this.params.contStatus === '07') {
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
