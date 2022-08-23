<!-- 指标列表 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="80" inline class="list-form" ref="fromValiData">
      <el-form-item>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()" :disabled="addParams.status === '06'">普通录入</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-goods" @click="handleAdd_packAge()" :disabled="addParams.status === '06'">按包录入</el-button>
        <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" :disabled="addParams.status === '06'">批量删除</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-edit-outline" @click="handleBatchEdit()" :disabled="addParams.status === '06'">批量保存</el-button>
      </el-form-item>
    </el-form>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :button="button"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    customHeight="null"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import targetAdd from './target_add.vue'
import targetPackAge from './target_packAge.vue'
import {getContTaskQueryList, getContTaskDelContTask, getContTaskAddOrModifyContTask} from '../../../api/contract/task.js'
export default {
  props: {
    params: Object,
    addParams: Object,
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
      }, {
        prop: 'checkDays',
        type: 'input',
        number: true,
        label: '总检测天数',
        width: 120
      }, {
        prop: 'finishDays',
        label: '已检测天数',
        width: 120
      }],
      button: {
        width: 200,
        buttonList: [
          {name: '删除', type: 'danger', click: 'handleDelete'}
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.pointId = this.params.id ? this.params.id : this.params.pointId
      getContTaskQueryList(this.fromValiData).then(res => {
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
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleBatchEdit () {
      let array = []
      this.tableData.forEach((xdd, index) => {
        array.push({
          id: xdd.id,
          contId: this.params.contId,
          pointId: this.params.id ? this.params.id : this.params.pointId,
          checkType: xdd.checkType,
          target: xdd.target,
          fun: xdd.fun,
          checkDays: xdd.checkDays
        })
      })
      getContTaskAddOrModifyContTask(array).then(res => {
        this.getListData()
        this.$share.message()
      })
    },
    handleAdd_packAge (params) {
      this.$layer.iframe({
        content: {
          content: targetPackAge, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.params
          }// props
        },
        area: this.$layer_Size.Max,
        title: '按包录入',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete (row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getContTaskDelContTask({ids: row.id}).then(res => {
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
  },
  created () {
    if (this.addParams.status === '06') {
      this.button.buttonList.forEach(xdd => {
        if (xdd.name === '删除') {
          xdd.disabled = true
        }
      })
      this.disabled = true
    }
  },
  destroyed () {
    if (typeof (this.$parent.doSearch) === 'function') {
      this.$parent.doSearch()
    }
    if (typeof (this.$parent.getListData) === 'function') {
      this.$parent.getListData()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
