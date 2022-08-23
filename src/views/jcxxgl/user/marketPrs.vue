<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <el-form-item label="销售员名字:" prop="sellerName">
        <el-input v-model="fromValiData.sellerName" placeholder=""/>
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
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    @handleSizeChange="handleSizeChange"
    customHeight="450"></tableItem>
  </div>
</template>

<script>
import userList from '../../common/user_list.vue'
import {getUserQueryBackOffice, getUserAddBackOffice, getUserDelBackOffice} from '../../../api/jcxxgl/user.js'
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
        pageSize: '10',
        pageNow: '1',
        sellerName: '',
        office: this.params.mobile
      },
      tableData: [

      ],
      tableHeader: [{
        prop: 'sellerName',
        label: '销售名字',
        width: 200
      }, {
        prop: 'office',
        label: '内勤手机',
        width: 200
      }, {
        prop: 'seller',
        label: '销售手机',
        width: 200
      }],
      button: {
        width: 250,
        buttonList: [
          {name: '删除', type: 'danger', click: 'handleDelete'}
        ]
      },

      multipleSelection: [],
      steps: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getUserQueryBackOffice(this.fromValiData).then(res => {
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
          content: userList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            id: this.params.id
          }// props
        },
        area: this.$layer_Size.Max,
        title: '添加人员',
        maxmin: true,
        shadeClose: false
      })
    },
    getSteps (params) {
      let ids = []
      params.forEach(xdd => {
        ids.push({
          office: this.params.mobile,
          seller: xdd.mobile,
          sellerName: xdd.name
        })
      })
      getUserAddBackOffice(ids).then(res => {
        this.getListData()
      })
    },
    doSearch () {
      this.fromValiData.pageNow = '1'
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = '1'
      this.$refs[formName].resetFields()
      this.getListData()
    },
    handleDelete (row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getUserDelBackOffice({ids: row.id}).then(res => {
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
