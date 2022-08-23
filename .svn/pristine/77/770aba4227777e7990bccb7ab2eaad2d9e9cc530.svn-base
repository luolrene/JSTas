<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :labelWidth="110">
    </fromItem>
  </div>
</template>

<script>
import { getCrmVisitorGetDateById } from '@/api/client/visitorsToPlan.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      rules: {},
      fromItemList: [
        {
          label: '下次跟进名称',
          prop: 'name',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '下次跟进目的',
          prop: 'objective',
          value: '',
          type: 'textarea',
          disabled: true
        },
        {
          label: '下次跟进时间',
          prop: 'executorTime',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '下次提醒时间',
          prop: 'remind',
          value: '',
          type: 'input',
          disabled: true
        }
      ]
    }
  },

  methods: {
    onSubmit() {
      this.$layer.close(this.layerid)
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData.id = this.params.saleOpportunityId
      getCrmVisitorGetDateById(this.fromValiData)
        .then(res => {
          this.fromValiData = res.result
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
