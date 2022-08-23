<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="80" inline class="list-form" ref="fromValiData">
      <el-form-item>
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
    customHeight="100%"
    :isPage="false"></tableItem>
  </div>
</template>

<script>
import userAdd from './user_add.vue'
import userEdit from './user_edit.vue'
import detail from '../contactManage/detail'
import { getCustDelContacts } from '@/api/contract/customer.js'
import { getCustContactsQueryPageData } from '@/api/client/info.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      loading: false,

      fromValiData: {
        pageNow: '1',
        pageSize: '999'
      },
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '联系人',
          type: 'view'
        },
        {
          prop: 'sex',
          label: '性别'
        },
        {
          prop: 'mobile',
          label: '手机号'
        },
        {
          prop: 'userNameS',
          label: '跟进人'
        }
      ],
      button: {
        width: 250,
        buttonList: [
          { name: '编辑', type: 'primary', click: 'handleEdit' },
          { name: '删除', type: 'danger', click: 'handleDelete' }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.custId = this.params.id
      getCustContactsQueryPageData(this.fromValiData)
        .then(res => {
          this.tableData = res.result.pageList
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: userAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            params: this.params,
            id: this.params.id
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加联系人',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: userEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑联系人',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getCustDelContacts({ ids: row.id }).then(res => {
            if (res.code === 0) {
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

    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '客户名称详情',
        maxmin: true,
        shadeClose: false
      })
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
