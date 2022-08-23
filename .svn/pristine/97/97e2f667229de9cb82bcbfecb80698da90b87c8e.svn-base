<!-- 合同变更 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()" v-if="isAdd">添加</el-button>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :button="button"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :isSelection="false"
    :isPage="false"></tableItem>
  </div>
</template>

<script>
import edit from './changeContEdit.vue'
import {getChangeContQueryPageList, getChangeContCommitOrGiveup} from '../../../../api/contract/msg.js'
import upload from '../../../consult/task/upload.vue'
export default {
  props: {
    params: Object
  },
  components: {

  },
  data () {
    return {
      loading: false,
      isAdd: true,

      fromValiData: {
        pageSize: 99999,
        pageNow: 1,
        isCheck: '0'
      },
      fromData: [

      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'oldMoney',
        label: '旧合同金额',
        width: 90
      }, {
        prop: 'newMoney',
        label: '新合同金额',
        width: 90
      }, {
        prop: 'oldReportTaskNum',
        label: '旧报告任务数',
        width: 90
      }, {
        prop: 'newReportTaskNum',
        label: '新报告任务数',
        width: 90
      }, {
        prop: 'hasCaseName',
        label: '是否包含方案修改',
        width: 130
      }, {
        prop: 'changeDetail',
        label: '变更描述',
        width: 90
      }, {
        prop: 'operName',
        label: '发起人',
        width: 90
      }, {
        prop: 'statusName',
        label: '状态',
        width: 90
      }, {
        prop: 'startTime',
        label: '开始时间',
        width: 160
      }, {
        prop: 'checkTime',
        label: '审核时间',
        width: 160
      }],
      button: {
        width: 320,
        buttonList: [
          {name: '提交审核',
            type: 'primary',
            click: 'handleReview',
            condition: (params) => {
              if ((params.status === '0' || params.status === '3') && this.$store.getters.userInfo.name === params.operName) {
                return true
              }
            }
          },
          {name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: (params) => {
              if ((params.status === '0' || params.status === '3') && this.$store.getters.userInfo.name === params.operName) {
                return true
              }
            }
          },
          {name: '上传附件',
            type: 'primary',
            click: 'handleUpload',
            condition: (params) => {
              if ((params.status === '0' || params.status === '3') && this.$store.getters.userInfo.name === params.operName) {
                return true
              }
            }
          },
          {name: '放弃',
            type: 'primary',
            click: 'handleGiveUP',
            condition: (params) => {
              if ((params.status === '0' || params.status === '1' || params.status === '2' || params.status === '3') && this.$store.getters.userInfo.name === params.operName) {
                return true
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.contId = this.params.id
      this.isAdd = true
      getChangeContQueryPageList(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '0':
              xdd.statusName = '草稿'
              break
            case '1':
              xdd.statusName = '审核中'
              break
            case '2':
              xdd.statusName = '审核通过'
              break
            case '3':
              xdd.statusName = '审核退回'
              break
            case '4':
              xdd.statusName = '放弃'
              break
            case '5':
              xdd.statusName = '完成'
              break
          }
          switch (xdd.hasCase) {
            case '1':
              xdd.hasCaseName = '是'
              break
            case '0':
              xdd.hasCaseName = '否'
          }
          if (xdd.status === '3' && xdd.returnReason !== null && xdd.returnReason !== '') {
            xdd.statusName = xdd.statusName + '(' + xdd.returnReason + ')'
          }
          if (xdd.status === '0' || xdd.status === '1' || xdd.status === '3') {
            this.isAdd = false
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
    handleAdd () {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
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
    handleUpload (params) {
      this.$layer.iframe({
        content: {
          content: upload, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            contId: params.contId
          } // props
        },
        area: ['700px', this.$layer_Size.layerSelfHeight],
        title: '附件上传',
        maxmin: true,
        shadeClose: false
      })
    },
    handleReview (params, title) {
      this.$confirm('此操作将提交审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        let ids = params
        ids.status = '1'
        getChangeContCommitOrGiveup(ids).then(res => {
          this.$message({
            type: 'success',
            message: '提交审核成功'
          })
          this.getListData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交审核'
        })
      })
    },
    handleGiveUP (params) {
      this.$confirm('此操作将放弃合同, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        let ids = params
        ids.status = '4'
        getChangeContCommitOrGiveup(ids).then(res => {
          this.$message({
            type: 'success',
            message: '放弃成功'
          })
          this.getListData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消放弃'
        })
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
