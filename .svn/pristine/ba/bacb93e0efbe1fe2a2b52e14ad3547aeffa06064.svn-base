<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import { validateNumber } from '../../../utils/public.js'
import { getReportCollectionTaskAddOrModify } from '../../../api/finance/collection.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        ifsk: '1'
      },
      rules: {
        reportMoney: [
          { required: true, message: '请填写报告金额', trigger: 'change' },
          { validator: validateNumber, trigger: 'change' }
        ],
        ifsk: [
          { required: true, message: '请选择是否收款', trigger: 'change' }
        ],
        skDate: [{ required: true, message: '请选择收款日期', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '报告金额', prop: 'reportMoney', type: 'input', isRqd: true },
        {
          label: '是否收款',
          prop: 'ifsk',
          type: 'radio',
          isRqd: true,
          data: [{ label: '1', name: '是' }, { label: '0', name: '否' }]
        },
        { label: '收款日期', prop: 'skDate', type: 'date', isRqd: true }
      ],

      positionData: []
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getReportCollectionTaskAddOrModify(this.fromValiData)
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
    if (this.params) {
      this.fromValiData.id = this.params.id
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
