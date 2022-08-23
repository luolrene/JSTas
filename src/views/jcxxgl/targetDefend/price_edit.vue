<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import {validateNumber} from '@/utils/public.js'
import {getTargetPriceAddOrModifyData} from '../../../api/jcxxgl/targetDefend.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
        name: [{ required: true, message: '请填写指标名称', trigger: 'blur' }],
        price: [
          { required: true, message: '请填写指标价格', trigger: 'change' }, { validator: validateNumber, trigger: 'change' }
        ],
        discountAble: [{ required: true, message: '请选择是否折扣', trigger: 'blur' }],
        isOut: [{ required: true, message: '请选择是否分包', trigger: 'blur' }]
      },
      fromItemList: [
        {label: '上级项目', prop: 'fatherName', value: '', type: 'input', isRqd: false, disabled: true, placeholder: ' '},
        {label: '指标名称', prop: 'name', value: '', type: 'input', isRqd: true},
        {label: '指标价格', prop: 'price', value: '', type: 'input', isRqd: true, placeholder: '元'},
        {label: '是否折扣',
          prop: 'discountAble',
          value: '',
          type: 'radio',
          isRqd: true,
          data: [
            {label: '1', name: '是'},
            {label: '0', name: '否'}
          ]},
        {label: '是否分包',
          prop: 'isOut',
          value: '',
          type: 'radio',
          isRqd: true,
          data: [
            {label: '1', name: '是'},
            {label: '0', name: '否'}
          ]},
        {label: '备注', prop: 'exp', value: '', type: 'input', isRqd: false}
      ]
    }
  },
  methods: {
    onSubmit (formName) {
      this.btnLoading = true
      if (this.fromValiData.id) {
        getTargetPriceAddOrModifyData(this.fromValiData).then(res => {
          this.$layer.close(this.layerid)
          this.$parent.editTree(this.fromValiData)
          this.$parent.getListData(this.fromValiData.father)
          this.$share.message()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      } else {
        getTargetPriceAddOrModifyData(this.fromValiData).then(res => {
          this.$layer.close(this.layerid)
          let ids = {}
          ids.name = this.fromValiData.name
          ids.father = this.fromValiData.father
          ids.exp = this.fromValiData.exp
          ids.id = res.result
          this.$parent.appendTree(ids)
          this.$parent.getListData(this.fromValiData.father)
          this.$share.message()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      }
    }
  },
  mounted () {
    this.fromValiData = this.params
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
