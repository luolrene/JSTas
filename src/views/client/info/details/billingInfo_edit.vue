<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber, emailPhone } from '@/utils/public.js'
import { getCrmBillIngAdd } from '@/api/client/billingInfo.js' // 添加开票信息
import {
  getContractQueryPageData,
  getContractQueryContractById,
  getCrmBillIngGetSumMoneyByContId
} from '@/api/contract/msg.js' // 获取合同信息

export default {
  props: {
    params: Object,
    datas: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      billMoney: null,
      fromValiData: {
        contNo: '',
        noBillMoney: null
      },
      fromData: {
        pageSize: 999,
        pageNow: 1
      },
      rules: {
        custId: [
          { required: true, message: '请选择客户名称', trigger: 'blur' }
        ],
        contId: [
          { required: true, message: '请选择合同名称', trigger: 'blur' }
        ],
        billMoney: [
          { required: true, message: '请填写开票金额', trigger: 'blur' },
          { validator: TwoNumber, trigger: 'change' }
        ],
        billType: [
          { required: true, message: '请选择开票类型', trigger: 'blur' }
        ],
        emailPhone: [
          { required: true, message: '请填写电话邮箱', trigger: 'blur' },
          { validator: emailPhone, trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          label: '客户名称',
          prop: 'custName',
          value: '',
          type: 'input',
          isRqd: true,
          disabled: true
        },
        {
          label: '项目名称',
          prop: 'contId',
          value: '',
          type: 'select',
          data: [],
          filterable: true,
          isRqd: true,
          click: 'getCont'
        },
        {
          label: '合同编号',
          prop: 'contNo',
          value: '',
          type: 'input',
          disabled: true,
          isRqd: true
        },
        {
          label: '未开票金额',
          prop: 'noBillMoney',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '开票金额',
          prop: 'billMoney',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '开票类型',
          prop: 'billType',
          value: '',
          type: 'select',
          data: [
            { name: '电子普票', id: '1' },
            { name: '纸质普票', id: '2' },
            { name: '纸质专票', id: '3' }
          ],
          isRqd: true
        },
        {
          label: '手机/邮箱',
          prop: 'emailPhone',
          value: '',
          type: 'input',
          isShow: true,
          isRqd: true
        },
        {
          label: '开票备注',
          prop: 'remarks',
          value: '',
          type: 'textarea'
        },
        {
          label: '其他备注',
          prop: 'exp',
          value: '',
          type: 'textarea'
        }
      ]
    }
  },
  watch: {
    'fromValiData.billType': {
      deep: true,
      handler: function(newV, oldV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'emailPhone') {
            if (newV === '1') {
              item.isShow = false
              item.isRqd = true
            } else {
              item.isShow = true
              item.isRqd = false
            }
          }
        })
      }
    }
  },
  methods: {
    onSubmit() {
      getCrmBillIngAdd(this.fromValiData)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
        })
      // if (this.fromValiData.billMoney > this.billMoney) {
      //   let money = this.fromValiData.billMoney - this.billMoney
      //   this.$message({
      //     message: `开票金额超出未开票金额${money},未开票金额为${
      //       this.billMoney
      //     }`,
      //     duration: 5000,
      //     type: 'error'
      //   })
      // } else {
      //   getCrmBillIngAdd(this.fromValiData)
      //     .then(res => {
      //       this.$layer.close(this.layerid)
      //       this.$parent.getListData()
      //       this.$share.message()
      //       this.loading = false
      //     })
      //     .catch(err => {
      //       this.$message.error(err.message)
      //     })
      // }
    },
     getContData(item, params) {
      this.fromData.custId = params
      getContractQueryPageData(this.fromData).then(res => {
        let contData = res.result.pageList.map(item => {
          return {
            id: item.id,
            name: item.project
          }
        })
        this.fromItemList.forEach(item => {
          if (item.prop === 'contId') {
            item.data = contData
          }
        })
      })
    },
    // 获取对应合同信息及开票金额
    getCont(item, params) {
      getContractQueryContractById({ contId: params }).then(res => {
        this.fromValiData.contNo = res.result.contNo
      })
      getCrmBillIngGetSumMoneyByContId({ contId: params }).then(res => {
        this.billMoney = res.result
        this.fromValiData.noBillMoney = this.billMoney
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData.custName = this.params.name
      this.fromValiData.custId = this.params.id
      this.fromData.custId = this.params.id
      this.fromData.custName = this.params.name
      getContractQueryPageData(this.fromData).then(res => {
        let contData = res.result.pageList.map(item => {
          return {
            id: item.id,
            name: item.project
          }
        })
        this.fromItemList.forEach(item => {
          if (item.prop === 'contId') {
            item.data = contData
          }
        })
      })
    }
    if (this.datas) {
      this.fromValiData = this.datas
      this.getContData()
      
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
