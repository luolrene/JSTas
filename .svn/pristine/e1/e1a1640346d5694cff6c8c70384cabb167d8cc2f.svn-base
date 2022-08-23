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
import {validateNumber} from '../../../utils/public.js'
import {getSubContDetailAddOrModifySubContDetail} from '../../../api/verity/contractVerity.js'
export default {
  props: {
    layerid: '',
    addParams: Object,
    params: Object
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {

      },
      rules: {
        checkCompany: [{ required: true, message: '请填写承接单位', trigger: 'blur' }],
        targetDetail: [{ required: true, message: '请填写分包内容', trigger: 'blur' }],
        startTime: [{ required: true, message: '请选择开始日期', trigger: 'blur' }],
        endTime: [{ required: true, message: '请选择结束日期', trigger: 'blur' }],
        price: [
          { required: true, message: '请填写分包金额', trigger: 'change' },
          {validator: validateNumber, trigger: 'change'}
        ]
      },
      fromItemList: [
        {label: '承接单位', prop: 'checkCompany', type: 'input', isRqd: true},
        {label: '分包金额', prop: 'price', type: 'input', isRqd: true},
        {label: '分包内容', prop: 'targetDetail', type: 'input', isRqd: true},
        {label: '开始日期', prop: 'startTime', value: '', type: 'date', isRqd: true},
        {label: '结束日期', prop: 'endTime', value: '', type: 'date', isRqd: true}
      ]
    }
  },
  methods: {
    onSubmit () {
      this.btnLoading = true
      getSubContDetailAddOrModifySubContDetail(this.fromValiData).then(res => {
        this.$parent.getListData()
        this.$layer.close(this.layerid)
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
    if (this.addParams) {
      this.fromValiData.contId = this.addParams.contId
      this.fromValiData.father = this.addParams.id
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
