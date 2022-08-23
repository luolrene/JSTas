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
import { getCrmTrackAddOrModify } from '@/api/client/followRecords.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      lxrId: null,
      fromValiData: {
        Id: null,
        custId: '',
        contactsId: '',
        name: ''
      },
      rules: {
        opportunityName: [
          { required: true, message: '请填写销售机会名称', trigger: 'blur' }
        ],
        opportunityId: [
          { required: true, message: '请填写销售机会编号', trigger: 'blur' }
        ],
        custId: [
          { required: true, message: '请选择客户名称', trigger: 'blur' }
        ],
        contactsId: [
          { required: true, message: '请输入客户联系人', trigger: 'blur' }
        ],
        executorId: [
          { required: true, message: '请选择负责人', trigger: 'blur' }
        ],
        stage: [{ required: true, message: '请选择销售阶段', trigger: 'blur' }],
        estimatedAmount: [
          { required: true, message: '请输入预计金额', trigger: 'blur' }
        ],
        estimatedTime: [
          { required: true, message: '请选择预计结束日期', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '销售机会名称',
          prop: 'opportunityName',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '销售机会编号',
          prop: 'opportunityId',
          value: '',
          type: 'input',
          isRqd: false
        },
        {
          label: '客户名称',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '客户联系人',
          prop: 'contactsId',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '负责人',
          prop: 'executorId',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '销售阶段',
          prop: 'stage',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '关联产品',
          prop: 'relation',
          value: '',
          type: 'input',
          isRqd: false
        },
        {
          label: '预计金额',
          prop: 'estimatedAmount',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '预计结束日期',
          prop: 'estimatedTime',
          value: '',
          type: 'date',
          isRqd: true
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
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
    }

  },
  mounted() {
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
