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
import { getCrmTrackAddOrModify } from '@/api/client/followRecords'
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
        location: null,
        name: '',
        trackPersonnel: null,
        visitor: '2'
      },
      rules: {
        name: [{ required: true, message: '请填写客户名称', trigger: 'blur' }],
        contactsId: [
          { required: true, message: '请填写联系人名字', trigger: 'blur' }
        ],
        trackMode: [
          { required: true, message: '请选择跟进方式', trigger: 'blur' }
        ],
        trackTime: [
          { required: true, message: '请选择拜访时间', trigger: 'blur' }
        ],
        trackContent: [
          { required: true, message: '请输入跟进内容', trigger: 'blur' }
        ],
        trackResult: [
          { required: true, message: '请输入跟进结果', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '客户名称',
          prop: 'name',
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
          data: null,
          disabled: true
        },
        {
          label: '跟进方式',
          prop: 'trackMode',
          value: '',
          type: 'select',
          isRqd: true,
          data: [{ name: '当面拜访', id: '1' }, { name: '电话拜访', id: '2' }]
        },
        {
          label: '拜访时间',
          prop: 'trackTime',
          value: '',
          type: 'date',
          isRqd: true
        },
        {
          label: '跟进内容',
          prop: 'trackContent',
          value: '',
          type: 'textarea',
          isRqd: true
        },
        {
          label: '跟进结果',
          prop: 'trackResult',
          value: '',
          type: 'textarea',
          isRqd: true
        },
        {
          label: '跟进人员',
          prop: 'trackPersonnel',
          value: '',
          type: 'input',
          data: null,
          isShow: true
        }
      ],
      userInfo: ''
    }
  },

  methods: {
    onSubmit() {
      this.btnLoading = true
      getCrmTrackAddOrModify(this.fromValiData)
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
        custId: this.fromValiData.custId
      }).then(res => {
        this.fromItemList[1].data = res.result.pageList
      })
    }
  },
  mounted() {
    this.fromValiData.name = this.params.custName
    this.fromValiData.custId = this.params.custId
    this.fromValiData.contacts = this.params.contactsName
    this.fromValiData.contactsId = this.params.contactsId
    this.fromValiData.saleIdTwo = this.params.id
    this.fromValiData.id = null
    this.getusers()
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.fromValiData.trackPersonnel = this.userInfo.userId
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
