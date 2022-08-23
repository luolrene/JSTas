<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules"
      :labelWidth="120"
    >
      <el-form-item label="附件上传:" slot="upload">
        <myUpload
          ref="myUpload"
          fileType="4"
          :fileList="fileList"
        ></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { getCrmTrackAddOrModify } from '@/api/client/followRecords'
import { getCrmVisitorAddOrModify } from '@/api/client/visitorsToPlan.js'
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
        name: '',
        track: '2',
        location: null,
        trackPersonnel: null
      },
      rules: {
        name: [{ required: true, message: '请填写客户名称', trigger: 'blur' }],
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
        ],
        trackResult: [
          { required: true, message: '请输入跟进结果', trigger: 'blur' }
        ],
        track: [
          { required: true, message: '请选择是否下次跟进', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '客户名称',
          prop: 'name',
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
        },
        {
          prop: 'track',
          label: '是否下次跟进',
          type: 'select',
          isRqd: true,
          data: [{ name: '是', id: '1' }, { name: '否', id: '2' }]
        },
        {
          label: '下次跟进时间',
          prop: 'time',
          value: '',
          type: 'date',
          isShow: true
        },
        {
          label: '下次提醒时间',
          prop: 'nextTime',
          value: '',
          type: 'date',
          isShow: true
        },
        {
          label: '下次跟进备注',
          prop: 'nextRemarks',
          value: '',
          type: 'textarea',
          rows: '3',
          isShow: true
        }
      ],
      fileList: [],
      userInfo: ''
    }
  },
  watch: {
    'fromValiData.track': {
      deep: true,
      handler: function(newV, oldV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'nextRemarks') {
            if (newV === '2') {
              item.isShow = true
            } else {
              item.isShow = false
            }
          }
          if (item.prop === 'nextTime') {
            if (newV === '2') {
              item.isShow = true
            } else {
              item.isShow = false
            }
          }
          if (item.prop === 'time') {
            if (newV === '2') {
              item.isShow = true
            } else {
              item.isShow = false
            }
          }
        })
      }
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
          let ids = JSON.parse(JSON.stringify(this.params))
          ids.status = '2'
          getCrmVisitorAddOrModify(ids)
            .then(res => {
              this.$parent.getListData()
            })
            .catch(() => {
              this.btnLoading = false
            })
        })
        .catch(() => {
          this.btnLoading = false
        })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = JSON.parse(JSON.stringify(this.params))
      this.fromValiData.id = null
      this.fromValiData.contactsId = this.params.contactsId
      this.fromValiData.name = this.params.custName
      this.fromValiData.contacts = this.params.contactsName
      this.fromValiData.visitorId = this.params.id
      this.fromValiData.trackPersonnel = this.$store.getters.userInfo.id
    }
  },
  created() {}
}
</script>
<style scoped lang="scss">
</style>
