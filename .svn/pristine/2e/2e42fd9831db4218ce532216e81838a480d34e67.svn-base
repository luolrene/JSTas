<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules"
      :labelWidth="120"></fromItem>
  </div>
</template>

<script>
import {getMainTaskAddOrModifyTask} from '../../../api/sampling/majorTask.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {

      },
      rules: {
        taskName: [
          {required: true, message: '请填写主任务名称', trigger: 'blur'}
        ],
        startTime: [
          {required: true, message: '请选择任务开始时间', trigger: 'blur'}
        ]
      },
      fromItemList: [
        {label: '项目名称', prop: 'proName', value: '', type: 'input', disabled: true},
        {label: '合同编号', prop: 'contNo', value: '', type: 'input', disabled: true},
        {label: '主任务名称', prop: 'taskName', value: '', type: 'input', isRqd: true},
        {label: '任务开始时间', prop: 'startTime', value: '', type: 'date', isRqd: true},
        {label: '客户名称', prop: 'custName', value: '', type: 'input', disabled: true},
        {label: '是否周期', prop: 'isCycleName', value: '', type: 'input', disabled: true}
      ]
    }
  },
  methods: {
    onSubmit (formName) {
      this.btnLoading = true
      getMainTaskAddOrModifyTask(this.fromValiData).then(res => {
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
