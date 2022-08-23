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
// import { getReportTaskUpdateReportTargetFun } from '../../../api/sampling/reportTask.js'
export default {
  props: {
    multipleSelection: Array,
    targetData: Array,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
        funName: [
          { required: true, message: '请选择检测方法', trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          label: '检测方法',
          prop: 'funName',
          value: 'funId',
          type: 'select',
          isRqd: true,
          data: this.targetData
        }
      ]
    }
  },
  methods: {
    onSubmit(formName) {
      this.targetData.forEach(xdd => {
        if (xdd.id === this.fromValiData.funId) {
          this.fromValiData.oper = xdd.oper
          this.fromValiData.operName = xdd.operName
        }
      })
      this.$parent.getPlanEdit(this.fromValiData).then(res => {
        if (res) {
          this.$share.message('修改成功')
          this.$layer.close(this.layerid)
        }
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
