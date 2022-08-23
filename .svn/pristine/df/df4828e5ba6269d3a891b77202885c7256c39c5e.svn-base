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
import { getCrmSaleOpportunityAddOrModify, getCrmSaleOpportunityNodeAddOrModify } from '@/api/client/salesLeads.js'
import { getCustContactsQueryPageData } from '@/api/client/info.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fileList: [],
      fromValiData: {
        Id: null,
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
          type: 'input',
          isRqd: true,
          data: [],
          click: 'getCustData',
          disabled: true
        },
        {
          label: '联系人',
          prop: 'contacts',
          value: 'contactsId',
          type: 'input',
          isRqd: true,
          data: [],
          disabled: true
        },
        {
          label: '销售机会名称',
          prop: 'opportunityName',
          value: '',
          type: 'input',
          isRqd: true,
          disabled: true
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
          label: '备注描述',
          prop: 'remarks',
          value: '',
          type: 'input'
        },
        {
          label: '项目板块',
          prop: 'relation',
          value: '',
          type: 'input',
          isRqd: false,
          disabled: true
        },
        {
          label: '预计金额',
          prop: 'estimatedAmount',
          value: '',
          type: 'input',
          isRqd: true,
          disabled: true
        },
        {
          label: '预计结束日期',
          prop: 'estimatedTime',
          value: '',
          type: 'date',
          isRqd: true,
          disabled: true
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
  watch: {
    'fromValiData.stage': {
      deep: true,
      handler: function(newV, oldV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'stage') {
            if (newV === '1') {
              item.data = [
                { name: '确认需求', id: '2' },
                { name: '商务谈判', id: '3' },
                { name: '合同签订', id: '4' }
              ]
            }
          }
          if (item.prop === 'stage') {
            if (newV === '2') {
              item.data = [
                { name: '商务谈判', id: '3' },
                { name: '合同签订', id: '4' }
              ]
            }
          }
          if (item.prop === 'stage') {
            if (newV === '3') {
              item.data = [{ name: '合同签订', id: '4' }]
            }
          }
          if (item.prop === 'stage') {
            if (newV === '4') {
              item.data = []
            }
          }
          if (item.prop === 'stage') {
            if (newV === '5') {
              item.data = []
            }
          }
        })
      }
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getCrmSaleOpportunityAddOrModify(this.fromValiData)
        .then(res => {
          if (this.$refs.myUpload.uploadList.length > 0) {
            this.$refs.myUpload.upload(this.params.id, this, this.layerid)
          } else {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          }

          // 发起节点更改请求
          if (res.code === 0) {
            this.btnLoading = false
            let obj = {}
            obj.fatherId = res.result
            obj.remarks = this.fromValiData.remarks
            obj.stage = this.fromValiData.stage
            getCrmSaleOpportunityNodeAddOrModify(obj).then(res => {})
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
            this.fromItemList[index].data = res.result
          }
        })
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      this.fromValiData.name = this.params.custName
      this.fromValiData.contacts = this.params.contactsName
    }
    getCustQueryPageData({ pageSize: 999, pageNow: 1 }).then(res => {
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
