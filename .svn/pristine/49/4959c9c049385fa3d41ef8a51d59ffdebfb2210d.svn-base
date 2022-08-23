<template>
  <div class="operate-container">
    <fromItem ref="myFromItem"
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :rules="rules"
      :btnLoading="btnLoading"
      :labelWidth="110">
      <el-form-item label="附件上传:" slot="upload">
        <myUpload ref="myUpload" fileType="1" :fileList="fileList"></myUpload>
      </el-form-item>
      <el-button
        slot="button"
        :size="$layer_Size.buttonSize"
        type="primary"
        native-type="submit"
        @click="onSubmitVerity">保存并提交</el-button>
    </fromItem>
  </div>
</template>

<script>
import { validateNumber, TwoNumber } from '../../../utils/public.js'
import {
  getContractAddOrModifyContract,
  getContractGetBackOfficeUser
} from '../../../api/contract/msg.js'
import {
  getCustQueryContacts,
  getCustQueryPageData,
  getCustQueryOpers
} from '../../../api/contract/customer.js'
import { getFileQueryFileList } from '../../../api/file.js'
// import { getPathQueryAllPath } from '../../../api/jcxxgl/exmProcess.js'
export default {
  props: {
    params: Object,
    layerid: '',
    plateData: Array, // 项目板块
    projectTypeData: Array, // 项目类型
    payTypeData: Array, // 付款方式
    mailTypeData: Array // 寄送方式
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        custName: '',
        seller: '',
        officeName: '',
        office: '',
        reportNum: '2',
        sellerName: '',
        contacts: '',
        contactsMobile: '',
        project: '',
        projectType: [],
        consumeType: '',
        consume: '',
        busiType: '1',
        custType: '1'
      },
      rules: {
        project: [{ required: true, message: '请填写项目名称', trigger: 'blur' }],
        custName: [{ required: true, message: '请选择客户名称', trigger: 'change' }],
        contacts: [{ required: true, message: '请选择联系人姓名', trigger: 'change' }],
        sellerName: [{ required: true, message: '请选择经办人姓名', trigger: 'change' }],
        // area: [{ required: true, message: '请选择客户区域', trigger: 'change' }],
        plateName: [{ required: true, message: '请选择项目板块', trigger: 'change' }],
        projectType: [{ required: true, message: '请选择项目类型', trigger: 'change' }],
        payTypeName: [{ required: true, message: '请选择付款方式', trigger: 'change' }],
        mailTypeName: [{ required: true, message: '请选择寄送方式', trigger: 'change' }],
        // checkPath: [{ required: true, message: '请选择审核流程', trigger: 'change' }],
        busiType: [{ required: true, message: '请选择业务类别', trigger: 'change' }],
        price: [{ required: true, message: '请填写合同金额', trigger: 'change' },
          { validator: (rule, value, callback) => {
            let numberReg = /^\d+$|^\d+[.]?\d+$/
            if (value !== '') {
              if (!numberReg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                if (this.fromValiData.custType === '1' && value > 1000) {
                  callback(new Error('客户性质为个人，合同金额最大限额为1000'))
                }
                callback()
              }
            } else {
              // callback(new Error('请输入值'))
              callback()
            }
          },
          trigger: 'change' }],
        reportNum: [{ required: true, message: '请填写报告份数', trigger: 'blur' }],
        discount: [{ required: true, message: '请填写折扣', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        checkAddress: [{ required: true, message: '请填写检测地点', trigger: 'blur' }],
        expOne: [{ required: true, message: '请填写备注1', trigger: 'blur' }],
        expTwo: [{ required: true, message: '请填写备注2', trigger: 'blur' }]
      },
      fromItemList: [
        {span: 8, label: '客户名称', prop: 'custName', value: '', type: 'select', isRqd: true, filterable: true, data: [], click: 'changeCustData'},
        {span: 8, label: '项目名称', prop: 'project', value: '', type: 'input', isRqd: true},
        {span: 8, label: '客户区域', prop: 'area', value: '', type: 'input', disabled: true},
        {span: 8, label: '联系人姓名', prop: 'contacts', value: 'contactsMobile', type: 'select', isRqd: true, data: [], needMobile: true, click: 'changeContacts'},
        {span: 8, label: '联系人手机', prop: 'contactsMobile', value: '', type: 'input', isRqd: true, disabled: true},
        {span: 8, label: '经办人姓名', prop: 'sellerName', value: '', type: 'select', isRqd: true, data: [], click: 'changeSeller'},
        {span: 8, label: '经办人手机', prop: 'seller', value: '', type: 'input', isRqd: true, disabled: true},
        {span: 8, label: '内勤姓名', prop: 'officeName', value: '', type: 'input', isRqd: true, disabled: true},
        {span: 8, label: '内勤手机', prop: 'office', value: '', type: 'input', isRqd: true, disabled: true},
        // {label: '客户区域', prop: 'area', value: '', type: 'cascader_city', isRqd: true},
        {span: 8, label: '项目板块', prop: 'plateName', value: 'plate', type: 'select', isRqd: true, data: this.plateData, click: 'getPlate'},
        {span: 16, label: '项目类型', prop: 'projectType', value: 'projectTypeName', type: 'select', multiple: true, isRqd: true, data: [], click: 'getProjectType'},
        {span: 8, label: '业务类别', prop: 'busiType', value: '', type: 'select', isRqd: true, data: [{ id: '1', name: '纯检测' }, { id: '2', name: '纯咨询' }, { id: '3', name: '检测和咨询' }]},
        {span: 8, label: '付款方式', prop: 'payTypeName', value: 'payType', type: 'select', isRqd: true, data: this.payTypeData},
        {span: 8, label: '寄送方式', prop: 'mailTypeName', value: 'mailType', type: 'select', isRqd: true, data: this.mailTypeData},
        // {label: '审核流程', prop: 'checkPath', value: '', type: 'select', isRqd: true, data: []},

        {span: 8, label: '采样期限时间', prop: 'cyTerm', value: '', type: 'date', isRqd: true, labelWidth: '110'},
        {span: 8, label: '项目期限', prop: 'proTerm', value: '', type: 'date', isRqd: true},
        {span: 8, label: '合同金额', prop: 'price', value: '', type: 'input', isRqd: true},
        {span: 8, label: '报告份数', prop: 'reportNum', value: '', type: 'input', isRqd: true},
        {span: 8, label: '检测地点', prop: 'checkAddress', value: '', type: 'input', isRqd: true},
        // {label: '项目消耗',
        //   prop: 'consumeType',
        //   value: '',
        //   type: 'select',
        //   isRqd: false,
        //   isNoClear: true,
        //   isShow: true,
        //   data: [
        //     { id: '1', name: '税前比例' },
        //     { id: '2', name: '税后比例' },
        //     { id: '3', name: '税前金额' },
        //     { id: '4', name: '税后金额' }
        //   ]},
        // {label: '数值', prop: 'consume', value: '', type: 'input', isShow: true, isRqd: true},
        // { label: '服务费1类型',
        //   prop: 'consumeType',
        //   value: '',
        //   type: 'select',
        //   isRqd: false,
        //   isNoClear: true,
        //   isShow: true,
        //   data: [
        //     { id: '3', name: '税前金额' },
        //     { id: '4', name: '税后金额' }
        //   ] },
        // { label: '服务费1金额', prop: 'consume', value: '', type: 'input', isShow: true, isRqd: true },
        { span: 8, label: '折扣', prop: 'discount', value: '', type: 'input', isRqd: true },
        {span: 12, label: '是否周期合同', prop: 'iscycle', value: '', type: 'switch', isRqd: true},
        {span: 12, label: '是否分包', prop: 'istosub', value: '', type: 'switch', isRqd: true},
        {span: 12, label: '是否评价', prop: 'ispj', value: '', type: 'switch', isRqd: true},
        {span: 12, label: '是否寄出发票', prop: 'needInvoice', value: '', type: 'switch', isRqd: true},
        {span: 12, label: '备注1', prop: 'expOne', value: '', type: 'textarea', isRqd: false, placeholder: '请填写备注1(全流程都能查看到该备注)'},
        {span: 12, label: '备注2', prop: 'expTwo', value: '', type: 'textarea', isRqd: false, placeholder: '请填写备注2(仅有权限的人能够查看)'}
      ],
      fileList: []
    }
  },
  watch: {
    'fromValiData.consumeType': {
      handler(newName, oldName) {
        let isSwitch = true
        if (newName !== '' && newName !== null) {
          isSwitch = false
          this.rules.consume = [{ required: true, message: '请填写服务费1金额', trigger: 'blur' }, { validator: validateNumber, trigger: 'change' }]
        } else {
          this.fromValiData.consume = ''
          this.rules.consume = []
        }
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'consume') {
            xdd.isShow = isSwitch
          }
        })
      },
      deep: true,
      immediate: true
    },
    'fromValiData.plate': {
      handler(newName, oldName) {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'projectType') {
            xdd.data = []
            this.projectTypeData.forEach(arc => {
              if (newName === 'XMBK_2') {
                if (arc.id === 'XMLX_7' || arc.id === 'XMLX_8') {
                  xdd.data.push(arc)
                }
              } else {
                if (arc.id !== 'XMLX_7' && arc.id !== 'XMLX_8') {
                  xdd.data.push(arc)
                }
              }
            })
          }
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onSubmit(type) {
      let ids = JSON.parse(JSON.stringify(this.fromValiData))
      ids.workType = type ? '2' : '1'
      ids.iscycle = ids.iscycle ? '1' : '0'
      ids.istosub = ids.istosub ? '1' : '0'
      ids.ispj = ids.ispj ? '1' : '0'
      ids.needInvoice = ids.needInvoice ? '1' : '0'
      ids.office = ids.office === '无内勤人员' ? '' : ids.office
      ids.officeName = ids.officeName === '无内勤人员' ? '' : ids.officeName
      // ids.area = ids.area.join('/')
      ids.projectType = ids.projectType.join(',')
      ids.projectTypeName = ids.projectTypeName.join(',')
      ids.needCheck = '1'
      this.btnLoading = true
      getContractAddOrModifyContract(ids).then(res => {
        if (this.$refs.myUpload.uploadList.length > 0) {
          this.$refs.myUpload.upload(res.result, this, this.layerid)
        } else {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        }
      }).catch(() => {
        this.btnLoading = false
      })
    },
    onSubmitVerity() {
      this.$refs.myFromItem.onSubmit('fromValiData', 'other')
    },
    getProjectType(item, params) {
      this.fromValiData.projectTypeName = []
      item.data.forEach(xdd => {
        params.forEach(arc => {
          if (xdd.id === arc) {
            this.fromValiData.projectTypeName.push(xdd.name)
          }
        })
      })
    },
    getPlate(item, params) {
      let obj = {}
      obj = item.data.find(xdd => {
        return xdd.id === params
      })
      this.fromValiData.plate = obj.id
      this.fromValiData.plateName = obj.name
      this.fromValiData.projectType = []
      this.fromValiData.projectTypeName = []
    },
    changeCustData(item, params) {
      let obj = {}
      obj = item.data.find(xdd => {
        return xdd.id === params
      })
      this.fromValiData.custType = obj.type
      this.fromValiData.custId = obj.id
      this.fromValiData.custName = obj.name
      this.fromValiData.project = obj.name
      this.fromValiData.contacts = ''
      this.fromValiData.contactsMobile = ''
      this.fromValiData.sellerName = ''
      this.fromValiData.seller = ''
      this.fromValiData.officeName = ''
      this.fromValiData.office = ''
      this.fromValiData.area = obj.province + '/' + obj.city + '/' + obj.area

      this.fromItemList.forEach((xdd, index) => {
        if (xdd.prop === 'sellerName') {
          xdd.data = []
        }
      })
      getCustQueryContacts({ custId: obj.id }).then(res => {
        this.fromItemList.forEach((xdd, index) => {
          if (xdd.prop === 'contacts') {
            this.fromItemList[index].data = res.result
          }
        })
      })
    },
    changeContacts(item, params) {
      let obj = {}
      obj = item.data.find(xdd => {
        return xdd.id === params
      })
      this.fromValiData.contacts = obj.name
      this.fromValiData.contactsMobile = obj.mobile
      this.fromValiData.sellerName = ''
      this.fromValiData.seller = ''
      this.fromValiData.office = ''
      this.fromValiData.officeName = ''
      this.getSellerData(obj)
    },
    changeSeller(item, params) {
      let obj = {}
      obj = item.data.find(xdd => {
        return xdd.id === params
      })
      this.fromValiData.seller = obj.mobile
      this.fromValiData.sellerName = obj.name
      this.fromValiData.office = ''
      this.fromValiData.officeName = ''
      getContractGetBackOfficeUser({ seller: obj.mobile }).then(res => {
        if (res.result) {
          this.fromValiData.office = res.result.mobile
          this.fromValiData.officeName = res.result.name
        } else {
          this.fromValiData.office = '无内勤人员'
          this.fromValiData.officeName = '无内勤人员'
        }
      })
    },
    getSellerData(params) {
      getCustQueryOpers({ custId: params.custId, contactsId: params.id }).then(res => {
        this.fromItemList.forEach((xdd, index) => {
          if (xdd.prop === 'sellerName') {
            this.fromItemList[index].data = res.result
          }
        })
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  },
  mounted() {
    // if (this.$store.getters.userInfo.lev > 3) {
    //   this.fromItemList.forEach(xdd => {
    //     if (xdd.prop === 'consumeType') {
    //       xdd.isShow = false
    //     }
    //   })
    // }

    getCustQueryPageData({ pageSize: 99999, pageNow: 1, isAddCont: '1' }).then(
      res => {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'custName') {
            xdd.data = res.result.pageList
          }
        })
      }
    )
    if (this.params) {
      this.params.iscycle = this.params.iscycle === '1'
      this.params.istosub = this.params.istosub === '1'
      this.params.ispj = this.params.ispj === '1'
      this.params.needInvoice = this.params.needInvoice === '1'
      this.params.price = Number(this.params.price)
      // this.params.area = this.params.area.split('/')
      this.params.projectType = this.params.projectType.split(',')
      this.params.projectTypeName = this.params.projectTypeName.split(',')
      this.fromValiData = this.params
      getFileQueryFileList({ id: this.params.id, type: '1' }).then(res => {
        this.fileList = res.result
      })

      getCustQueryContacts({ custId: this.params.custId }).then(res => {
        this.fromItemList.forEach((xdd, index) => {
          if (xdd.prop === 'contacts') {
            this.fromItemList[index].data = res.result
          }
        })
      })
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
