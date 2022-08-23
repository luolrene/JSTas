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
        location: null,
        name: '',
        trackPersonnel: null,
        track: '2'
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
          data: null
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
        },
        {
          label: '关联销售机会',
          prop: 'name1',
          value: 'saleIdTwo',
          type: 'select',
          isRqd: true,
          data: []
        },
        {
          prop: 'opportunity',
          label: '是否发现销售机会',
          type: 'select',
          isRqd: true,
          data: [{ name: '是', id: '1' }, { name: '否', id: '2' }]
        },
        {
          label: '销售机会名称',
          prop: 'opportunityName',
          value: '',
          type: 'input',
          isRqd: true,
          isShow: true
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
          ],
          isShow: true
        },
        {
          label: '项目板块',
          prop: 'relation',
          value: '',
          type: 'input',
          isRqd: false,
          isShow: true
        },
        {
          label: '预计金额',
          prop: 'estimatedAmount',
          value: '',
          type: 'input',
          isRqd: true,
          isShow: true
        },
        {
          label: '预计结束日期',
          prop: 'estimatedTime',
          value: '',
          type: 'date',
          isRqd: true,
          isShow: true
        }
      ],
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
          } else if (item.prop === 'nextTime') {
            if (newV === '2') {
              item.isShow = true
            } else {
              item.isShow = false
            }
          } else if (item.prop === 'time') {
            if (newV === '2') {
              item.isShow = true
            } else {
              item.isShow = false
            }
          }
        })
      }
    },
    'fromValiData.opportunity': {
      deep: true,
      handler: function(newV, oldV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'stage') {
            if (newV === '2') {
              item.isShow = true
            } else {
              item.isShow = false
            }
          }
          if (item.prop === 'relation') {
            if (newV === '2') {
              item.isShow = true
            } else {
              item.isShow = false
            }
          }
          if (item.prop === 'opportunityName') {
            if (newV === '2') {
              item.isShow = true
            } else {
              item.isShow = false
            }
          }
          if (item.prop === 'estimatedAmount') {
            if (newV === '2') {
              item.isShow = true
            } else {
              item.isShow = false
            }
          }
          if (item.prop === 'estimatedTime') {
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
      if (this.fromValiData.time === '') {
        this.$share.message('请选择下次跟进时间', 'warning')
        return
      }
      if (this.fromValiData.nextTime === '') {
        this.$share.message('请选择下次提醒时间', 'warning')
        return
      }
      if (this.fromValiData.nextRemarks === '') {
        this.$share.message('请选择下次跟进备注', 'warning')
        return
      }
      if (this.fromValiData.track === '2') {
        this.fromValiData.time = ' '
        this.fromValiData.nextTime = ' '
        this.fromValiData.nextRemarks = ' '
      }
      if (this.fromValiData.stage === '') {
        this.$share.message('请选择销售阶段', 'warning')
        return
      }
      if (this.fromValiData.opportunityName === '') {
        this.$share.message('请输入销售机会名称', 'warning')
        return
      }
      if (this.fromValiData.relation === '') {
        this.$share.message('请输入项目板块', 'warning')
        return
      }
      if (this.fromValiData.estimatedAmount === '') {
        this.$share.message('请输入预计金额', 'warning')
        return
      }
      if (this.fromValiData.estimatedTime === '') {
        this.$share.message('请选择预计结束日期', 'warning')
        return
      }
      if (this.fromValiData.opportunity === '2') {
        this.fromValiData.stage = ' '
        this.fromValiData.opportunityName = ' '
        this.fromValiData.relation = ' '
        this.fromValiData.estimatedAmount = ' '
        this.fromValiData.estimatedTime = ' '
      }
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
        custId: this.fromValiData.custId,
        operManId: this.$store.getters.userInfo.userId
      }).then(res => {
        this.fromItemList[1].data = res.result.pageList
      })
    }
  },
  mounted() {
    this.fromValiData.name = this.addParams.name
    this.fromValiData.custId = this.addParams.id
    this.fromValiData.custname = this.addParams.name
    this.getusers()

    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.fromValiData.trackPersonnel = this.userInfo.userId
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
