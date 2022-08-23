<!-- 组织机构管理 -->
<template>
  <div class="pc-container">
    <el-form :model="fromValiData" label-width="80" inline class="list-form" ref="fromValiData">
        <el-form-item label="机构名称:" prop="keyWord">
            <el-input v-model="fromValiData.keyWord"/>
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
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import edit from './edit.vue'
import {getOrgQueryPageData, getOrgDelOrg} from '../../../api/jcxxgl/org.js'
export default {
  components: {

  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        keyWord: null
      },
      tableData: [

      ],
      tableHeader: [{
        prop: 'name',
        label: '机构名称',
        width: 250
      }, {
        prop: 'exp',
        label: '备注',
        width: 250
      }],
      button: {
        width: 250,
        buttonList: [
          {name: '编辑', type: 'primary', click: 'handleEdit'},
          {name: '删除', type: 'danger', click: 'handleDelete'}
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getOrgQueryPageData(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
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
    handleAdd () {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {

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
          getOrgDelOrg({ids: row.id}).then(res => {
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

  }
}
</script>

<style scoped lang="scss">

</style>
