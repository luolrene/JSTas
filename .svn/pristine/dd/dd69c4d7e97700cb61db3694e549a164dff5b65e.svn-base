<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules"></fromItem>
  </div>
</template>

<script>
import {getReportTaskUpdateReportTargetFun} from '../../../api/sampling/reportTask.js'
export default {
  props: {
    multipleSelection: Array,
    targetData: Array,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {

      },
      rules: {
        funName: [{ required: true, message: '请选择检测方法', trigger: 'change' }]
      },
      fromItemList: [
        {label: '检测方法', prop: 'funName', value: 'funId', type: 'select', isRqd: true, data: this.targetData}
      ]
    }
  },
  methods: {
    onSubmit (formName) {
      this.btnLoading = true
      let ids = {reportTargetIds: ''}
      ids.funId = this.fromValiData.funId
      this.multipleSelection.forEach(xdd => {
        ids.reportTargetIds += xdd.reportTargetId + ','
      })
      ids.reportTargetIds = ids.reportTargetIds.substring(0, ids.reportTargetIds.length - 1)
      getReportTaskUpdateReportTargetFun(ids).then(res => {
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
