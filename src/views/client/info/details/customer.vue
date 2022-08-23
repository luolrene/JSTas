<template>
  <div class='operate-container contractDetail'>
    <el-descriptions class='margin-top' title='基本信息' :column='3' :size='size' border>
      <el-descriptions-item>
        <template slot='label'>
          <i class='el-icon-user'></i>
          客户名称
        </template>
        {{details.name}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          客户性质
        </template>
        {{details.typeName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          社会统一信用代码
        </template>
        {{details.properlyCode}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          上级公司名称
        </template>
        {{details.parentCustomerName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          所在地区
        </template>
        {{details.province}}-{{details.city}}-{{details.area}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          详细地址
        </template>
        {{details.address}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          客户状态
        </template>
        {{details.customerType}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          客户级别
        </template>
        {{details.importantCustomers}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          行业
        </template>
        {{details.industryName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          创建时间
        </template>
        {{details.createTime}}
      </el-descriptions-item>
      <el-descriptions-item :span='2'>
        <template slot='label'>
          备注
        </template>
        {{details.exp}}
      </el-descriptions-item>
      <el-descriptions-item >
        <template slot='label'>
          开票金额
        </template>
        {{details.billMoney}}
      </el-descriptions-item>
      <el-descriptions-item v-if="secret || this.$store.getters.userInfo.lev>4" label-class-name='my-label'>
        <template slot='label'>
          合同总额
        </template>
        {{details.contMoney}}
      </el-descriptions-item>
      <el-descriptions-item v-if="secret || this.$store.getters.userInfo.lev>4" label-class-name='my-label'>
        <template slot='label'>
          生产总额
        </template>
        {{details.factMoney}}
      </el-descriptions-item>
    </el-descriptions>

    <!-- 投标信息 -->
    <div>
      <h4>投标信息</h4>
      <tableItem :obj='this' :tableData='tableDataB' :tableHeader='tableHeaderB' :dataSum='fromValiDataB.dataSum' :loading='loading' :isSelection='false' @handleSizeChange='handleSizeChangeB'></tableItem>
    </div>
    <!-- 合同信息 -->
    <div>
      <h4>合同信息</h4>
      <tableItem :obj='this' :tableData='tableData' :tableHeader='tableHeader' :dataSum='fromValiData.dataSum' :loading='loading' :isSelection='false' @handleSizeChange='handleSizeChange'></tableItem>
    </div>

    <div class='modular' style='display: flex;align-items: center;'>
      <div class='title'>客户附件：</div>
      <div class='content'>
        <div v-if='fileList.length === 0'>无</div>
        <fileList :fileList='fileList' style='padding:0;' v-else></fileList>
      </div>
    </div>
  </div>
</template>

<script>
import fileList from '../../../common/fileList.vue'
import details from '../../../contract/msg/details.vue'
import detail from '../../../bid/bidMange/detail.vue'
import { getFileQueryFileList } from '@/api/file.js'
import { getContractQueryPageData } from '@/api/contract/msg.js'
import { getCustQueryMoney } from '@/api/contract/customer.js'
import { keepTwoDecimalFull } from '@/utils/public.js'
import { getCrmBiddingQueryPageData } from '@/api/bid/bid.js'
export default {
  components: {
    fileList
  },
  props: {
    layerid: '',
    params: Object,
    secret: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      fileList: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        custName: null,
        project: null
      },
      fromValiDataB: {
        pageSize: 10,
        pageNow: 1
      },
      tableData: [],
      tableDataB: [],

      tableHeader: [
        {
          prop: 'project',
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
          prop: 'plateName',
          label: '项目板块',
          width: 90
        },
        {
          prop: 'projectTypeName',
          label: '项目类型',
          width: 90
        },
        {
          prop: 'price',
          label: '合同金额',
          width: 90
        },
        {
          prop: 'factMoney',
          label: '生产总额',
          width: 90
        },
        {
          prop: 'statusName',
          label: '合同状态',
          width: 90
        }
      ],
      tableHeaderB: [
        {
          prop: 'opportunityName',
          label: '项目名称',
          type: 'view2',
          width: 90
        },
        {
          prop: 'fixedPrice',
          label: '项目限价',
          width: 90
        },
        {
          prop: 'startTime',
          label: '开标时间',
          width: 90
        },
        {
          prop: 'projectNodeName',
          label: '项目节点',
          width: 90
        },
        {
          prop: 'createUserName',
          label: '创建人',
          width: 90
        },
        {
          prop: 'sceneName',
          label: '招投标专员',
          width: 50
        }
      ],
      size: '',
      details: {}
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.custId = this.details.id
      this.fromValiDataB.custId = this.details.id

      // 招投标
      getCrmBiddingQueryPageData(this.fromValiDataB)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.projectNode) {
              case '0':
                xdd.projectNodeName = '编辑'
                break
              case '1':
                xdd.projectNodeName = '退回'
                break
              case '2':
                xdd.projectNodeName = '审核中'
                break
              case '3':
                xdd.projectNodeName = '文件编制'
                break
              case '4':
                xdd.projectNodeName = '现场投标'
                break
              case '5':
                xdd.projectNodeName = '已完成'
                break
            }
          })
          this.tableDataB = res.result.pageList
          this.fromValiDataB.dataSum = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
      // 合同
      getContractQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.status) {
              case '00':
                xdd.statusName = '草稿'
                break
              case '01':
                xdd.statusName = '审核中'
                break
              case '02':
                xdd.statusName = '审核通过'
                break
              case '03':
                xdd.statusName = '审核退回'
                break
              case '04':
                xdd.statusName = '放弃'
                break
              case '05':
                xdd.statusName = '已完成'
                break
              case '06':
                xdd.statusName = '进行中'
                break
              case '07':
                xdd.statusName = '变更审核'
                break
            }
            xdd.factMoney = xdd.factMoney === null ? 0 : xdd.factMoney
            xdd.factMoney = keepTwoDecimalFull(xdd.factMoney)
            xdd.price = keepTwoDecimalFull(xdd.price)
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
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: details, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '查看详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails2(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '项目详情',
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
    handleSizeChangeB(val, pageSize) {
      this.fromValiDataB.pageNow = val
      if (pageSize) {
        this.fromValiDataB.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted() {
    this.details = JSON.parse(JSON.stringify(this.params))
    switch (this.details.importantCustomers) {
      case '1':
        this.details.importantCustomers = '普通客户'
        break
      case '2':
        this.details.importantCustomers = '重点客户'
        break
      case '3':
        this.details.importantCustomers = 'VIP客户'
        break
    }
    switch (this.details.customerType) {
      case '1':
        this.details.customerType = '已有订单'
        break
      case '2':
        this.details.customerType = '从无订单'
        break
      case '3':
        this.details.customerType = '订单中断'
        break
    }
    switch (this.details.type) {
      case '1':
        this.details.typeName = '个人'
        break
      case '2':
        this.details.typeName = '政府'
        break
      case '3':
        this.details.typeName = '事业单位'
        break
      case '4':
        this.details.typeName = '私有企业'
        break
      case '5':
        this.details.typeName = '国有企业'
        break
      case '6':
        this.details.typeName = '外资企业'
        break
      case '7':
        this.details.typeName = '合资企业'
        break
    }
    this.getListData()
    getCustQueryMoney({ custId: this.details.id }).then(res => {
      this.details.contMoney = res.result.contMoney
      this.details.factMoney = res.result.factMoney
    })
    getFileQueryFileList({ id: this.params.id }).then(res => {
      this.fileList = res.result
    })
  },
  created() {}
}
</script>
<style lang='scss'>
.contractDetail {
  .my-label {
    background-color: #e1f3d8 !important;
  }
}
</style>
