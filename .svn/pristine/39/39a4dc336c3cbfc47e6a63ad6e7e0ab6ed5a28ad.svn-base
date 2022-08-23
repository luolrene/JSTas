<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :rules="rules"
      :btnLoading="btnLoading"
      :labelWidth="160"
      :type="type">
    </fromItem>
  </div>
</template>

<script>
import {validateNumber} from '@/utils/public'
import {getReportFileSaveModifyData} from '@/api/report/file.js'
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
        target: [
          { required: true, message: '请填写检测项目', trigger: 'blur' }
        ],
        htNum: [
          { required: true, validator: validateNumber, trigger: 'change' }
        ],
        taskNum: [
          { required: true, validator: validateNumber, trigger: 'change' }
        ],
        checkReportNum: [
          { required: true, validator: validateNumber, trigger: 'change' }
        ],
        originalNum: [
          { required: true, validator: validateNumber, trigger: 'change' }
        ],
        otherNum: [
          { required: true, validator: validateNumber, trigger: 'change' }
        ]
      },
      fromItemList: [
        {label: '检测项目', prop: 'target', type: 'input', isRqd: true, value: ''},
        {label: '检测合同/协议(数量)', prop: 'htNum', type: 'input', isRqd: true, value: ''},
        {label: '任务通知单(数量)', prop: 'taskNum', type: 'input', isRqd: true, value: ''},
        {label: '检测报告(数量)', prop: 'checkReportNum', type: 'input', isRqd: true, value: ''},
        {label: '原始记录(数量)', prop: 'originalNum', type: 'input', isRqd: true, value: ''},
        {label: '其它相关资料(数量)', prop: 'otherNum', type: 'input', isRqd: true, value: ''}
      ],
      type:''
    }
  },
  methods: {
    onSubmit (formName) {
      this.btnLoading = true
      getReportFileSaveModifyData(this.fromValiData).then(res => {
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
    this.fromValiData = this.params
    if (this.params.status === '1') {
      this.fromItemList.forEach(xdd=>{
        xdd.disabled = true
      })
      this.type = 'not'
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
