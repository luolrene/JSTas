
<template>
  <div class="operate-container">
    <h3 style="text-align: center;">客联系人审核</h3>
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import { getCrmResponsibilityLxrToExamine } from '@/api/client/verity.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {},
  data() {
    return {
      optinColor: '#01AB91',
      fromValiData: {
        handleRemarks: '',
        handle: ''
      },
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
      if (
        this.fromValiData.handle === '3' &&
        this.fromValiData.handleRemarks === ''
      ) {
        this.$share.message('请填写退回原因', 'warning')
        return
      }
      getCrmResponsibilityLxrToExamine(this.fromValiData)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
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
