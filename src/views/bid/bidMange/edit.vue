<template>
  <div class="operate-container">
    <fromItem ref="myFromItem" :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="110">
      <el-form-item label="附件上传:" slot="upload">
        <myUpload ref="myUpload" fileType="4" :fileList="fileList"></myUpload>
      </el-form-item>
      <el-button slot="button" :size="$layer_Size.buttonSize" type="primary" native-type="submit" @click="onSubmitVerity('fromValiData')">保存并提交</el-button>
    </fromItem>
  </div>
</template>

<script>
import { getCustQueryPageData } from '@/api/client/info.js'
import { getCrmBiddingAddOrModify } from '@/api/bid/bid.js'
import { getCrmSaleOpportunityQueryPageData } from '@/api/client/salesLeads.js'
import { validateNumber } from '@/utils/public.js'
import { getFileQueryFileList } from '@/api/file.js'
import { getPathGetCrmBiddingPath } from '@/api/jcxxgl/exmProcess.js'
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
        opportunity: '2',
        opportunityName: null,
        opportunityId: null,
        custId: null
      },
      rules: {
        custName: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        opportunity: [
          { required: true, message: '是否关联销售机会', trigger: 'change' }
        ],
        opportunityName: [
          { required: true, message: '请填写项目名称', trigger: 'blur' }
        ],
        opportunityId: [
          { required: true, message: '请选择项目名称', trigger: 'blur' }
        ],
        fixedPrice: [
          { required: true, message: '请填写项目限价', trigger: 'blur' },
          { validator: validateNumber, trigger: 'change' }
        ],
        trigger: [
          { required: true, message: '请选择审核流程', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '请选择开标时间', trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          label: '客户名称',
          prop: 'custName',
          value: '',
          type: 'select',
          isRqd: true,
          data: [],
          filterable: true,
          click: 'getSalesData'
        },
        {
          label: '关联销售机会',
          prop: 'opportunity',
          value: '',
          type: 'select',
          isRqd: true,
          data: [{ name: '是', id: '1' }, { name: '否', id: '2' }]
        },
        {
          label: '项目名称',
          prop: 'opportunityName',
          value: '',
          type: 'input',
          isRqd: true,
          isShow: false
        },
        {
          label: '项目名称',
          prop: 'opportunityName',
          value: 'opportunityId',
          type: 'select',
          isRqd: true,
          data: [],
          isShow: true
        },
        {
          label: '项目限价',
          prop: 'fixedPrice',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '开标时间',
          prop: 'startTime',
          value: '',
          type: 'date',
          isRqd: true
        },
        {
          label: '备注',
          prop: 'remarks',
          value: '',
          type: 'textarea'
        }
      ]
    }
  },
  watch: {
    'fromValiData.opportunity': {
      deep: true,
      handler: function (newV, oldV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'opportunityName') {
            if (newV === '1') {
              item.isShow = true
            } else {
              item.isShow = false
            }
          }
          if (item.value === 'opportunityId') {
            if (newV === '2') {
              item.isShow = true
              this.fromValiData.opportunityId = ' '
            } else {
              item.isShow = false
            }
          }
        })
      }
    },
    'fromValiData.custName': {
      deep: true,
      handler: function (newV) {
        this.fromItemList.forEach(item => {
          if (this.params) {
            if (item.prop === 'custName') {
              item.disabled = true
            }
            if (item.prop === 'opportunity') {
              item.disabled = true
            }
            if (item.prop === 'opportunityName') {
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
      this.fromValiData.projectNode = '0'
      getCrmBiddingAddOrModify(this.fromValiData)
        .then(res => {
          if (this.$refs.myUpload.uploadList.length > 0) {
            this.$refs.myUpload.upload(res.result.id, this, this.layerid)
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
    onSubmitVerity(formName) {
      this.$refs.myFromItem.$refs.fromValiData.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.fromValiData.projectNode = '2'
          getCrmBiddingAddOrModify(this.fromValiData)
            .then(res => {
              if (this.$refs.myUpload.uploadList.length > 0) {
                this.$refs.myUpload.upload(res.result.id, this, this.layerid)
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
        } else {
          return false;
        }
      });
    },

    // 获取已有的销售记录
    getSalesData(item, params) {
      let obj = {}
      obj = item.data.find(xdd => {
        return xdd.id === params
      })
      this.fromValiData.custId = obj.id
      this.fromValiData.custName = obj.name
      getCrmSaleOpportunityQueryPageData({
        custId: obj.id,
        pageSize: 999,
        pageNow: 1
      }).then(res => {
        this.fromItemList.forEach(item => {
          if (item.prop === 'opportunityName') {
            item.data = []
            res.result.pageList.forEach(arc => {
              item.data.push({
                id: arc.opportunityId,
                name: arc.opportunityName
              })
            })
          }
        })
      })
    },
    getExmProcess() {
      getPathGetCrmBiddingPath({}).then(res => {
        this.fromValiData.trigger = res.result.id
      })
    }
  },
  mounted() {
    this.getExmProcess()
    if (this.params) {
      this.fromValiData = this.params
      getFileQueryFileList({ id: this.params.id, type: '4' }).then(res => {
        this.fileList = res.result
      })
    }
    getCustQueryPageData({
      pageSize: 999,
      pageNow: 1,
      opermanUserId: this.$store.getters.userInfo.userId
    }).then(res => {
      this.fromItemList.forEach(item => {
        if (item.prop === 'custName') {
          item.data = res.result.pageList
        }
      })
    })
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
