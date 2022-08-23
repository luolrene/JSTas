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
import {getIndusAddOrModifyIndustry} from '../../../api/jcxxgl/msgDefend.js'
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
          { required: true, message: '请填写行业名称', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {label: '上级行业', prop: 'fatherName', value: '', type: 'input', isRqd: false, disabled: true, placeholder: ' '},
        {label: '行业名称', prop: 'name', value: '', type: 'input', isRqd: true},
        {label: '备注', prop: 'exp', value: '', type: 'input', isRqd: false}
      ]
    }
  },
  methods: {
    onSubmit (formName) {
      this.btnLoading = true
      if (this.fromValiData.id) {
        getIndusAddOrModifyIndustry(this.fromValiData).then(res => {
          this.$layer.close(this.layerid)
          this.$parent.editTree(this.fromValiData)
          this.$parent.getListData(this.fromValiData.father)
          this.$share.message()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      } else {
        getIndusAddOrModifyIndustry(this.fromValiData).then(res => {
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
