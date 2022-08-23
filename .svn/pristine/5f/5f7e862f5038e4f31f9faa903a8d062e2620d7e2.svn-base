<!--报告收款 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
        <template v-if="boxshow">
      <template slot="other">
        <el-form-item label="报告完成时间:">
          <el-date-picker v-model="times" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px">
          </el-date-picker>
        </el-form-item>
      </template>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        </template>
        <!-- <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-edit" @click="handlelAllEdit()">批量编辑</el-button> -->
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :isSelection="false"  :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import details2 from '../../report/edit/details.vue'
import edit from './edit.vue'
import allEdit from './allEdit.vue'
import {
  getReportCollectionTaskQueryPageData,
  getReportCollectionTaskDelReportCollectionTaskByIds,
  getReportCollectionTaskAddOrModify,
  getCrmAccountsReceivableReportEstablish
} from '@/api/finance/collection.js'
import { getContractQueryContractById } from '@/api/contract/msg.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      boxshow: false,
      dateData: null,
      times: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        proName: '',
        reportNo: '',
        status: '0'
      },
      fromData: [
        { type: 'input', prop: 'proName', label: '项目名称' },
        { type: 'input', prop: 'reportNo', label: '报告编号' },
        {
          type: 'select',
          prop: 'status',
          label: '状态',
          data: [
            { id: '0', name: '待处理' },
            { id: '2', name: '待确认' },
            { id: '1', name: '已完成' },
            { id: '4', name: '待确认(已到时间)' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'custName',
          label: '客户名称',
          width: 120
        },
        {
          prop: 'proName',
          label: '项目名称',
          type: 'view',
          width: 150,
          condition: function(params) {
            if (params.taskLev === '2') {
              return '#E6A23C'
            } else if (params.taskLev === '3') {
              return 'red'
            }
          }
        },
        {
          prop: 'contNo',
          label: '合同编号',
          width: 90
        },
        {
          prop: 'contNoPrice',
          label: '合同金额',
          width: 60
        },
        {
          prop: 'reportMoney',
          label: '报告金额',
          width: 60
        },
        {
          prop: 'unknownMoney',
          label: '未核算合同金额',
          width: 90
        },
        {
          prop: 'sumReportNo',
          label: '报告任务数',
          width: 60
        },
        {
          prop: 'noSumReportNo',
          label: '未出报告份数',
          width: 80
        },
        {
          prop: 'reportNo',
          label: '报告编号',
          type: 'view2',
          width: 90
        },
        {
          prop: 'startTime',
          label: '报告完成日期',
          width: 90
        }
      ],
      button: {
        width: 120,
        buttonList: [
          {
            name: '完成',
            type: 'primary',
            click: 'handleAdd',
            condition: params => {
              if (params.status === '2') {
                return true
              }
            }
          },
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
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
      getReportCollectionTaskQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            xdd.unknownMoney = xdd.contNoPrice - xdd.actualReportNoMoney
            xdd.noSumReportNo = xdd.sumReportNo - xdd.actualSumReportNo
            xdd.ifskName = xdd.ifsk === '1' ? '是' : '否'
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
    // handlelAllEdit() {
    //   if (this.multipleSelection.length === 0) {
    //     this.$share.message('请先勾选要编辑的列表数据', 'warning')
    //     return
    //   }
    //   let ids = { id: '' }
    //   this.multipleSelection.forEach(xdd => {
    //     ids.id += xdd.id + ','
    //   })
    //   ids.id = ids.id.substring(0, ids.id.length - 1)
    //   this.$layer.iframe({
    //     content: {
    //       content: allEdit, // 传递的组件对象
    //       parent: this, // 当前的vue对象
    //       data: {
    //         params: ids
    //       } // props
    //     },
    //     area: this.$layer_Size.Normal,
    //     title: '批量编辑',
    //     maxmin: true,
    //     shadeClose: false
    //   })
    // },
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
    // 创建应收账款
    handleAdd(params) {
      this.$confirm('此操作将创建应收账款并完成收款, 是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        getCrmAccountsReceivableReportEstablish(params).then(res => {
          if (res.code === 0) {
            params.status = '1'
            getReportCollectionTaskAddOrModify(params).then(res => {
              this.$share.message()
              this.getListData()
            })
          }
        })
      })
    },
    handleFinish(params) {
      if (params.reportMoney === null || params.reportMoney === '') {
        this.$share.message('请先编辑报告金额', 'warning')
        return
      }
      this.$confirm('此操作将完成收款, 是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          params.status = '1'
          getReportCollectionTaskAddOrModify(params).then(res => {
            this.$message({
              type: 'success',
              message: '收款成功'
            })
            this.getListData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消收款'
          })
        })
    },
    handleDetails(params) {
      getContractQueryContractById({ contId: params.contId }).then(res => {
        this.$layer.iframe({
          content: {
            content: details, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: res.result,
              secret: true
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
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getReportCollectionTaskDelReportCollectionTaskByIds({
            ids: row.id
          }).then(res => {
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
    doSearch() {
      this.fromValiData.startTimeRange = this.times[0]
      this.fromValiData.endTimeRange = this.times[1]
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.times = []
      delete this.fromValiData.startTimeRange
      delete this.fromValiData.endTimeRange
      this.fromValiData.pageNow = 1
      this.status = '0'
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    }
  },
  mounted() {
    if (this.$route.query.status === '4') {
      this.fromValiData.status = '4'
    }
    this.getListData()
  },
  created() {
    let a = Date()
    this.dateData = Date.now(a)
  }
}
</script>

<style scoped lang="scss">
</style>
