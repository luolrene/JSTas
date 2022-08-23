<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :rules="rules"
      :btnLoading="btnLoading"
      :labelWidth="100">
    </fromItem>
  </div>
</template>

<script>
import {getReportMailTaskAddOrModify} from '../../../api/report/send.js'
import {validateNumber} from '../../../utils/public.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
        courier: [{ required: true, message: '请填写快递公司', trigger: 'blur' }],
        mailNo: [{ required: true, message: '请填写快递单号', trigger: 'blur' }],
        money: [
          {validator: validateNumber, trigger: 'change'}
        ]
      },
      fromItemList: [
        {label: '项目名称', prop: 'proName', type: 'input', disabled: true},
        {label: '报告编号', prop: 'reportNo', type: 'input', disabled: true},
        {label: '客户名称', prop: 'custName', type: 'input', disabled: true},
        {label: '快递公司',
          prop: 'courier',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '顺丰', name: '顺丰'},
            {id: '圆通', name: '圆通'},
            {id: '申通', name: '申通'},
            {id: '中通', name: '中通'},
            {id: '韵达', name: '韵达'},
            {id: '百世', name: '百世'},
            {id: '其他', name: '其他'}
          ]},
        {label: '快递公司名称', prop: 'courierName', value: '', type: 'input', isShow: true},
        {label: '快递单号', prop: 'mailNo', value: '', type: 'input', isRqd: true},
        {label: '快递金额', prop: 'money', value: '', type: 'input', isRqd: true},
        {label: '备注', prop: 'exp', value: '', type: 'input'}
      ]
    }
  },
  watch: {
    'fromValiData.courier': {
      handler (val, oldVal) {
        if (val === '其他') {
          this.fromItemList.forEach(xdd => {
            if (xdd.prop === 'courierName') {
              xdd.isShow = false
            }
          })
        } else {
          this.fromItemList.forEach(xdd => {
            if (xdd.prop === 'courierName') {
              xdd.isShow = true
            }
          })
        }
      },
      deep: true // true 深度监听
    }
  },
  methods: {
    onSubmit (formName) {
      if (this.fromValiData.courier !== '其他') {
        this.fromValiData.courierName = ''
      }
      this.btnLoading = true
      getReportMailTaskAddOrModify(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    }
  },
  mounted () {
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
