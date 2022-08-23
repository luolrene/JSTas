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
import { validatePhoneTwo } from '@/utils/public.js'
import { getCustAddOrModifyContacts } from '@/api/client/contactManage.js'
import { getCustContactsResponsibility } from '../../../api/client/info.js'
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
        custId: '',
        area: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写联系人姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请填写联系人电话', trigger: 'blur' },
          { validator: validatePhoneTwo, trigger: 'change' }
        ],
        sex: [{ required: true, message: '请选择联系人性别', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '联系人',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '联系电话',
          prop: 'mobile',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '性别',
          prop: 'sex',
          value: '',
          type: 'select',
          isRqd: true,
          data: [{ name: '男', id: '男' }, { name: '女', id: '女' }]
        },
        {
          label: '邮箱',
          prop: 'email',
          value: '',
          type: 'input',
          isRqd: false
        },
        {
          label: '详细地址',
          prop: 'addressDetailed',
          value: '',
          type: 'input',
          isRqd: false
        },
        {
          label: '生日',
          prop: 'birthday',
          value: '',
          type: 'date',
          isRqd: false
        },
        {
          label: '部门',
          prop: 'department',
          value: '',
          type: 'input',
          isRqd: false
        },
        {
          label: '职务',
          prop: 'position',
          value: '',
          type: 'input',
          isRqd: false
        },
        {
          label: '爱好',
          prop: 'hobby',
          value: '',
          type: 'input',
          isRqd: false
        },
        {
          label: '备注',
          prop: 'remarks',
          value: '',
          type: 'input',
          isRqd: false
        },
        {
          label: '家庭情况',
          prop: 'familySituation',
          value: '',
          type: 'input',
          isRqd: false
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.fromValiData.creater = this.$store.getters.userInfo.mobile
      this.btnLoading = true
      getCustAddOrModifyContacts(this.fromValiData)
        .then(res => {
          if (this.$refs.myUpload.uploadList.length > 0) {
            this.$refs.myUpload.upload(this.params.id, this, this.layerid)
          } else if (res.code === 33) {
            this.btnLoading = false
            this.$confirm('当前联系人已存在，是否提交跟进客户申请', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true,
              type: 'warning'
            })
              .then(() => {
                let ids = {}
                ids.id = res.result.custId
                ids.name = res.result.custName
                ids.contactsMobile = res.result.mobile
                ids.contactsName = res.result.name
                ids.sex = res.result.sex
                getCustContactsResponsibility(ids)
                  .then(res => {
                    this.$layer.close(this.layerid)
                    this.$parent.getListData()
                    this.$share.message('申请成功')
                    this.loading = false
                  })
                  .catch(err => {
                    this.$message.error(err.message)
                    this.loading = false
                  })
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消退回'
                })
              })
            return
          } else if (res.code === 98) {
          } else {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
          }
          this.btnLoading = false
        })
        .catch(() => {
          this.btnLoading = false
        })
    }
  },
  mounted() {
    this.fromValiData.custId = this.params.id
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
