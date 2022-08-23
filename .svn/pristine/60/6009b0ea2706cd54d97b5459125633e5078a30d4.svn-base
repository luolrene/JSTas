
<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="80" >
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
          label: '产量提成',
          prop: 'yield',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '产值提成',
          prop: 'outputValue',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '态度提成',
          prop: 'attitude',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '质量提成',
          prop: 'quality',
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

<style scoped lang='scss'>
</style>
