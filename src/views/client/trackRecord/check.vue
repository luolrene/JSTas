<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="110" submitName='确定'>
    </fromItem>
  </div>
</template>

<script>
export default {
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {},
      fromItemList: [
        {
          label: '客户名称',
          prop: 'name',
          value: '',
          type: 'input',
          filterable: true,
          click: 'getCustData',
          disabled: true
        },
        {
          label: '联系人',
          prop: 'contacts',
          value: 'contactsId',
          type: 'input',
          data: [],
          disabled: true
        },
        {
          label: '跟进方式',
          prop: 'trackMode',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '拜访时间',
          prop: 'trackTime',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '跟进内容',
          prop: 'trackContent',
          value: '',
          type: 'textarea',
          disabled: true
        },
        {
          label: '跟进结果',
          prop: 'trackResult',
          value: '',
          type: 'textarea',
          disabled: true
        },
        {
          prop: 'track',
          label: '是否下次跟进',
          type: 'input',
          disabled: true
        },
        {
          label: '下次跟进时间',
          prop: 'time',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '下次提醒时间',
          prop: 'nextTime',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '下次跟进备注',
          prop: 'nextRemarks',
          value: '',
          type: 'textarea',
          disabled: true
        }
      ],
      fileList: [],
      userInfo: ''
    }
  },

  methods: {
    onSubmit() {
      this.btnLoading = true
      this.$layer.close(this.layerid)
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      this.fromValiData.name = this.params.custName
      this.fromValiData.contacts = this.params.contactsName
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
