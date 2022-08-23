<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules"
      :labelWidth="100"></fromItem>
  </div>
</template>

<script>
import {getContTaskCopyPoint} from '../../../api/contract/task.js'
import {validateNumber} from '../../../utils/public.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        newPointName: '',
        copyNum: 1
      },
      rules: {
        newPointName: [
          { required: true, message: '请填写新点位名称', trigger: 'blur' }
        ],
        copyNum: [
          { required: true, message: '请填写复制数量', trigger: 'blur' },
          {validator: validateNumber, trigger: 'change'}
        ]
      },
      fromItemList: [
        {label: '新点位名称', prop: 'newPointName', value: '', type: 'input', isRqd: true},
        {label: '复制数量', prop: 'copyNum', value: '', type: 'input', isRqd: true, number: true}
      ]
    }
  },
  methods: {
    onSubmit (formName) {
      this.fromValiData.pointId = this.params.id ? this.params.id : this.params.pointId
      getContTaskCopyPoint(this.fromValiData).then(res => {
        this.$parent.getListData()
        this.$share.message('复制成功', 'success')
        this.$layer.close(this.layerid)
      })
    }
  },
  mounted () {
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
