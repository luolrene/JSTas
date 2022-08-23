<!-- 角色信息管理 -->
<template>
  <div class="pc-container">
   <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
     <template v-if="boxshow">
       <el-form-item label="分组:" slot="other">
         <el-cascader
             v-model="groupIds"
             :options="groupOption"
             :show-all-levels="false"
             @change="getGroupChange"
             :props="props"
             :style="{width:$layer_Size.inputSelfNorWidth}"
             placeholder=""></el-cascader>
       </el-form-item>
       <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
       <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
     </template>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()">批量删除</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
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
import marketPrs from './marketPrs'
import {
  getUserQueryPageData,
  getUserDelUsers,
  getUserChangeFreeze,
  getUserFreeze,
  getUserResetPassword
} from '../../../api/jcxxgl/user.js'
import { getSysQueryDict } from '../../../api/common.js'
import { getGroupQueryAllGroupsTree } from '../../../api/jcxxgl/group.js'
import { zzData } from '@/utils/public.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      boxshow: false,

      props: {
        label: 'name',
        value: 'id',
        checkStrictly: true
      },
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        name: null,
        position: null,
        groupId: null
      },
      fromData: [
        { type: 'input', prop: 'name', label: '用户名称' },
        { type: 'select', prop: 'position', label: '职务', data: [] },
        {
          type: 'select',
          prop: 'freeze',
          label: '状态',
          data: [{ name: '冻结', id: '0' }, { name: '正常', id: '1' }]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '用户名称'
        },
        {
          prop: 'roleName',
          label: '角色'
        },
        {
          prop: 'positionName',
          label: '职务'
        },
        {
          prop: 'groupName',
          label: '分组'
        },
        {
          prop: 'lev',
          label: '用户级别'
        },
        {
          prop: 'sex',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '生日'
        },
        {
          prop: 'mobile',
          label: '电话号码'
        },
        {
          prop: 'freezeName',
          label: '状态'
        }
      ],
      button: {
        width: 280,
        buttonList: [
          {
            name: '内勤用户',
            type: 'primary',
            click: 'handleMarketPrs',
            condition: function(params) {
              if (params.positionName === '销售内勤') {
                return true
              } else {
                return false
              }
            }
          },
          { name: '重置密码', type: 'primary', click: 'handleReset' },
          {
            name: '解冻',
            type: 'primary',
            click: 'handleThaw',
            condition: function(params) {
              if (params.freeze === '0') {
                return true
              }
            }
          },
          {
            name: '冻结',
            type: 'primary',
            click: 'handleFreeze',
            condition: function(params) {
              if (params.freeze === '1') {
                return true
              }
            }
          },
          { name: '编辑', type: 'primary', click: 'handleEdit' },
          { name: '删除', type: 'danger', click: 'handleDelete' }
        ]
      },

      multipleSelection: [],
      positionData: [],
      groupOption: [],
      groupIds: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getUserQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.freeze) {
            case '0':
              xdd.freezeName = '冻结'
              break
            case '1':
              xdd.freezeName = '正常'
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
    getGroupListData() {
      getGroupQueryAllGroupsTree().then(res => {
        this.groupOption = zzData(res.result)
      })
    },
    getGroupChange(params) {
      this.fromValiData.groupId = params[params.length - 1]
    },

    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.groupIds = []
      this.fromValiData.groupId = null
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            dictData: this.positionData
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            dictData: this.positionData
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleMarketPrs(params) {
      this.$layer.iframe({
        content: {
          content: marketPrs, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '添加内勤人员',
        maxmin: true,
        shadeClose: false
      })
    },
    handleReset(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将重置密码为初始密码, 是否继续?',
        type: 'success',
        confirm: function() {
          let ids = {}
          ids.ids = params.userId
          getUserResetPassword(ids).then(res => {
            that.getListData()
            that.$share.message('重置成功', 'success')
          })
        }
      })
    },
    handleThaw(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将解除账号冻结状态, 是否继续?',
        type: 'success',
        confirm: function() {
          let ids = {}
          ids.ids = params.userId
          getUserChangeFreeze(ids).then(res => {
            that.getListData()
            that.$share.message('解除成功', 'success')
          })
        }
      })
    },
    handleFreeze(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将账号设置为冻结状态, 是否继续?',
        type: 'success',
        confirm: function() {
          let ids = {}
          ids.ids = params.userId
          getUserFreeze(ids).then(res => {
            that.getListData()
            that.$share.message('设置成功', 'success')
          })
        }
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getUserDelUsers({ id: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
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
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getdictData() {
      getSysQueryDict({ type: 'ZW' }).then(res => {
        this.positionData = res.result
        this.fromData.forEach(xdd => {
          if (xdd.prop === 'position') {
            xdd.data = this.positionData
          }
        })
      })
    }
  },
  mounted() {
    this.getListData()
    this.getdictData()
    this.getGroupListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
