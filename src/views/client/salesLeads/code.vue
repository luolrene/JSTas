<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules"
      :labelWidth="120"
    >
    </fromItem>
  </div>
</template>

<script>
import { validateNumber } from '@/utils/public.js'
import {
  getCrmSaleOpportunityImportantStandards,
  getCrmSaleOpportunityGetImportantStandard
} from '@/api/client/salesLeads.js'
export default {
  props: {
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        data: null
      },
      rules: {
        data: [
          { required: true, message: '请输入预计金额', trigger: 'blur' },
          { validator: validateNumber, trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          label: '衡量标准(金额)',
          prop: 'data',
          value: '',
          type: 'input',
          isRqd: true
        }
      ]
    }
  },

  methods: {
    onSubmit() {
      this.btnLoading = true
      getCrmSaleOpportunityImportantStandards(this.fromValiData)
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
  },
  mounted() {
    getCrmSaleOpportunityGetImportantStandard({}).then(res => {
      this.fromValiData.data = Number(res.result.code)
    })
  },
  created() {}
}
</script>
<style scoped lang="scss">
</style>
