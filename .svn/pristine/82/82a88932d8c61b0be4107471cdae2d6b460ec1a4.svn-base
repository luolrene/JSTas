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
import {validateNumber} from '@/utils/public.js'
import {getAreaPriceAddOrModifyData} from '@/api/jcxxgl/areaPrice.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {

      },
      rules: {
        area: [{ required: true, message: '请选择所在区域', trigger: 'blur' }],
        carPrice: [{ required: true, message: '请填写车辆价格', trigger: 'change' }, { validator: validateNumber, trigger: 'change' }],
        hotelPrice: [{ required: true, message: '请填写住宿价格', trigger: 'change' }, { validator: validateNumber, trigger: 'change' }]
      },
      fromItemList: [
        {label: '所在区域', prop: 'area', value: '', type: 'cascader_city', click: 'handleChange', isRqd: true, filterable: true},
        {label: '车辆价格', prop: 'carPrice', value: '', type: 'input', isRqd: true, placeholder: '( 元 /天 )'},
        {label: '住宿价格', prop: 'hotelPrice', value: '', type: 'input', isRqd: true, placeholder: '( 元 / 天 )'}
      ]
    }
  },
  methods: {
    onSubmit () {
      this.btnLoading = true
      let ids = {...this.fromValiData}
      ids.carPrice = Number(ids.carPrice)
      ids.hotelPrice = Number(ids.hotelPrice)
      getAreaPriceAddOrModifyData(ids).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    },
    handleChange(value) {
      this.fromValiData.province = value[0]
      this.fromValiData.city = value[1]
      this.fromValiData.area = value[2]
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
