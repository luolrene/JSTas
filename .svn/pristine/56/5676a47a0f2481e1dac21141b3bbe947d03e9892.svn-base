<!-- 应收账款 -->
<template>
  <div class="pc-container">
    <div class="btn">
      <el-button size="small"  @click="changeDetail" class="btn1" >详细版</el-button>
      <el-button size="small" @click="changeType" class="btn1" >精简版</el-button>
    </div>
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
      <template slot="other">
        <el-form-item label="应收账款时间:">
          <el-date-picker v-model="collectTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="回款时间:">
          <el-date-picker v-model="comeBackTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px">
          </el-date-picker>
        </el-form-item>
      </template>
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-download" v-if="type===2" @click="standUpload()">台账导出</el-button>
       <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <majorTable :obj="this" :loading="loading" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" @handleSizeChange="handleSizeChange"  v-if="type===1"></majorTable>
    <tableItem :obj="this" :tableData="tableData1" :tableHeader="tableHeader1" :dataSum='fromValiData.dataSum1' :button="button2" :loading="loading" @handleSizeChange="handleSizeChange1"  v-if="type===2"></tableItem>
  </div>
</template>

<script>
import details from './details.vue'
import majorTable from './major_table.vue'
import custDetails from '../../client/info/details.vue' // 客户信息
import constDetails from '../../contract/msg/details.vue' // 项目信息
import { getCustQueryPageData } from '@/api/client/info.js'
import {
  getCrmAccountsReceivableCustQueryPageData,
  getContUpdateAccountsReceivableState,
  getCrmAccountsReceivableContractQueryPageData
} from '@/api/finance/receivables.js'
export default {
  props: {
    layerid: ''
  },
  components: {
    majorTable
  },
  data() {
    return {
      loading: false,
      boxshow: false,
      collectTime: [],
      activeColor: '#000',
      type: 1,
      comeBackTime: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        state: '',
        project: null,
        custName: null,
        taskName: null
      },
      fromData: [
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'project', label: '合同名称' },
        { type: 'input', prop: 'contNo', label: '合同编号' },
        {
          type: 'select',
          prop: 'state',
          label: '合同状态',
          data: [
            { name: '全部', id: '' },
            { name: '已激活', id: '1' },
            { name: '已开票', id: '3' },
            { name: '已完成', id: '4' }
          ]
        }
      ],
      tableData: [],
      tableData1: [],
      tableHeader: [
        {
          prop: 'name',
          label: '客户名称',
          type: 'view',
          width: 120,
          condition: function(params) {
            if (params.taskLev === '2') {
              return '#E6A23C'
            } else if (params.taskLev === '3') {
              return 'red'
            }
          }
        },
        {
          prop: 'managerUserNames',
          label: '市场经理',
          width: 150
        },
        {
          prop: 'managerGroupNames',
          label: '市场经理部门',
          width: 120
        },
        {
          prop: 'region',
          label: '区域',
          width: 150
        },
        {
          prop: 'address',
          label: '通信地址',
          width: 150
        }
      ],
      tableHeader1: [
        {
          prop: 'custName',
          label: '客户名称',
          type: 'view',
          width: 140
        },
        {
          prop: 'project',
          label: '合同名称',
          type: 'view2',
          width: 140
        },
        {
          prop: 'contNo',
          label: '合同编号',
          width: 120
        },
        {
          prop: 'sellerName',
          label: '经办人',
          width: 120
        },
        {
          prop: 'price',
          label: '合同签订金额',
          width: 120
        },
        {
          prop: 'actualMoney',
          label: '应收总金额',
          width: 100
        },
        {
          prop: 'accountsMoneyAlready',
          label: '已回款金额',
          width: 100
        },
        {
          prop: 'noAccountsMoneyAlready',
          label: '未回款金额',
          width: 100
        },
        // {
        //   prop: 'crmBillingStateName',
        //   label: '是否已开票',
        //   width: 100,
        //   // type: 'view2'
        // },
        {
          prop: 'billMoney',
          label: '开票总金额',
          width: 100
        },
        {
          prop: 'sumReportNo',
          label: '应出报告任务数',
          width: 120
        },
        {
          prop: 'alreadyIssue',
          label: '已出报告数',
          width: 100
        },
        {
          prop: 'endTime',
          label: '合同完成时间',
          width: 120
        },
        {
          prop: 'expOne',
          label: '备注',
          width: 150
        }
      ],
      button: {
        width: 200,
        buttonList: []
      },
      button2: {
        width: 200,
        buttonList: [
          {
            name: '应收信息',
            type: 'primary',
            click: 'handleReceivableInfo1'
          }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    // 完成
    handleAccomplish(params) {
      this.$confirm('此操作将完成收款, 是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        let obj = {}
        obj.id = params.id
        obj.custId = params.custId
        getContUpdateAccountsReceivableState(obj).then(res => {
          this.$share.message()
          this.getListData()
        })
      })
    },
    // 应收信息
    handleReceivableInfo(params) {
      this.$layer.iframe({
        content: {
          content: details, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            client: this.$children[3].clientData
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '应收信息',
        maxmin: true,
        shadeClose: false
      })
    },
    // 应收信息
    handleReceivableInfo1(params) {
      this.$layer.iframe({
        content: {
          content: details, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            type: 1
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '应收信息',
        maxmin: true,
        shadeClose: false
      })
    },
    getListData() {
      this.loading = true
      getCrmAccountsReceivableCustQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            xdd.region = xdd.province + '/' + xdd.city + '/' + xdd.area
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
    // 获取详情数据
    getTypeData() {
      this.loading = true
      getCrmAccountsReceivableContractQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            if (!xdd.actualMoney) {
              xdd.actualMoney = 0
            }
            xdd.noAccountsMoneyAlready =
              xdd.actualMoney - xdd.accountsMoneyAlready
            xdd.region = xdd.province + '/' + xdd.city + '/' + xdd.area
          })
          this.tableData1 = res.result.pageList
          this.fromValiData.dataSum1 = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    doSearch() {
      this.fromValiData.collectStartTime = this.collectTime[0]
      this.fromValiData.collectEndTime = this.collectTime[1]
      this.fromValiData.comeBackStartTime = this.comeBackTime[0]
      this.fromValiData.comeBackEndTime = this.comeBackTime[1]
      this.fromValiData.pageNow = 1
      if (this.type === 1) {
        this.getListData()
      } else {
        this.getTypeData()
      }
    },
    doReset(formName) {
      this.collectTime = []
      this.comeBackTime = []
      delete this.fromValiData.collectStartTime
      delete this.fromValiData.collectEndTime
      delete this.fromValiData.comeBackStartTime
      delete this.fromValiData.comeBackEndTime
      delete this.fromValiData.custId
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.fromValiData.state = ''
      if (this.type === 1) {
        this.getListData()
      } else {
        this.getTypeData()
      }
    },
    // 台账导出
    standUpload() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = { id: '' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      window.open(
        process.env.BASE_API +
          process.env.JS_Server +
          '/CrmAccountsReceivable/download?' +
          'ids=' +
          ids.id +
          '&' +
          'token=' +
          this.$store.getters.userInfo.token
      )
    },

    handleDetails(params) {
      let obj = {}
      obj.pageSize = 1
      obj.pageNow = 1
      obj.id = params.custId
      let custData = {}
      getCustQueryPageData(obj)
        .then(res => {
          custData = res.result.pageList[0]
        })
        .then(() => {
          this.$layer.iframe({
            content: {
              content: custDetails, // 传递的组件对象
              parent: this, // 当前的vue对象
              data: {
                params: custData
              } // props
            },
            area: this.$layer_Size.Self_Max,
            title: '客户信息',
            maxmin: true,
            shadeClose: false
          })
        })
    },
    handleDetails2(params) {
      this.$layer.iframe({
        content: {
          content: constDetails, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            client: this.clientData
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '合同信息',
        maxmin: true,
        shadeClose: false
      })
    },
    changeDetail() {
      this.type = 1
      this.fromValiData.pageSize = 10
      this.getListData()
    },
    changeType() {
      this.type = 2
      this.fromValiData.pageSize = 10
      this.getTypeData()
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    handleSizeChange1(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getTypeData()
    }
  },
  mounted() {
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
.btn {
  margin: 10px 0;
  text-align: left;
  .el-button {
    font-size: 16px;
  }
}
</style>
