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
import { getCrmVisitorAddOrModify } from '@/api/client/visitorsToPlan.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        custId: '',
        contactsId: '',
        contacts: '',
        custName: ''
      },
      rules: {
        delayReason: [
          { required: true, message: '请输入延期原因', trigger: 'blur' }
        ],
        delayTime: [
          { required: true, message: '请选择延期时间', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '延期时间',
          prop: 'delayTime',
          value: '',
          type: 'date',
          isRqd: true
        },
        {
          label: '延期原因',
          prop: 'delayReason',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '延期备注',
          prop: 'delayRemarks',
          value: '',
          type: 'input'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
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
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      this.fromValiData.status = '3'
      this.fromValiData.custName = this.params.custName
      this.fromValiData.contacts = this.params.contactsName
    }
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.fromValiData.executorName = this.userInfo.userId
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
