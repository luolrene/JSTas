<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :isSelection="false" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import verity from './verity.vue'
import detail from './detail.vue'
import {
  getCrmResponsibilityQueryPageData,
  getCrmResponsibilityDelLaCrmTrackIds
} from '@/api/client/verity.js'
export default {
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        handle: null
      },
      fromData: [
        {
          type: 'select',
          prop: 'handle',
          label: '处理结果',
          data: [
            { name: '待审批', id: '1' },
            { name: '通过', id: '2' },
            { name: '退回', id: '3' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'createUserName',
          label: '申请人',
          width: 90
        },
        {
          prop: 'content',
          label: '客户名称',
          width: 90,
          type: 'view'
        },
        {
          prop: 'applyType',
          label: '申请类型',
          width: 90
        },
        {
          prop: 'contactsName',
          label: '申请联系人',
          width: 90
        },
        {
          prop: 'contactsMobile',
          label: '申请联系人电话',
          width: 90
        },
        {
          prop: 'createTime',
          label: '申请时间',
          width: 90
        },
        {
          prop: 'handleName',
          label: '处理结果',
          width: 90
        }
      ],
      button: {
        buttonList: [
          {
            name: '审批',
            type: 'primary',
            click: 'handleVerity',
            condition: params => {
              if (
                params.handle === 1 &&
                Number(this.$store.getters.userInfo.lev) > 1
              ) {
                return true
              }
            }
          },
          {
            name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: params => {
              if (
                params.handle === 2 ||
                (params.handle === 3 &&
                  Number(this.$store.getters.userInfo.lev) === 10)
              ) {
                return true
              }
            }
          }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmResponsibilityQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.handleRemarks) {
              case null:
                xdd.handleRemarks = ''
            }
            switch (xdd.handle) {
              case 1:
                xdd.handleName = '待审批'
                break
              case 2:
                xdd.handleName = '通过'
                break
              case 3:
                xdd.handleName = '退回' + '  ' + '(' + xdd.handleRemarks + ')'
                break
            }
          })
          let newData = res.result.pageList.filter(xdd => {
            return xdd.sum === xdd.sumNow
          })
          this.tableData = newData
          this.fromValiData.dataSum = newData.length
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleVerity(params) {
      this.$layer.iframe({
        content: {
          content: verity, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '审核',
        maxmin: true,
        shadeClose: false
      })
    },

    // 批量删除
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
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    // 单行删除
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getCrmResponsibilityDelLaCrmTrackIds({ ids: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
    },
    // getSelectable(row, index) {
    //   if (row.handle === 1) {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
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
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
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
