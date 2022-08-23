<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="90">
    </fromItem>
  </div>
</template>

<script>
import { validateNumber } from '@/utils/public.js'
import { getCustQueryPageData } from '@/api/contract/customer.js'
import { getCrmProjectTipsAddOrModify } from '@/api/client/cooperationExpire.js'
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
        implementStatus: '1'
      },
      rules: {
        custName: [
          { required: true, message: '请选择客户名称', trigger: 'blur' }
        ],
        contactsName: [
          { required: true, message: '请选择联系人', trigger: 'blur' }
        ],
        quota: [
          { required: true, message: '请输入预计金额', trigger: 'blur' },
          { validator: validateNumber, trigger: 'change' }
        ],
        expireTime: [
          { required: true, message: '请选择到期时间', trigger: 'blur' }
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
          prop: 'contactsName',
          value: 'contactsId',
          type: 'select',
          isRqd: true,
          data: []
        },

        {
          label: '项目版块',
          prop: 'projectSection',
          value: '',
          type: 'select',
          data: [
            { id: '0', name: '环境' },
            { id: '1', name: '农业' },
            { id: '2', name: '土壤' }
          ]
        },
        {
          label: '项目类别',
          prop: 'projectCategory',
          value: '',
          type: 'input'
        },
        {
          label: '预计金额',
          prop: 'quota',
          value: '',
          type: 'input',
          isRqd: true
        },

        {
          label: '到期时间',
          prop: 'expireTime',
          value: '',
          type: 'date',
          isRqd: true
        },
        {
          label: '提醒时间',
          prop: 'remindTime',
          value: '',
          type: 'date',
          isRqd: true
        },
        {
          label: '备注',
          prop: 'remars',
          value: '',
          type: 'textarea',
          isRqd: true
        }
      ]
    }
  },
  watch: {
    'fromValiData.custName': {
      deep: true,
      handler: function(newV) {
        this.fromItemList.forEach(item => {
          if (this.params) {
            if (item.prop === 'custName') {
              item.disabled = true
            }
            if (item.prop === 'contactsName') {
              item.disabled = true
            }
          }
        })
      }
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getCrmProjectTipsAddOrModify(this.fromValiData)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
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
          if (item.prop === 'contactsName') {
            this.fromItemList[index].data = res.result.pageList
          }
        })
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
    }
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
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
