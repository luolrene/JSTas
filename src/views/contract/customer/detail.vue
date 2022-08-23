<template>
  <div class="operate-container contractDetail">
    <el-descriptions class="margin-top" title="基本信息" :column="3" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          客户名称
        </template>
        {{details.name}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          行业
        </template>
        {{details.industryName}}
      </el-descriptions-item>
      <el-descriptions-item label-class-name="my-label">
        <template slot="label">
          合同总额
        </template>
        {{details.contMoney}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          所在地区
        </template>
        {{details.area}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          详细地址
        </template>
        {{details.address}}
      </el-descriptions-item>
      <el-descriptions-item label-class-name="my-label">
        <template slot="label">
          生产总额
        </template>
        {{details.factMoney}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          客户类别
        </template>
        {{details.typeName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          社会统一信用代码
        </template>
        {{details.properlyCode}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          备注
        </template>
        {{details.exp}}
      </el-descriptions-item>
    </el-descriptions>
    <div>
      <h4>合同信息</h4>
      <tableItem
      :obj="this"
      :tableData="tableData"
      :tableHeader="tableHeader"
      :dataSum='fromValiData.dataSum'
      :loading="loading"
      :isSelection="false"
      @handleSizeChange="handleSizeChange"></tableItem>
    </div>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import {getContractQueryPageData} from '../../../api/contract/msg.js'
import {getCustQueryMoney} from '../../../api/contract/customer.js'
import {keepTwoDecimalFull} from '../../../utils/public.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        custName: null,
        project: null
      },
      tableData: [

      ],
      tableHeader: [{
        prop: 'project',
        label: '项目名称',
        type: 'view',
        width: 180,
        condition: function (params) {
          if (params.taskLev === '2') {
            return '#E6A23C'
          } else if (params.taskLev === '3') {
            return 'red'
          }
        }
      }, {
        prop: 'plateName',
        label: '项目板块',
        width: 90
      }, {
        prop: 'projectTypeName',
        label: '项目类型',
        width: 90
      }, {
        prop: 'price',
        label: '合同金额',
        width: 90
      }, {
        prop: 'factMoney',
        label: '生产总额',
        width: 90
      }, {
        prop: 'statusName',
        label: '合同状态',
        width: 90
      }],
      size: '',
      details: {}
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.custId = this.details.id
      getContractQueryPageData(this.fromValiData).then(res => {
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
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleDetails (params) {
      this.$layer.iframe({
        content: {
          content: details, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '查看详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted () {
    this.details = JSON.parse(JSON.stringify(this.params))
    this.details.typeName = this.details.type === '1' ? '个人/政府' : '企业'
    this.getListData()

    getCustQueryMoney({custId: this.details.id}).then(res => {
      this.details.contMoney = res.result.contMoney
      this.details.factMoney = res.result.factMoney
    })
  },
  created () {

  }
}
</script>

<style lang="scss">
  .contractDetail{
    .my-label {
      background-color: #E1F3D8 !important;
    }
  }
</style>
