<template>
  <div class="operate-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="未读消息" name="first">
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :isPage="false" :button="button"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="已读消息" name="second">
        <tableItem :obj="this" :tableData="tableData2" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :isPage="false" :button="button"></tableItem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import detail from './detail.vue'
import { getMsgQueryPageList, getMsgDelMsgs } from '@/api/home/home.js'
export default {
  inject: ['reload'],
  data() {
    return {
      loading: false,
      activeName: 'first',
      fromValiData: {
        pageSize: 99,
        pageNow: 1
      },
      tableData: [],
      tableData2: [],
      tableHeader: [
        {
          prop: 'title',
          label: '标题',
          width: 90
        },

        {
          prop: 'detail',
          label: '内容',
          width: 120,
          type: 'view'
        }
      ],
      button: {
        width: 180,
        buttonList: [
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
      getMsgQueryPageList(this.fromValiData)
        .then(res => {
          if (res.result.pageList) {
            this.tableData = res.result.pageList.filter(item => {
              return item.isRead === '0'
            })
            this.tableData2 = res.result.pageList.filter(item => {
              return item.isRead === '1'
            })
            res.result.pageList.forEach(xdd => {
              if (xdd.isRead === '0') {
                this.fromValiData.dataSum = res.result.dataSum
              } else {
                this.fromValiData.dataSum2 = res.result.dataSum
              }
            })
            this.loading = false
          }
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
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
          getMsgDelMsgs({ ids: row.id }).then(res => {
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
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            secret: true
          } // props
        },
        area: this.$layer_Size.No,
        title: '内容详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleClick(tab, event) {}
  },
  mounted() {
    this.getListData()
  },
  created() {},
  destroyed() {
    this.reload()
  }
}
</script>

<style scoped lang="scss">
</style>
