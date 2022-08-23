<!-- 报告退回 -->
<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :rules="rules"
      submitName="确认"
      :btnLoading="btnLoading"
      :labelWidth="90">
    </fromItem>
  </div>
</template>

<script>
import {getReportEditReturnToCheck} from '../../../api/report/edit.js'
export default {
  props: {
    params: String,
    returnReason: String,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        returnReason: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择退回目标', trigger: 'blur' }
        ],
        returnReason: [
          { required: true, message: '请填写退回原因', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {label: '退回目标',
          prop: 'type',
          value: '',
          type: 'radio',
          isRqd: true,
          data: [
            {label: '1', name: '实验室'},
            {label: '2', name: '现场'},
            {label: '3', name: '现场和实验室'},
            {label: '4', name: '收样处'}
          ]},
        {label: '退回原因', prop: 'returnReason', value: '', type: 'textarea', isRqd: true, placeholder: '请填写退回原因'}
      ]
    }
  },
  methods: {
    onSubmit () {
      this.fromValiData.ids = this.params
      this.btnLoading = true
      getReportEditReturnToCheck(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message('退回成功', 'success')
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    }
  },
  mounted () {
    if (this.returnReason) {
      this.fromValiData.returnReason = this.returnReason
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
