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
        Id: null,
        custId: '',
        contactsId: '',
        contacts: '',
        custName: ''
      },
      rules: {
        custName: [
          { required: true, message: '请填写客户名称', trigger: 'blur' }
        ],
        contacts: [
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
        ]
      },
      fromItemList: [
        {
          label: '客户名称',
          prop: 'custName',
          value: '',
          type: 'input',
          isRqd: true,
          filterable: true,
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
          type: 'textarea'
        }
      ],
      fileList: [],
      userInfo: ''
    }
  },

  methods: {
    onSubmit() {
      this.btnLoading = true
      this.fromValiData.trackPersonnel = this.$store.getters.userInfo.userId
      getCrmTrackAddOrModify(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      this.fromValiData.contacts = this.params.contactsName
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
