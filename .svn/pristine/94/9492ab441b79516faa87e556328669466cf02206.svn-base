<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules"
      :labelWidth="110"
    >

    </fromItem>
  </div>
</template>

<script>
import { getCrmSaleOpportunityNodeAddOrModify } from '@/api/client/salesLeads.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        Id: null,
        fatherId: ''
      },
      rules: {
        name: [{ required: true, message: '请填写客户名称', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '备注描述',
          prop: 'remarks',
          value: '',
          type: 'input'
        }
      ],
      userInfo: ''
    }
  },

  methods: {
    onSubmit() {
      this.btnLoading = true
      getCrmSaleOpportunityNodeAddOrModify(this.fromValiData)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        })
        .catch(() => {
          this.btnLoading = false
        })
    }
  },
  mounted() {
    this.fromValiData.fatherId = this.params.id
    this.fromValiData.executorId = this.params.id
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
