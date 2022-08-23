<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :labelWidth="110">
    </fromItem>
  </div>
</template>

<script>
import {
  getCrmVisitorGetDateById,
  getCrmVisitorAddOrModify
} from '@/api/client/visitorsToPlan.js'
import { getCrmTrackAddOrModify } from '@/api/client/followRecords'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        name: '',
        objective: '',
        executorTime: '',
        remind: ''
      },
      rules: {
        name: [
          { required: true, message: '下次跟进名称', trigger: 'blur' }
        ],
        objective: [
          { required: true, message: '下次跟进目的', trigger: 'blur' }
        ],
        executorTime: [
          { required: true, message: '下次跟进时间', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '下次跟进名称',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true

        },
        {
          label: '下次跟进目的',
          prop: 'objective',
          value: '',
          type: 'textarea',
          isRqd: true

        },
        {
          label: '下次跟进时间',
          prop: 'executorTime',
          value: '',
          type: 'date',
          isRqd: true

        },
        {
          label: '下次提醒时间',
          prop: 'remind',
          value: '',
          type: 'date'
        }
      ]
    }
  },

  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.params.saleOpportunityId) {
        getCrmVisitorAddOrModify(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      } else {
        this.fromValiData.id = ''
        getCrmVisitorAddOrModify(this.fromValiData)
          .then(res => {
            this.fromValiData.saleOpportunityId = res.result
            this.fromValiData.track = '1'
            getCrmTrackAddOrModify(this.fromValiData)
              .then(res => {
                this.$layer.close(this.layerid)
                this.$parent.getListData()
                this.$share.message()
                this.btnLoading = false
              })
              .catch(() => {
                this.btnLoading = false
              })
          })
          .catch(() => {
            this.btnLoading = false
          })
      }
    }
  },
  mounted() {
    this.fromValiData = this.params
    if (this.params.saleOpportunityId) {
      getCrmVisitorGetDateById({ id: this.params.saleOpportunityId })
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
