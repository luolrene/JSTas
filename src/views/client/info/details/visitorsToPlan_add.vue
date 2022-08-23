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
import { getCrmVisitorAddOrModify } from '@/api/client/visitorsToPlan.js'
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
          type: 'input',
          isRqd: true,
          disabled: true
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
          type: 'input',
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
          label: '备注',
          prop: 'remarks',
          value: '',
          type: 'input'
        },
        {
          label: '提醒',
          prop: 'remind',
          value: '',
          type: 'date',
          isRqd: true
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
    getusers() {
      getCustContactsQueryPageData({
        pageSize: 999,
        pageNow: 1,
        custId: this.fromValiData.custId,
        operManId: this.$store.getters.userInfo.userId
      }).then(res => {
        this.fromItemList[1].data = res.result.pageList
      })
    }
  },
  mounted() {
    this.fromValiData.custName = this.params.name
    this.fromValiData.custId = this.params.id
    this.getusers()
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.fromValiData.executorId = this.userInfo.userId
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
