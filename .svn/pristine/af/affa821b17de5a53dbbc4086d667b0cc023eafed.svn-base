<template>
  <div class="operate-container">
    <el-descriptions class="margin-top" title="基本信息" :column="3" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          客户名称
        </template>
        {{params.name}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          行业
        </template>
        {{params.industryName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          备注
        </template>
        {{params.exp}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          所在地区
        </template>
        {{params.area}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          详细地址
        </template>
        {{params.address}}
      </el-descriptions-item>
    </el-descriptions>
    <div>
      <h4>合同任务</h4>
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
import details from '../details.vue'
import detail from '../detail.vue'
import {getCustQueryCustomerById} from '../../../../api/contract/customer.js'
import {getContractQueryPageData} from '../../../../api/contract/msg.js'
export default {
  props: {
    layerid: '',
    custId: ''
  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1
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
        prop: 'custName',
        label: '客户名称',
        width: 90,
        type: 'view2'
      }, {
        prop: 'payTypeName',
        label: '付款方式',
        width: 90
      }, {
        prop: 'mailTypeName',
        label: '寄送方式',
        width: 90
      }, {
        prop: 'proTerm',
        label: '项目期限',
        width: 90
      }, {
        prop: 'statusName',
        label: '合同状态',
        width: 90
      }],
      params: {},
      size: ''
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.custId = this.custId
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
            case '08':
              xdd.statusName = '方案录入'
              break
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
    handleDetails (params) {
      this.$layer.close(this.layerid)
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
    handleDetails2 (params) {
      this.$layer.close(this.layerid)
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
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
    getDetails () {
      let ids = {}
      ids.custId = this.custId
      getCustQueryCustomerById(ids).then(res => {
        this.params = res.result
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
    this.getListData()
    this.getDetails()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
