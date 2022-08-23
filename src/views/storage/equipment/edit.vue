<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth='135'>
    </fromItem>
  </div>
</template>

<script>
import { getMachineAddOrModifyMachineItem } from '../../../api/storage/equipment.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {

      },
      fromItemList: [
        {
          label: '上级仪器',
          prop: 'fatherName',
          value: '',
          type: 'input',
          isRqd: false,
          disabled: true,
          placeholder: ' '
        },
        {
          label: '仪器编号',
          prop: 'yqbh',
          value: '',
          type: 'input'
        },
        {
          label: '仪器型号',
          prop: 'yqxh',
          value: '',
          type: 'input'
        },
        {
          label: '检测项目',
          prop: 'jcxm',
          value: '',
          type: 'input'
        },
        {
          label: '出厂编号',
          prop: 'ccbh',
          value: '',
          type: 'input'
        },
        {
          label: '生产厂家',
          prop: 'sccj',
          value: '',
          type: 'input'
        },
        {
          label: '启用日期',
          prop: 'qyrq',
          value: '',
          type: 'dete'
        },
        {
          label: '单位',
          prop: 'dw',
          value: '',
          type: 'input'
        },
        {
          label: '单价',
          prop: 'dj',
          value: '',
          type: 'input'
        },
        {
          label: '放置地点',
          prop: 'fzdd',
          value: '',
          type: 'input'
        },
        {
          label: '技术参数',
          prop: 'jscs',
          value: '',
          type: 'input'
        },
        {
          label: '实际检定/校准单位',
          prop: 'jzdw',
          value: '',
          type: 'input'
        },
        {
          label: '检定/校准日期',
          prop: 'jzrq',
          value: '',
          type: 'date'
        },
        {
          label: '检定有效日期',
          prop: 'yxrq',
          value: '',
          type: 'date'
        },
        {
          label: '溯源方式',
          prop: 'syfs',
          value: '',
          type: 'input'
        },
        {
          label: '实际检定/校准单位',
          prop: 'jzdw',
          value: '',
          type: 'input'
        },

        {
          label: '检定/校准证书编号',
          prop: 'jzzsbh',
          value: '',
          type: 'input'
        },
        {
          label: '状态',
          prop: 'status',
          value: '',
          type: 'select',
          isRqd: false,
          data: [
            { id: '0', name: '闲置' },
            { id: '1', name: '出借' },
            { id: '2', name: '预约' },
            { id: '3', name: '维修' },
            { id: '4', name: '损坏' },
            { id: '5', name: '停用' },
            { id: '6', name: '报废' },
            { id: '7', name: '送检' }
          ]
        },
        {
          label: '备注',
          prop: 'bz',
          value: '',
          type: 'textarea'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      let ids = []
      ids.push(this.fromValiData)
      this.btnLoading = true
      getMachineAddOrModifyMachineItem(ids)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData(this.fromValiData.father)
          this.$share.message()
          this.btnLoading = false
        })
        .catch(() => {
          this.btnLoading = false
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
