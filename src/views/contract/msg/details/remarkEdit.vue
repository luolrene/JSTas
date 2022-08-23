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
import {getContractRemarksAddRemarks} from '../../../../api/contract/msg.js'
export default {
  props: {
    addParams: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
        remarks: [
          { required: true, message: '请填写备注', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {label: '备注', prop: 'remarks', value: '', type: 'input', isRqd: true}
      ]
    }
  },
  methods: {
    onSubmit () {
      this.fromValiData.contId = this.addParams.id
      this.btnLoading = true
      getContractRemarksAddRemarks(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
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

  }
}
</script>

<style scoped lang="scss">

</style>
