<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules"></fromItem>
  </div>
</template>

<script>
import choIndustry from './choIndustry.vue'
import {getCustAddOrModifyCust} from '../../../api/contract/customer.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    // const reg = /[^\u4e00-\u9fa5]/
    // var Validator = (rule, value, callback) => {
    //   if (reg.test(value)) {
    //     return callback(new Error('客户名称必须为纯汉字'))
    //   }
    //   callback()
    // }
    return {
      btnLoading: false,
      fromValiData: {
        id: null,
        industryName: '',
        type: '2',
        properlyCode: ''
      },
      rules: {
        name: [
          {required: true, message: '请填写客户名称', trigger: 'blur'}
          // { validator: Validator, required: true, trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请选择所在地区', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择客户类别', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ],
        industryName: [
          { required: true, message: '请选择行业', trigger: 'change' }
        ]
      },
      fromItemList: [
        {label: '客户名称', prop: 'name', value: '', type: 'input', isRqd: true},
        {label: '所在地区', prop: 'area', value: '', type: 'cascader_city', isRqd: true, click: 'handleChange'},
        {label: '详细地址', prop: 'address', value: '', type: 'input', isRqd: true},
        {label: '客户类别',
          prop: 'type',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {name: '个人/政府', id: '1'},
            {name: '企业', id: '2'}
          ]},
        {label: '社会统一信用代码', prop: 'properlyCode', value: '', type: 'input', isRqd: true, labelWidth: '140'},
        {label: '园区', prop: 'industrialPark', value: '', type: 'input', isRqd: true},
        {label: '行业', prop: 'industryName', value: '', type: 'inputChoice', isRqd: true, click: 'getIndustry'},
        {label: '备注', prop: 'exp', value: '', type: 'input', isRqd: false}
      ]
    }
  },
  watch: {
    'fromValiData.type': {
      deep: true,
      handler: function (newV, oldV) {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'properlyCode') {
            if (newV === '1') {
              xdd.isShow = true
            } else {
              xdd.isShow = false
            }
          }
        })
      }
    }
  },
  methods: {
    onSubmit (formName) {
      if (this.fromValiData.type === '2' && (this.fromValiData.properlyCode === '')) {
        this.$share.message('请填写社会统一信用代码', 'warning')
        return
      }
      if (this.fromValiData.type === '1') {
        this.fromValiData.properlyCode = ''
      }
      this.fromValiData.creater = this.$store.getters.userInfo.mobile
      this.btnLoading = true
      getCustAddOrModifyCust(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    },
    handleChange (value) {
      this.fromValiData.province = value[0]
      this.fromValiData.city = value[1]
      this.fromValiData.area = value[2]
    },
    getIndustry () {
      this.$layer.iframe({
        content: {
          content: choIndustry, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {

          }// props
        },
        area: this.$layer_Size.Max,
        title: '选择行业',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted () {
    if (this.params) {
      this.fromValiData = this.params

      if (this.fromValiData.type === '' || this.fromValiData.type === null) {
        this.fromValiData.type = '2'
        this.fromValiData.properlyCode = ''
      } else {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'properlyCode') {
            xdd.disabled = true
          }
        })
      }
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
