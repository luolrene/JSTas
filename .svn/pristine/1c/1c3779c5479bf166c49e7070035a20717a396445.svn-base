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
     <el-form-item label="附件上传:" slot="upload">
        <myUpload ref="myUpload" fileType="4" :fileList="fileList"></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { validateNumber } from '@/utils/public.js'
import { getCustQueryPageData } from '@/api/contract/customer.js'
import { getCrmSaleOpportunityAddOrModify } from '@/api/client/salesLeads.js'
import { getCustContactsQueryPageData } from '@/api/client/info.js'
export default {
  props: {
    addParams: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fileList: [],
      fromValiData: {
        custId: '',
        contactsId: '',
        contacts: '',
        name: ''
      },
      rules: {
        opportunityName: [
          { required: true, message: '请填写销售机会名称', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请选择客户名称', trigger: 'blur' }],
        contactsId: [
          { required: true, message: '请输入客户联系人', trigger: 'blur' }
        ],
        executorId: [
          { required: true, message: '请选择负责人', trigger: 'blur' }
        ],
        stage: [{ required: true, message: '请选择销售阶段', trigger: 'blur' }],
        estimatedAmount: [
          { required: true, message: '请输入预计金额', trigger: 'blur' },
          { validator: validateNumber, trigger: 'change' }
        ],
        estimatedTime: [
          { required: true, message: '请选择预计结束日期', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '客户名称',
          prop: 'name',
          value: '',
          type: 'select',
          isRqd: true,
          filterable: true,
          data: [],
          click: 'getCustData'
        },
        {
          label: '联系人',
          prop: 'contacts',
          value: 'contactsId',
          type: 'select',
          isRqd: true,
          data: []
        },
        {
          label: '销售机会名称',
          prop: 'opportunityName',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '销售阶段',
          prop: 'stage',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            { name: '发现需求', id: '1' },
            { name: '确认需求', id: '2' },
            { name: '商务谈判', id: '3' },
            { name: '合同签订', id: '4' }
          ]
        },
        {
          label: '项目板块',
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
        },

        {
          label: '负责人',
          prop: 'executorId',
          value: '',
          type: 'input',
          isRqd: true,
          isShow: true
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getCrmSaleOpportunityAddOrModify(this.fromValiData)
        .then(res => {
          if (this.$refs.myUpload.uploadList.length > 0) {
            this.$refs.myUpload.upload(res.result, this, this.layerid)
          } else {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          }
        })
        .catch(() => {
          this.btnLoading = false
        })
    },
    getCustData(item, params) {
      let obj = {}
      obj = item.data.find(xdd => {
        return xdd.id === params
      })
      this.fromValiData.custId = obj.id
      this.fromValiData.custName = obj.name
      this.fromValiData.contacts = ''
      getCustContactsQueryPageData({
        custId: obj.id,
        pageSize: 999,
        pageNow: 1
      }).then(res => {
        this.fromItemList.forEach((item, index) => {
          if (item.prop === 'contacts') {
            this.fromItemList[index].data = res.result.pageList
          }
        })
      })
    }
  },
  mounted() {
    getCustQueryPageData({
      pageSize: 999,
      pageNow: 1,
      opermanUser: this.$store.getters.userInfo.name,
      opermanUserId: this.$store.getters.userInfo.userId
    }).then(res => {
      this.fromItemList.forEach(item => {
        if (item.prop === 'name') {
          item.data = res.result.pageList
        }
      })
    })
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.fromValiData.executorId = this.userInfo.userId
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
