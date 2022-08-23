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
import spcEdit from './spc_edit.vue'
import {
  getSubContDetailQuerySubCont,
  getSubContDetailDelSubContInfoDetailByIds
} from '../../../api/verity/contractVerity.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      tableData: [],
      tableHeader: [
        {
          prop: 'checkCompany',
          label: '承接单位',
          width: 90
        },
        {
          prop: 'price',
          label: '分包金额',
          width: 90
        },
        {
          prop: 'targetDetail',
          label: '分包内容',
          width: 90
        },
        {
          prop: 'startTime',
          label: '开始日期',
          width: 90
        },
        {
          prop: 'endTime',
          label: '结束日期',
          width: 90
        }
      ],
      button: {
        width: 150,
        buttonList: [
          { name: '编辑', type: 'primary', click: 'handleEdit' },
          { name: '删除', type: 'danger', click: 'handleDelete' }
        ]
      },
      multipleSelection: [],
      projectTypeData: [] // 项目类型
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getSubContDetailQuerySubCont(this.fromValiData)
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
    handleAdd() {
      // 根绝合同id去获取合同任务中的点位列表
      this.$layer.iframe({
        content: {
          content: spcEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            addParams: this.params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加任务明细',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit(params) {
      // 根绝合同id去获取合同任务中的点位列表
      this.$layer.iframe({
        content: {
          content: spcEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑任务明细',
        maxmin: true,
        shadeClose: false
      })
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getSubContDetailDelSubContInfoDetailByIds({ ids: row.id }).then(
            res => {
              that.$message({
                type: 'success',
                message: '删除成功'
              })
              that.getListData()
            }
          )
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
    }
  },
  mounted() {
    this.getListData()
  },
  created() {
    this.fromValiData.contId = this.params.contId
    this.fromValiData.father = this.params.id
    if (this.params.contStatus === '07') {
      this.button.buttonList.forEach(xdd => {
        if (xdd.name === '删除' || xdd.name === '编辑') {
          xdd.disabled = true
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
