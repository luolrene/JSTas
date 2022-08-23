<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="110">
      <el-form-item label="附件上传:" slot="upload">
        <myUpload ref="myUpload" fileType="4" :fileList="fileList"></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>
<script>
import { getCustQueryPageData } from '@/api/contract/customer.js'
import { getCrmVisitorAddOrModify } from '@/api/client/visitorsToPlan.js'
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
        Id: null,
        custId: '',
        contactsId: '',
        contacts: '',
        custName: '',
        status: '1'
      },
      rules: {
        custName: [
          { required: true, message: '请选择客户名称', trigger: 'blur' }
        ],
        contacts: [
          { required: true, message: '请输入客户联系人', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入计划名称', trigger: 'blur' }],
        objective: [
          { required: true, message: '请输入拜访目的', trigger: 'blur' }
        ],
        executorTime: [
          { required: true, message: '请选择计划日期', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '客户名称',
          prop: 'custName',
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
          label: '计划名称',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '拜访目的',
          prop: 'objective',
          value: '',
          type: 'textarea',
          isRqd: true
        },
        {
          label: '执行时间',
          prop: 'executorTime',
          value: '',
          type: 'date',
          isRqd: true
        },
        {
          label: '提醒时间',
          prop: 'remind',
          value: '',
          type: 'date',
          isRqd: true
        },
        {
          label: '备注',
          prop: 'remarks',
          value: '',
          type: 'input'
        },

        {
          label: '跟进人',
          prop: 'executorId',
          value: '',
          type: 'input',
          isShow: true
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getCrmVisitorAddOrModify(this.fromValiData)
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
        if (item.prop === 'custName') {
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
