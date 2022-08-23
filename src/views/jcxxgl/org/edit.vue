<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :rules="rules"
      :btnLoading="btnLoading"
      :labelWidth="120">
    </fromItem>
  </div>
</template>

<script>
import {getOrgModifyOrg, getOrgAddOrg} from '../../../api/jcxxgl/org.js'
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
        name: [
          { required: true, message: '请填写机构名称', trigger: 'blur' }
        ],
        sx: [
          { required: true, message: '请填写机构名称缩写', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {label: '机构名称', prop: 'name', value: '', type: 'input', isRqd: true},
        {label: '机构名称缩写', prop: 'sx', value: '', type: 'input', isRqd: true},
        {label: '备注', prop: 'exp', value: '', type: 'input', isRqd: false}
      ]
    }
  },
  methods: {
    onSubmit (formName) {
      this.fromValiData.sx = this.fromValiData.sx.toUpperCase()
      this.btnLoading = true
      if (this.params) {
        getOrgModifyOrg(this.fromValiData).then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      } else {
        getOrgAddOrg(this.fromValiData).then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      }
    }
  },
  mounted () {
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
