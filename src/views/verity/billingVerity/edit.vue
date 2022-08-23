<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="110">
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber } from '@/utils/public.js'
import { getCrmBillIngIssue } from '@/api/client/verity.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        billMoney: '',
        billTime: ''
      },
      rules: {
        billMoney: [
          { required: true, message: '请填写开票金额', trigger: 'blur' },
          { validator: TwoNumber, trigger: 'change' }
        ],
        billTime: [
          { required: true, message: '请填写开票时间', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '开票金额',
          prop: 'billMoney',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '开票时间',
          prop: 'billTime',
          value: '',
          type: 'date',
          isRqd: true
        }
      ]
    }
  },

  methods: {
    onSubmit() {
      this.btnLoading = true
      getCrmBillIngIssue(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
