<!--招标管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()" v-if="this.$store.getters.userInfo.lev === '10'">添加</el-button>
      <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="this.$store.getters.userInfo.lev === '10'">批量删除</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import edit from './edit.vue'
import {
  // getCrmProportionQueryAllGroupsTree,
  getCrmProportionQueryPageData,
  // getCrmProportionAddOrModify,
  getCrmProportionDelByIds
} from '@/api/performance/ratio.js'
export default {
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        {
          type: 'select',
          prop: 'projectType',
          label: '项目类型',
          data: [
            {
              name: '环境',
              id: '环境'
            },
            {
              name: '农业',
              id: '农业'
            },
            {
              name: '土壤',
              id: '土壤'
            }
          ]
        },
        {
          type: 'select',
          prop: 'totalType',
          label: '业务类型',
          data: [
            { name: '报告室', id: '1' },
            { name: '实验室', id: '2' },
            { name: '现场部', id: '3' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'projectType',
          label: '项目类型',
          width: 90
        },
        {
          prop: 'totalTypeName',
          label: '业务类型',
          width: 90
        },
        {
          prop: 'commissionData',
          label: '提成比例',
          width: 90
        }
      ],
      button: {
        width: 180,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (Number(this.$store.getters.userInfo.lev) === 10) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: params => {
              if (Number(this.$store.getters.userInfo.lev) === 10) {
                return true
              } else {
                return false
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmProportionQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(item => {
            if (item.totalType === '1') {
              item.totalTypeName = '报告室'
            } else if (item.totalType === '2') {
              item.totalTypeName = '实验室'
            } else if (item.totalType === '3') {
              item.totalTypeName = '现场部'
            }
            item.commissionData = item.commission + '%'
          })
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
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: ''
          }
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
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      delete this.fromValiData.projectType
      delete this.fromValiData.totalType
      this.getListData()
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
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getCrmProportionDelByIds({ ids: row.id }).then(res => {
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
    // handleDetails(params) {
    //   this.$layer.iframe({
    //     content: {
    //       content: details, // 传递的组件对象
    //       parent: this, // 当前的vue对象
    //       data: {
    //         params: params
    //       } // props
    //     },
    //     area: this.$layer_Size.Max,
    //     title: '客户详情',
    //     maxmin: true,
    //     shadeClose: false
    //   })
    // },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted() {
    // getCrmProportionQueryAllGroupsTree({}).then(res => {
    //   let arr = res.result.map(item => {
    //     return {
    //       id: item.id,
    //       name: item.name
    //     }
    //   })
    //   this.fromData[1].data = arr
    // })
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
