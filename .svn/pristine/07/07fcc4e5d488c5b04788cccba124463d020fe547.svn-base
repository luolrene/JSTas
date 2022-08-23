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
import { getCrmVisitorAddOrModify } from '@/api/client/visitorsToPlan.js'
import { getCustQueryPageData } from '@/api/contract/customer.js'
// import { getCustContactsQueryPageData } from '@/api/client/info.js'
import {
  getCrmSaleOpportunityAddOrModify,
  getCrmSaleOpportunityQueryPageData
} from '@/api/client/salesLeads.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        track: '2',
        status: '1',
        opportunity: '2',
        emphasis: '3',
        custId: '',
        nextTime: '',
        objective: '',
        executorTime: '',
        time: '',
        contactsId: '',
        remind: '',
        stage: '',
        contacts: '',
        custName: '',
        saleIdTwo: '',
        relation: '',
        estimatedAmount: '',
        trackNames: '',
        location: '',
        trackPersonnel: '',
        executorId: '',
        opportunityName: '',
        estimatedTime: ''
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
        ],
        track: [
          { required: true, message: '请选择是否下次跟进', trigger: 'blur' }
        ],
        trackNames: [
          { required: true, message: '请输入下次跟进名称', trigger: 'blur' }
        ],
        executorTime: [
          { required: true, message: '请输入下次跟进时间', trigger: 'blur' }
        ],
        objective: [
          { required: true, message: '请输入下次跟进目的', trigger: 'blur' }
        ],
        opportunity: [
          {
            required: true,
            message: '请选择是否发现销售机会',
            trigger: 'blur'
          }
        ],
        opportunityName: [
          { required: true, message: '请输入销售机会名称', trigger: 'blur' }
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
          label: '客户名称',
          prop: 'custName',
          value: '',
          type: 'select',
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
          type: 'select',
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
          data: [
            { name: '当面拜访', id: '1' },
            { name: '电话拜访', id: '2' }
          ]
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
        },
        {
          label: '跟进人员',
          prop: 'trackPersonnel',
          value: '',
          type: 'input',
          isShow: true
        },
        {
          prop: 'track',
          label: '是否下次跟进',
          type: 'select',
          isRqd: true,
          data: [
            { name: '是', id: '1' },
            { name: '否', id: '2' }
          ]
        },
        {
          label: '下次跟进名称',
          prop: 'trackNames',
          value: '',
          type: 'input',
          isRqd: true,
          isShow: true
        },
        {
          label: '下次跟进目的',
          prop: 'objective',
          value: '',
          type: 'textarea',
          isShow: true,
          isRqd: true
        },
        {
          label: '下次跟进时间',
          prop: 'executorTime',
          value: '',
          type: 'date',
          isShow: true,
          isRqd: true
        },
        {
          label: '下次提醒时间',
          prop: 'remind',
          value: '',
          type: 'date',
          isShow: true
        },
        {
          label: '关联销售机会',
          prop: 'saleIdTwo',
          value: 'saleIdTwo',
          type: 'select',
          data: []
        },
        {
          prop: 'opportunity',
          label: '发现销售机会',
          type: 'select',
          isRqd: true,
          data: [
            { name: '是', id: '1' },
            { name: '否', id: '2' }
          ]
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
      fileList: [],
      userInfo: ''
    }
  },
  watch: {
    'fromValiData.track': {
      deep: true,
      handler: function (newV, oldV) {
        this.fromItemList.forEach((item) => {
          if (item.prop === 'objective') {
            if (newV === '2') {
              item.isShow = true
              this.fromValiData.executorTime = ' '
              this.fromValiData.trackNames = ' '
              this.fromValiData.objective = ' '
            } else {
              item.isShow = false
              this.fromValiData.executorTime = null
              this.fromValiData.remind = null
              this.fromValiData.objective = null
              this.fromValiData.trackNames = null
            }
          }
          if (item.prop === 'executorTime') {
            if (newV === '2') {
              item.isShow = true
            } else {
              item.isShow = false
            }
          }
          if (item.prop === 'trackNames') {
            if (newV === '2') {
              item.isShow = true
            } else {
              item.isShow = false
            }
          }
          if (item.prop === 'remind') {
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
      handler: function (newV, oldV) {
        this.fromItemList.forEach((item) => {
          if (item.prop === 'stage') {
            if (newV === '2') {
              item.isShow = true
              this.fromValiData.opportunityName = ' '
              this.fromValiData.stage = ' '
              this.fromValiData.estimatedAmount = ' '
              this.fromValiData.estimatedTime = ' '
              this.fromValiData.relation = ' '
            } else {
              item.isShow = false
              this.fromValiData.opportunityName = null
              this.fromValiData.stage = null
              this.fromValiData.estimatedAmount = null
              this.fromValiData.estimatedTime = null
              this.fromValiData.relation = null
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
          if (item.prop === 'stage') {
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
      this.btnLoading = true
      this.fromValiData.trackPersonnel = this.$store.getters.userInfo.userId
      // （有新销售机会 无新访客计划）
      if (
        this.fromValiData.opportunity === '1' &&
        this.fromValiData.track === '2'
      ) {
        getCrmSaleOpportunityAddOrModify(this.fromValiData).then((res) => {
          this.fromValiData.saleId = res.result
          getCrmTrackAddOrModify(this.fromValiData).then((res) => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
        })
      } else if (
        // (无新销售机会，有新访客计划)
        this.fromValiData.opportunity === '2' &&
        this.fromValiData.track === '1'
      ) {
        getCrmVisitorAddOrModify(this.fromValiData).then((res) => {
          this.fromValiData.saleOpportunityId = res.result
          getCrmTrackAddOrModify(this.fromValiData).then((res) => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
        })
      } else if (
        // (有新销售机会，有新访客计划)
        this.fromValiData.opportunity === '1' &&
        this.fromValiData.track === '1'
      ) {
        getCrmVisitorAddOrModify(this.fromValiData).then((res) => {
          this.fromValiData.saleOpportunityId = res.result
          getCrmSaleOpportunityAddOrModify(this.fromValiData).then((res) => {
            this.fromValiData.saleId = res.result
            getCrmTrackAddOrModify(this.fromValiData).then((res) => {
              this.$layer.close(this.layerid)
              this.$parent.getListData()
              this.$share.message()
              this.btnLoading = false
            })
          })
        })
      } else {
        // (无新销售机会，无新访客计划)
        getCrmTrackAddOrModify(this.fromValiData).then((res) => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        })
      }
    }

  },
  mounted() {
    if (this.params) {
      this.fromValiData.visitorIdJudge = this.params.id
      this.fromValiData.custName = this.params.custName
      this.fromValiData.custId = this.params.custId
      this.fromValiData.contacts = this.params.contactsName
      this.fromValiData.contactsId = this.params.contactsId
      this.fromValiData.trackPersonnel = this.$store.getters.userInfo.userId
    }
    // 查询对应联系人下面的为完成的销售机会
    getCrmSaleOpportunityQueryPageData({
      custId: this.fromValiData.custId,
      pageSize: '999',
      pageNow: '1',
      executorName: this.$store.getters.userInfo.name,
      contactsId: this.params.contactsId,
      stages: ['1', '2', '3'].join(',')
    }).then((res) => {
      res.result.pageList.forEach((xdd) => {
        xdd.name = xdd.opportunityName
      })
      this.fromItemList.forEach((item, index) => {
        if (item.prop === 'saleIdTwo') {
          this.fromItemList[index].data = res.result.pageList
        }
      })
    })
    getCustQueryPageData({
      pageSize: 999,
      pageNow: 1,
      opermanUser: this.$store.getters.userInfo.name,
      opermanUserId: this.$store.getters.userInfo.userId
    }).then((res) => {
      this.fromItemList.forEach((item) => {
        if (item.prop === 'custName') {
          item.data = res.result.pageList
        }
      })
    })
    this.userInfo = this.$store.getters.userInfo
    this.fromValiData.trackPersonnel = this.userInfo.userId
    this.fromValiData.executorId = this.userInfo.userId
  },
  created() {

  }
}
</script>

<style scoped lang="scss">
</style>
