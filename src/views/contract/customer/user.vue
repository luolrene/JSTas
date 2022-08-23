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
import {getCustQueryContacts, getCustDelContacts} from '../../../api/contract/customer.js'
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

      },
      tableData: [

      ],
      tableHeader: [{
        prop: 'name',
        label: '联系人姓名'
      }, {
        prop: 'position',
        label: '职务'
      }, {
        prop: 'mobile',
        label: '手机号'
      }, {
        prop: 'email',
        label: '邮箱'
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
      this.fromValiData.custId = this.params.id
      getCustQueryContacts(this.fromValiData).then(res => {
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
          content: userAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            id: this.params.id
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
          content: userAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '新增联系人',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete (row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getCustDelContacts({ids: row.id}).then(res => {
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

  }
}
</script>

<style scoped lang="scss">

</style>
