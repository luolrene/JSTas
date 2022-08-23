<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="110">
    </fromItem>
  </div>
</template>

<script>
import {
  getCustBackOfficeOffice,
  getCustBackOfficeTransfe
} from '@/api/client/info.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data() {
    // data: ''
    return {
      btnLoading: false,
      fromValiData: {
        mobilePhone: null,
        custId: null,
        seller: '',
        sellerName: ''
      },
      rules: {
        sellerName: [
          { required: true, message: '请选择移交用户名称', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '移交用户名称',
          prop: 'sellerName',
          value: '',
          type: 'select',
          isRqd: true,
          data: []
        }
      ]
    }
  },

  methods: {
    onSubmit() {
      this.btnLoading = true
      this.fromValiData.mobilePhone = JSON.parse(
        JSON.stringify(this.fromValiData)
      ).sellerName
      getCustBackOfficeTransfe(this.fromValiData)
        .then(res => {
          this.$parent.getListData()
          this.$layer.close(this.layerid)
          this.$share.message()
          this.btnLoading = false
        })
        .catch(() => {
          this.btnLoading = false
        })
    },
    getSellerName() {
      getCustBackOfficeOffice({}).then(res => {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'sellerName') {
            xdd.data = []
            res.result.forEach(arc => {
              xdd.data.push({
                id: arc.seller,
                name: arc.sellerName
              })
            })
          }
        })
      })
    }
  },
  mounted() {
    this.fromValiData.custId = this.params.id
  },
  created() {
    this.getSellerName()
  }
}
</script>
<style scoped lang="scss">
</style>
