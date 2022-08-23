<!-- 指标列表 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <el-form-item>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()" :disabled="addParams.status === '1'">添加</el-button>
        <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" :disabled="addParams.status === '1'">批量删除</el-button>
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
import targetAdd from './target_add'
import {getReportTaskQueryPagePointTarget, getReportTaskDelReportPointTarget} from '../../../api/sampling/majorTask.js'
export default {
  props: {
    addParams: Object,
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
        prop: 'checkTypeName',
        label: '检测类别',
        width: 180
      }, {
        prop: 'targetName',
        label: '检测指标',
        width: 180
      }, {
        prop: 'funName',
        label: '检测方法',
        width: 400
      }],
      button: {
        width: 200,
        buttonList: [
          {name: '删除', type: 'danger', click: 'handleDelete', disabled: false}
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.reportPointId = this.params.id
      getReportTaskQueryPagePointTarget(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleAdd () {
      this.$layer.iframe({
        content: {
          content: targetAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.params
          }// props
        },
        area: this.$layer_Size.Max,
        title: '添加指标',
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
          getReportTaskDelReportPointTarget({ids: row.id}).then(res => {
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
    if (this.addParams.status === '1' || this.addParams.contStatus === '1') {
      this.button.buttonList[0].disabled = true
    } else {
      this.button.buttonList[0].disabled = false
    }
  }
}
</script>

<style scoped lang="scss">

</style>
