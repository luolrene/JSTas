<!-- 客户关系 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-s-promotion" @click="handleAssign()" v-if="this.$store.getters.userInfo.lev > 1">工作指派</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :loading="loading"></tableItem>
  </div>
</template>

<script>
import edit from '../../report/edit.vue'
import details from '../../report/details'
import assignList from '../../report/assign_list.vue'
import {
  getCrmReportQueryPageData,
  getCrmReportAddOrModify
} from '@/api/client/report.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      reportTimeK: '',
      reportTimeJ: '',
      fromValiData: {
        pageNow: 1,
        pageSize: 10,
        reportTimeK: '',
        reportTimeJ: ''
      },
      fromData: [
        { type: 'input', prop: 'reportName', label: '报告名称' },
        {
          type: 'select',
          prop: 'submitType',
          label: '报告状态',
          data: [{ id: '1', name: '已提交' }, { id: '2', name: '未提交' }]
        },
        {
          type: 'select',
          prop: 'reportType',
          label: '报告类型',
          data: [
            { id: '1', name: '日报' },
            { id: '2', name: '周报' },
            { id: '3', name: '月报' },
            { id: '4', name: '季报' },
            { id: '5', name: '年报' },
            { id: '6', name: '其他' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'reportName',
          label: '报告名称',
          type: 'view',
          width: 140
        },
        {
          prop: 'reportTypeName',
          label: '报告类型',
          width: 90
        },
        {
          prop: 'submitTypeName',
          label: '报告状态',
          width: 90
        },
        {
          prop: 'reportContent',
          label: '报告内容',
          width: 90
        },
        {
          prop: 'reportTime',
          label: '报告时间',
          width: 90
        },
        {
          prop: 'createUserName',
          label: '执行人',
          width: 90
        }
      ],
      button: {
        width: 140,
        buttonList: [
          {
            name: '提交',
            type: 'primary',
            click: 'handleReview',
            condition: params => {
              if (params.submitType === '2') {
                return true
              }
            }
          },
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (params.submitType === '2') {
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
      getCrmReportQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.submitType) {
              case '1':
                xdd.submitTypeName = '已提交'
                break
              case '2':
                xdd.submitTypeName = '未提交'
                break
            }
            switch (xdd.reportType) {
              case '1':
                xdd.reportTypeName = '日报'
                break
              case '2':
                xdd.reportTypeName = '周报'
                break
              case '3':
                xdd.reportTypeName = '月报'
                break
              case '4':
                xdd.reportTypeName = '季报'
                break
              case '5':
                xdd.reportTypeName = '年报'
                break
              case '6':
                xdd.reportTypeName = '其他'
                break
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
    doSearch() {
      if (this.reportTimeK.length > 0) {
        this.fromValiData.reportTimeK = this.reportTimeK
      }
      if (this.reportTimeJ.length > 0) {
        this.fromValiData.reportTimeJ = this.reportTimeJ
      }
      this.getListData()
    },
    doReset(formName) {
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
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
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: details, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '工作报告详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleReview(params) {
      if (params.reportType === null || params.reportType === '') {
        this.$share.message('请编辑报告类型', 'warning')
        return
      }
      this.$confirm('此操作将提交报告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          let ids = JSON.parse(JSON.stringify(params))
          ids.submitType = '1'
          getCrmReportAddOrModify(ids).then(res => {
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
            message: '已取消提交'
          })
        })
    },
    handleAssign() {
      this.$layer.iframe({
        content: {
          content: assignList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Max,
        title: '工作指派',
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
