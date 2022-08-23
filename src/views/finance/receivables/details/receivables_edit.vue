<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="100">
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber } from '@/utils/public.js'
import {
  getCrmAccountsReceivableAdd,
  getCrmAccountsReceivableModify
} from '@/api/finance/receivables.js'
export default {
  props: {
    params: Object,
    receivableData: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
        accountsTime: [
          { required: true, message: '请填写应收时间', trigger: 'change' }
        ],
        accountsMoney: [
          { required: true, message: '请填写应收金额', trigger: 'change' },
          { validator: TwoNumber, trigger: 'change' }
        ],
        accountsType: [
          { required: true, message: '请选择收款类型', trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          prop: 'accountsType',
          label: '应收款类型',
          type: 'select',
          data: [{ name: '预付款', id: '1' }, { name: '项目款', id: '2' }],
          isRqd: true
        },
        {
          prop: 'accountsTime',
          label: '应收款时间',
          type: 'date',
          isRqd: true
        },
        {
          prop: 'accountsMoney',
          label: '应收款金额',
          type: 'input',
          isRqd: true
        },
        {
          prop: 'accountsAccountEstimate',
          label: '正常账龄',
          type: 'date',
          isShow: true
        },
        {
          prop: 'remarks',
          label: '备注',
          type: 'textarea'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.fromValiData.id) {
        getCrmAccountsReceivableModify(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$parent.$parent.getReturnedData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      } else {
        getCrmAccountsReceivableAdd(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      }
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData.custId = this.params.custId
      this.fromValiData.contId = this.params.id
    } else {
      this.fromValiData = this.receivableData
      this.fromItemList.forEach(item => {
        if (item.prop === 'accountsAccountEstimate') {
          item.isShow = false
        }
        if (item.prop === 'accountsType') {
          item.disabled = true
        }
        if (item.prop === 'accountsTime') {
          item.disabled = true
        }
        if (item.prop === 'accountsMoney') {
          item.disabled = true
        }
      })
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
