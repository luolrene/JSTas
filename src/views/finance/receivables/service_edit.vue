<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" >
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber } from '../../../utils/public.js'
import {
  getCrmServiceChargeGetDataByContId,
  getCrmServiceChargeAdd,
  getCrmServiceChargeModify
} from '../../../api/finance/receivables.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
        reporting: [
          { required: true, message: '请填写报备金额', trigger: 'change' },
          { validator: TwoNumber, trigger: 'change' }
        ],
        // reportingContainTax: [
        //   { required: true, message: '请填写含税金额', trigger: 'change' },
        //   { validator: TwoNumber, trigger: 'change' }
        // ],
        // reportingWrongTax: [
        //   { required: true, message: '请填写不含税金额', trigger: 'blur' },
        //   { validator: TwoNumber, trigger: 'change' }
        // ],
        reportingActual: [
          { required: true, message: '请填写实际金额', trigger: 'blur' },
          { validator: TwoNumber, trigger: 'change' }
        ]
      },
      fromItemList: [
        { label: '报备金额', prop: 'reporting', type: 'input', isRqd: true },
        // { label: '报备含税金额', prop: 'reportingContainTax', type: 'input', isRqd: true },
        // { label: '报备不含税金额', prop: 'reportingWrongTax', type: 'input', isRqd: true },
        {
          label: '实际金额',
          prop: 'reportingActual',
          type: 'input',
          isRqd: true
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.fromValiData.id) {
        getCrmServiceChargeModify(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      } else {
        getCrmServiceChargeAdd(this.fromValiData)
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
    // 获取数据
    getData() {
      getCrmServiceChargeGetDataByContId(this.fromValiData).then(res => {
        if (res.result !== null) this.fromValiData = res.result
      })
    }
  },
  mounted() {
    this.fromValiData.contId = this.params.id
    this.fromValiData.custId = this.params.custId
    this.getData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
