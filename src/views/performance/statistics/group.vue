<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="118" submitName="确认">
    </fromItem>
  </div>
</template>

<script>
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {},
      fromItemList: [
        {
          label: '总报告数',
          prop: 'groupSum',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '部门总绩效',
          prop: 'groupQuota',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '部门总报告金额',
          prop: 'groupReportedAmount',
          value: '',
          type: 'input',
          disabled: true
        }

      ]
    }
  },

  methods: {
    onSubmit() {
      this.$layer.close(this.layerid)
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
