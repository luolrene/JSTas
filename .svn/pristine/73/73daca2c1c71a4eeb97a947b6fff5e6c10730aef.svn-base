<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth='135' submitName="确认">
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
          label: '上级仪器',
          prop: 'fatherName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '仪器编号',
          prop: 'yqbh',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '仪器型号',
          prop: 'yqxh',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '检测项目',
          prop: 'jcxm',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '出厂编号',
          prop: 'ccbh',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '生产厂家',
          prop: 'sccj',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '启用日期',
          prop: 'qyrq',
          value: '',
          disabled: true,
          type: 'dete'
        },
        {
          label: '单位',
          prop: 'dw',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '单价',
          prop: 'dj',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '放置地点',
          prop: 'fzdd',
          value: '',
          type: 'input',
          disabled: true
        },

        {
          label: '技术参数',
          prop: 'jscs',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '实际检定/校准单位',
          prop: 'jzdw',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '检定有效日期',
          prop: 'yxrq',
          value: '',
          type: 'data',
          disabled: true
        },
        {
          label: '溯源方式',
          prop: 'syfs',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '实际检定/校准单位',
          prop: 'jzdw',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '检定/校准证书编号',
          prop: 'jzzsbh',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '状态',
          prop: 'statusName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '启用日期',
          prop: 'qyrq',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '校准日期',
          prop: 'jzrq',
          value: '',
          type: 'input',
          disabled: true
        },

        {
          label: '有效日期',
          prop: 'yxrq',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '备注',
          prop: 'bz',
          value: '',
          type: 'textarea',
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
    console.log(this.params);

    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
