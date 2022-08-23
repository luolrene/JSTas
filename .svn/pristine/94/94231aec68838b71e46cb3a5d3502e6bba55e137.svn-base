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
import { getMachineAddOrModifyMachineType } from '../../../api/storage/equipment.js'
export default {
  props: {
    params: Object,
    layerid: '',
    type: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
        name: [
          { required: true, message: '请填写仪器名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择场地', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {label: '上级仪器', prop: 'fatherName', value: '', type: 'input', isRqd: false, disabled: true, placeholder: ' '},
        {label: '仪器名称', prop: 'name', value: '', type: 'input', isRqd: true},
        {label: '场地', prop: 'type', value: '', type: 'radio', isRqd: true, data: [{label: '1', name: '实验室'}, {label: '2', name: '现场'}, {label: '3', name: '綦江'}, {label: '4', name: '辅助'}, {label: '5', name: '玻璃管'}]}
      ]
    }
  },
  methods: {
    onSubmit () {
      if (this.fromValiData.id) {
        this.btnLoading = true
        getMachineAddOrModifyMachineType(this.fromValiData).then(res => {
          this.$layer.close(this.layerid)
          this.$parent.editTree(this.fromValiData)
          this.$parent.getListData(this.fromValiData.father)
          this.$share.message()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      } else {
        this.btnLoading = true
        getMachineAddOrModifyMachineType(this.fromValiData).then(res => {
          this.$layer.close(this.layerid)
          let ids = {}
          ids.name = this.fromValiData.name
          ids.father = this.fromValiData.father
          ids.type = this.fromValiData.type
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
    if (this.params) {
      this.fromValiData = this.params
    }
    if (this.type !== undefined && this.type !== '') {
      this.fromItemList.forEach((xdd, index) => {
        if (xdd.prop === 'type') {
          xdd.disabled = true
        }
      })
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
