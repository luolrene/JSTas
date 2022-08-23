<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :rules="rules"
      :btnLoading="btnLoading"
      :labelWidth="100">
    </fromItem>
  </div>
</template>

<script>
import { getPathAddOrModifyPath } from '../../../api/jcxxgl/exmProcess.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        isDefault: '1'
      },
      rules: {
        name: [
          { required: true, message: '请填写主流程名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择审核类别', trigger: 'change' }
        ],
        runType: [
          { required: true, message: '请选择审核方式', trigger: 'change' }
        ],
        used: [{ required: true, message: '请选择是否启用', trigger: 'change' }]
      },
      fromItemList: [
        {
          label: '主流程名称',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '审核类别',
          prop: 'type',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            { id: '1', name: '普通合同' },
            { id: '2', name: '合同变更(金额不变)' },
            { id: '3', name: '合同变更(金额变化)' },
            { id: '4', name: '外包合同' },
            { id: '5', name: '招投标审核' },
            { id: '6', name: '开票信息审核' },
            { id: '7', name: '报价记录审核(含咨询)' },
            { id: '8', name: '报价记录审核(不含咨询)' }
          ]
        },
        {
          label: '审核方式',
          prop: 'runType',
          value: '',
          type: 'radio',
          isRqd: true,
          data: [{ label: '1', name: '个人' }, { label: '0', name: '职务' }]
        },
        {
          label: '是否默认',
          prop: 'isDefault',
          value: '',
          type: 'radio',
          isRqd: true,
          data: [{ label: '1', name: '是' }, { label: '0', name: '否' }]
        },
        {
          label: '是否启用',
          prop: 'used',
          value: '',
          type: 'radio',
          isRqd: true,
          data: [{ label: '1', name: '是' }, { label: '0', name: '否' }]
        },
        { label: '备注', prop: 'exp', value: '', type: 'input', isRqd: false }
      ]
    }
  },
  methods: {
    onSubmit(formName) {
      this.btnLoading = true
      getPathAddOrModifyPath(this.fromValiData)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
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
