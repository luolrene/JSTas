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
import inputPerson from '../../common/input_person.vue'
import {getReportJdAddOper} from '../../../api/jcxxgl/nodeDefend.js'
export default {
  props: {
    addParams: Object,
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        operName: '',
        operMobile: '',
        jdNo: '',
        jdNoName: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写角色名称', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {label: '负责人姓名', prop: 'operName', value: '', type: 'inputChoice', isRqd: true, click: 'clickOper'},
        {label: '负责人手机', prop: 'operMobile', value: '', type: 'input', disabled: true},
        {label: '节点名称', prop: 'jdNoName', value: '', type: 'input', disabled: true}
      ]
    }
  },
  methods: {
    onSubmit () {
      this.btnLoading = true
      getReportJdAddOper(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    },
    clickOper () {
      this.$layer.iframe({
        content: {
          content: inputPerson, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {

          }// props
        },
        area: this.$layer_Size.Max,
        title: '选择负责人',
        maxmin: true,
        shadeClose: false
      })
    },
    getPerson (params) {
      return new Promise((resolve, reject) => {
        this.fromValiData.operName = params.name
        this.fromValiData.operMobile = params.mobile
        console.log(params)
        resolve(true)
      })
    }
  },
  mounted () {
    console.log(this.addParams)
    if (this.params) {
      this.fromValiData = this.params
    } else if (this.addParams) {
      this.fromValiData.jdNo = this.addParams.jdNo
      this.fromValiData.jdNoName = this.addParams.jdNoName
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
