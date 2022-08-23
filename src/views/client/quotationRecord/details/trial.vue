<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules"
      submitName="试算">
    </fromItem>
  </div>
</template>

<script>
import { validateNumber } from '@/utils/public.js'
export default {
  props: {
    offerId: String,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
        offerPriceType: [{ required: true, message: '请选择试算类型', trigger: 'change' }],
        resultNum: [
          { required: true, message: '请填写值', trigger: 'blur' },
          { validator: validateNumber, trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          label: '试算类型',
          prop: 'offerPriceType',
          value: '',
          type: 'select',
          isRqd: true,
          data: [{ name: '金额', id: '1' }, { name: '折扣', id: '2' }]
        },
        {label: '值', prop: 'resultNum', value: '', type: 'input', isRqd: true}
      ],
      host: process.env.BASE_API + process.env.JS_Server
    }
  },
  methods: {
    onSubmit (formName) {
      window.open(
        this.host +
          '/CrmOfferPoint/trial?' +
          'offerId=' + this.fromValiData.offerId +
          '&token=' + this.$store.getters.userInfo.token +
          '&offerPriceType=' + this.fromValiData.offerPriceType +
          '&resultNum=' + this.fromValiData.resultNum
      )
      console.log(this.host +
          '/CrmOfferPoint/trial?' +
          'offerId=' + this.fromValiData.offerId +
          '&token=' + this.$store.getters.userInfo.token +
          '&offerPriceType=' + this.fromValiData.offerPriceType +
          '&resultNum=' + this.fromValiData.resultNum)
    }
  },
  mounted () {
    this.fromValiData.offerId = this.offerId
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
