<template>
    <div class="operate-container">
        <fromItem ref="myFromItem" :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :labelWidth="100">
        </fromItem>
    </div>
</template>

<script>
import { getJournalismAddOrModify } from '../../api/client/feedback.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        feedBack: ''
      },
      fromItemList: [
        {
          label: '反馈内容',
          prop: 'feedBack',
          value: '',
          type: 'textarea'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      this.fromValiData.state = '2'
      getJournalismAddOrModify(this.fromValiData)
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

<style scoped>
</style>
