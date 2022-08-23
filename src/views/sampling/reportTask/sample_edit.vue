<!-- 修改样品编号-->
<template>
  <div class="operate-container">
   <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :label-width="110"
      :btnLoading="btnLoading"
      :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import {validateNumber} from '../../../utils/public.js'
import {getSamplingTaskAddOrModifySampNo} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    layerid: '',
    params: Object,
    workType: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {

      },
      rules: {
        custPointNo: [{ required: true, message: '请填写点位编号', trigger: 'blur' }],
        jd: [
          { required: true, message: '请填写经度', trigger: 'change' },
          {validator: validateNumber, trigger: 'change'}
        ],
        wd: [
          { required: true, message: '请填写纬度', trigger: 'change' },
          {validator: validateNumber, trigger: 'change'}
        ]
      },
      fromItemList: [
        {label: '点位编号', prop: 'custPointNo', value: '', type: 'input', isRqd: true},
        {label: '经度', prop: 'jd', value: '', type: 'input', isRqd: true},
        {label: '纬度', prop: 'wd', value: '', type: 'input', isRqd: true}
      ]
    }
  },
  methods: {
    onSubmit () {
      this.btnLoading = true
      getSamplingTaskAddOrModifySampNo(this.fromValiData).then(res => {
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

  },
  created () {
    this.fromValiData = this.params
    this.fromValiData.workType = '2'
  }
}
</script>

<style scoped lang="scss">

</style>
