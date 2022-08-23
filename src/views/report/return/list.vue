<!-- 角色信息管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :button="button"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :pageSize="50"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import details2 from '../edit/details.vue'
import edit from '../edit/edit.vue'
import returnReport from '../edit/return.vue'
import generateList from '../edit/generate_list.vue'
import {
  getReportEditQueryPageList,
  getReportEditCommitToCheck
} from '../../../api/report/edit.js'
import { getContractQueryContractById } from '../../../api/contract/msg.js'
export default {
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        status: '2',
        isCheck: '0'
      },
      fromData: [{ type: 'input', prop: 'reportNo', label: '报告编号' }],
      tableData: [],
      tableHeader: [
        {
          prop: 'proName',
          label: '项目名称',
          type: 'view',
          width: 180,
          condition: function(params) {
            if (params.taskLev === '2') {
              return '#E6A23C'
            } else if (params.taskLev === '3') {
              return 'red'
            }
          }
        },
        {
          prop: 'reportNo',
          label: '报告编号',
          type: 'view2',
          width: 90
        },
        {
          prop: 'custName',
          label: '客户名称',
          width: 90
        },
        {
          prop: 'statusName',
          label: '状态',
          width: 90
        }
      ],
      button: {
        width: 180,
        buttonList: [
          {
            name: '报告生成',
            type: 'primary',
            click: 'handleGenerate',
            condition: params => {
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          },
          {
            name: '提交审核',
            type: 'primary',
            click: 'handleReview',
            condition: params => {
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          },
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: function(params) {
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          },
          {name: '退回',
            type: 'primary',
            click: 'handleReturn',
            condition: function (params) {
              if (params.status === '0' || params.status === '2') {
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
      getReportEditQueryPageList(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.status) {
              case '0':
                xdd.statusName = '待编辑'
                break
              case '1_1':
                xdd.statusName = '一审审核中'
                break
              case '1_2':
                xdd.statusName = '二审审核中'
                break
              case '2':
                xdd.statusName = '退回'
                break
              case '3':
                xdd.statusName = '审核通过'
                break
              case '4':
                xdd.statusName = '变更审核'
                break
            }
            if (xdd.returnReason !== null && xdd.returnReason !== '') {
              xdd.statusName = xdd.statusName + '( ' + xdd.returnReason + ' )'
            }
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
    handleGenerate(params) {
      this.$layer.iframe({
        content: {
          content: generateList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '报告模板列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleReturn(params) {
      this.$layer.iframe({
        content: {
          content: returnReport, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params.id,
            returnReason: params.returnReason
          }// props
        },
        area: ['600px', '400px'],
        title: '报告退回',
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
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
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
        area: ['700px', this.$layer_Size.layerSelfHeight],
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails(params) {
      getContractQueryContractById({ contId: params.contId }).then(res => {
        this.$layer.iframe({
          content: {
            content: details, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: res.result
            } // props
          },
          area: this.$layer_Size.Self_Max,
          title: '查看详情',
          maxmin: true,
          shadeClose: false
        })
      })
    },
    handleDetails2(params) {
      this.$layer.iframe({
        content: {
          content: details2, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: ['900px', this.$layer_Size.layerSelfHeight],
        title: '查看详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleReview(params, title) {
      this.$confirm('此操作将提交审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          getReportEditCommitToCheck(params).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getListData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交审核'
          })
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
