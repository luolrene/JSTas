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
import {getRoleModifyRole, getRoleAddRole} from '../../../api/jcxxgl/role.js'
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
          { required: true, message: '请填写角色名称', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {label: '角色名称', prop: 'name', value: '', type: 'input', isRqd: true},
        {label: '备注', prop: 'exp', value: '', type: 'input', isRqd: false}
      ]
    }
  },
  methods: {
    onSubmit () {
      this.btnLoading = true
      if (this.params) {
        getRoleModifyRole(this.fromValiData).then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      } else {
        getRoleAddRole(this.fromValiData).then(res => {
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
