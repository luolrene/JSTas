<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="90">
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber } from '@/utils/public.js'
import {
  getCrmAccountsReceivableTakeBackAdd,
  getCrmAccountsReceivableTakeBackModify
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
        takeBackTime: [
          { required: true, message: '请填写回款时间', trigger: 'change' }
        ],
        takeBackMoney: [
          { required: true, message: '请填写回款金额', trigger: 'change' },
          { validator: TwoNumber, trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          prop: 'takeBackMoney',
          label: '回款金额',
          type: 'input',
          isRqd: true
        },
        {
          prop: 'takeBackTime',
          label: '回款时间',
          type: 'date',
          isRqd: true
        },
        {
          prop: 'remark',
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
        getCrmAccountsReceivableTakeBackModify(this.fromValiData)
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
        getCrmAccountsReceivableTakeBackAdd(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$parent.$parent.getListData()
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
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
