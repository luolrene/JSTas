<!-- 编辑采样任务-->
<template>
  <div class="operate-container">
   <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :label-width="110"
      :btnLoading="btnLoading"
      :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import {getSamplingTaskAddOrModifySamplingTask} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    layerid: '',
    addParams: Object,
    params: Object
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        custName: '',
        proName: ''
      },
      rules: {
        name: [{ required: true, message: '请填写监测计划', trigger: 'blur' }],
        xmlxName: [{ required: true, message: '请选择项目类型', trigger: 'change' }]
      },
      fromItemList: [
        {label: '采样任务名称', prop: 'name', value: '', type: 'input', isRqd: true},
        {label: '客户名称', prop: 'custName', value: '', type: 'input', disabled: true},
        {label: '报告编号', prop: 'reportNo', value: '', type: 'input', disabled: true},
        {label: '项目名称', prop: 'proName', value: '', type: 'input', disabled: true},
        {label: '是否周期', prop: 'isCycleName', value: '', type: 'input', disabled: true}
      ]
    }
  },
  methods: {
    onSubmit () {
      this.btnLoading = true
      getSamplingTaskAddOrModifySamplingTask(this.fromValiData).then(res => {
        this.$parent.getListData()
        this.$layer.close(this.layerid)
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    }
  },
  mounted () {

  },
  created () {
    if (this.addParams) {
      this.fromValiData.contId = this.addParams.contId
      this.fromValiData.custId = this.addParams.custId
      this.fromValiData.custName = this.addParams.custName
      this.fromValiData.mainId = this.addParams.mainId
      this.fromValiData.reportNo = this.addParams.reportNo
      this.fromValiData.proName = this.addParams.proName
      this.fromValiData.type = this.addParams.type
      this.fromValiData.isCycle = this.addParams.isCycle
      this.fromValiData.isCycleName = this.addParams.isCycleName
    }
    if (this.params) {
      this.fromValiData = this.params
    }
  }
}
</script>

<style scoped lang="scss">

</style>
