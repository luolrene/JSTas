
<template>
  <div class="operate-container">
    <h3 style="text-align: center;">客联系人审核</h3>
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import {
  getCrmResponsibilityBatchPass,
  getCrmResponsibilityOneClickReturn
} from '@/api/client/verity.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {},
  data() {
    return {
      optinColor: '#01AB91',
      fromValiData: {},
      rules: {
        option: [{ required: true, message: '请选择审核意见', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '审核意见',
          prop: 'handle',
          value: '',
          type: 'radio',
          isRqd: true,
          data: [{ label: '2', name: '同意' }, { label: '3', name: '拒绝' }]
        },
        {
          label: '审核备注',
          prop: 'handleRemarks',
          value: '',
          type: 'textarea'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      if (this.fromValiData.handle === '2') {
        let arraylist = []
        arraylist.push(this.params)
        getCrmResponsibilityBatchPass(arraylist).then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.loading = false
        }).catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
      } else if (
        this.fromValiData.handle === '3' &&
        this.fromValiData.handleRemarks !== ''
      ) {
        let arraylist = []
        arraylist.push(this.params)
        getCrmResponsibilityOneClickReturn(arraylist).then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.loading = false
        }).catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
      } else if (
        this.fromValiData.handle === '3' &&
        this.fromValiData.handleRemarks === ''
      ) {
        this.$share.message('请填写退回原因', 'warning')
      }
    }
  },
  mounted() {
    this.fromValiData = this.params
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
