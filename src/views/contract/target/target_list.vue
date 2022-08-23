<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="80" inline class="list-form" ref="fromValiData">
      <el-form-item label="检测指标:" prop="checkTargetName">
          <el-input v-model="fromValiData.checkTargetName" placeholder=""/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()">批量删除</el-button>
      </el-form-item>
    </el-form>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :button="button"
    :loading="loading"
    customHeight="null"
    :isPage="false"></tableItem>
  </div>
</template>

<script>
import targetAdd from './target_add'
import {getPackQueryListPackItem, getPackDelPackItem} from '../../../api/contract/target.js'
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
        checkTargetName: ''
      },
      tableData: [

      ],
      tableHeader: [{
        prop: 'checkTypeName',
        label: '检测类别',
        width: 180
      }, {
        prop: 'checkTargetName',
        label: '检测指标',
        width: 180
      }, {
        prop: 'checkFunName',
        label: '检测方法',
        width: 400
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
      this.fromValiData.packageId = this.params.id
      getPackQueryListPackItem(this.fromValiData).then(res => {
        this.tableData = res.result
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
    handleDelete (row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getPackDelPackItem({ids: row.id}).then(res => {
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
    doSearch () {
      this.getListData()
    },
    doReset (formName) {
      this.$refs[formName].resetFields()
      this.getListData()
    }
  },
  mounted () {
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
