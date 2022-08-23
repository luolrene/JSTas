<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules"
      :labelWidth="110">
    </fromItem>
  </div>
</template>

<script>
import {validateNumber} from '@/utils/public.js'
import {getCrmOfferPointAddOrModifyTarget} from '@/api/client/quotationRecord.js'
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
        targetName: [{ required: true, message: '请填写点位名称', trigger: 'blur' }],
        checkDays: [
          { required: true, message: '请填写检测天数', trigger: 'change' }, { validator: validateNumber, trigger: 'change' }
        ],
        pc: [
          { required: true, message: '频次(次/天)', trigger: 'change' }, { validator: validateNumber, trigger: 'change' }
        ]
      },
      fromItemList: [
        {label: '指标名称', prop: 'targetName', value: '', type: 'input', isRqd: true},
        {label: '指标系统单价', prop: 'targetSysPrice', value: '', type: 'input', isRqd: true, disabled: true},
        {label: '检测天数', prop: 'checkDays', value: '', type: 'input', isRqd: true},
        {label: '频次(次/天)', prop: 'pc', value: '', type: 'input', isRqd: true}
      ]
    }
  },
  methods: {
    onSubmit (formName) {
      this.btnLoading = true
      getCrmOfferPointAddOrModifyTarget(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.fromValiData.name = this.fromValiData.targetName
        this.$parent.editTree(this.fromValiData)
        this.$parent.getListData(this.fromValiData.father)
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    }
  },
  mounted () {
    this.fromValiData = {...this.params}
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
