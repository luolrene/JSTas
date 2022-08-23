<!-- 方案列表 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <el-form-item>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()">批量删除</el-button>
      </el-form-item>
    </el-form>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :button="button"
    customHeight="450"
    @handleSizeChange="handleSizeChange"
    @getCellClick="getCellClick"></tableItem>
  </div>
</template>

<script>
import planEdit from './plan_edit.vue'
import planDetail from '../task/plan_detail.vue'
import {getContProgramQueryPageData, getContProgramDelPrograms, getContProgramAddOrModifyProgram} from '../../../api/contract/msg.js'
export default {
  props: {
    layerid: '',
    params: Object
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
        prop: 'name',
        label: '方案名称',
        type: 'view'
      }, {
        prop: 'statusName',
        label: '状态'
      }, {
        prop: 'exp',
        label: '备注'
      } ],
      button: {
        width: 120,
        buttonList: [
          {name: '提交',
            type: 'primary',
            click: 'handleReview',
            condition: (params) => {
              if (params.status === '0' || params.status === '4') {
                return true
              }
            }},
          {name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: (params) => {
              if (params.status === '0' || params.status === '4') {
                return true
              }
            }
          },
          {name: '删除', type: 'danger', click: 'handleDelete'}
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getContProgramQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '0':
              xdd.statusName = '初始'
              break
            case '1':
              xdd.statusName = '待处理'
              break
            case '2':
              xdd.statusName = '完成'
              break
            case '3':
              xdd.statusName = '放弃'
              break
            case '4':
              xdd.statusName = '退回'
              break
          }
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleDetails (params) {
      this.$layer.iframe({
        content: {
          content: planDetail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Min,
        title: '附件',
        maxmin: true,
        shadeClose: false
      })
    },
    handleReview (params) {
      let index = '此操作将提交方案, 是否继续?'
      this.$confirm(index, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        params.status = '1'
        getContProgramAddOrModifyProgram(params).then(res => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.getListData()
          this.$parent.getListData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交审核'
        })
      })
    },
    handleAdd () {
      this.$layer.iframe({
        content: {
          content: planEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            addParams: this.params
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
          content: planEdit, // 传递的组件对象
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
        message: '此操作将删除方案, 是否继续?',
        confirm: function () {
          getContProgramDelPrograms({ids: row.id}).then(res => {
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
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
      this.$refs[formName].resetFields()
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
      this.$parent.getSellerData(params)
      this.$layer.close(this.layerid)
    }
  },
  mounted () {
    this.fromValiData.contId = this.params.id
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
