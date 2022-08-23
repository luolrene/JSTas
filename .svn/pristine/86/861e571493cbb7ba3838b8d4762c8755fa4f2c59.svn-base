<template>
  <div style="height: 100%;">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules"
      :inline="true"
      :labelWidth="110">
      <el-form-item label="附件上传:" slot="upload" style="width: 90%;">
        <myUpload ref="myUpload" fileType="4" :fileList="fileList"></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import {validateNumber} from '@/utils/public.js'
import {getCrmOfferAddOrModify} from '@/api/client/quotationRecord.js'
import {getCustQueryPageData} from '@/api/client/info.js'
import {getFileQueryFileList} from '@/api/file.js'
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
        stamp: '1',
        type: '1'
      },
      rules: {
        custName: [{ required: true, message: '请选择客户名称', trigger: 'change' }],
        offerType: [{ required: true, message: '请选择报价类型', trigger: 'change' }],
        checkType: [{ required: true, message: '请选择任务类型', trigger: 'change' }],
        discount: [
          { required: true, message: '请填写折扣值', trigger: 'blur' },
          { validator: validateNumber, trigger: 'change' }
        ],
        stamp: [{ required: true, message: '请选择是否盖章扫描', trigger: 'change' }],
        type: [{ required: true, message: '请选择盖章类型', trigger: 'change' }]
      },
      fromItemList: [
        {
          label: '客户名称',
          prop: 'custName',
          value: 'custId',
          type: 'select',
          isRqd: true,
          data: [],
          filterable: true
        },
        {
          label: '是否盖章扫描',
          prop: 'stamp',
          value: '',
          type: 'select',
          isRqd: true,
          data: [{ name: '是', id: '1' }, { name: '否', id: '2' }]
        },
        {
          label: '盖章类型',
          prop: 'type',
          value: '',
          type: 'select',
          isRqd: true,
          data: [{ name: '报价章', id: '1' }, { name: '公章', id: '2' }]
        },
        {
          label: '报价类型',
          prop: 'offerType',
          value: '',
          type: 'select',
          data: [{ id: '1', name: '含咨询' }, { id: '2', name: '不含咨询' }],
          isRqd: true
        },
        {
          label: '报价类别',
          prop: 'offerPriceType',
          value: '',
          type: 'select',
          data: [{ id: '1', name: '金额' }, { id: '2', name: '折扣' }],
          disabled: true,
          placeholder: ' '
        },
        {
          label: '实际报价',
          prop: 'offerAmountOfmoney',
          changeValue: 'offerPriceType',
          value: '',
          type: 'input',
          disabled: true,
          placeholder: ' '
        },
        {
          label: '任务类型',
          prop: 'checkType',
          value: '',
          type: 'select',
          data: [{ id: '1', name: '采样' }, { id: '2', name: '送样' }],
          isRqd: true
        },
        {
          label: '描述',
          prop: 'offerDescribe',
          value: '',
          type: 'input',
          isRqd: true
        }
      ]
    }
  },
  watch: {
    'fromValiData.stamp': {
      deep: true,
      handler: function(newV, oldV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'type') {
            if (newV === '1') {
              item.isShow = false
            } else {
              item.isShow = true
              this.fromValiData.type = ' '
            }
          }
        })
      }
    },
    'fromValiData.offerPriceType': {
      deep: true,
      immediate: true,
      handler(newV, oldV) {
        let obj = this.fromItemList.find(xdd => {
          return xdd.changeValue === 'offerPriceType'
        })
        if (newV === '1') {
          obj.label = '实际报价'
          obj.prop = 'offerAmountOfmoney'
          delete this.fromValiData.discount
        } else if (newV === '2') {
          obj.label = '折扣值'
          obj.prop = 'discount'
          delete this.fromValiData.offerAmountOfmoney
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getCrmOfferAddOrModify(this.fromValiData).then(res => {
        this.fromValiData.id = res.result
        this.$parent.$parent.$parent.fromValiData.id = res.result
        this.$parent.$parent.$parent.isShow = true
        this.$parent.$parent.$parent.$parent.getListData()
        this.$refs.myUpload.upload(res.result, this, '')
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    },
    getCustData() {
      getCustQueryPageData({
        pageSize: 999,
        pageNow: 1,
        opermanUser: this.$store.getters.userInfo.name,
        opermanUserId: this.$store.getters.userInfo.userId
      }).then(res => {
        this.fromItemList[0].data = res.result.pageList
      })
    }
  },
  mounted() {
    if (this.params) {
      getFileQueryFileList({id: this.params.id}).then(res => {
        this.fileList = res.result
      })
      this.fromValiData = {...this.params}
    }
  },
  created() {
    this.getCustData()
  }
}
</script>

<style scoped lang="scss">
</style>
