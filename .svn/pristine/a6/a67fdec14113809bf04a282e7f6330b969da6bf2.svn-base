<template>
  <div class="operate-container">
    <fromItem :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules"
      :labelWidth="100">
      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' fileType='4' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { validatePhoneTwo } from '@/utils/public.js'
import choIndustry from './choIndustry'
import {
  getCustResponsibility,
  getCustAddOrModifyCust,
  getCustQueryPageData
} from '@/api/client/info.js'
export default {
  props: {
    layerid: ''
  },
  data() {
    return {
      fileList: [],
      btnLoading: false,
      fromValiData: {
        id: null,
        industryName: '',
        type: '',
        importantCustomers: '1',
        parentCustomer: null,
        contactsMobile: null,
        contactsName: null,
        properlyCode: ''
      },
      rules: {
        name: [{ required: true, message: '请填写客户名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择客户性质', trigger: 'blur' }],
        properlyCode: [
          { required: true, message: '请输入社会统一信用代码', trigger: 'blur' }
        ],

        area: [{ required: true, message: '请选择所在区域', trigger: 'blur' }],
        industryName: [
          { required: true, message: '请选择客户行业', trigger: 'blur' }
        ],
        contactsName: [
          { required: true, message: '请填写联系人姓名', trigger: 'blur' }
        ],
        contactsMobile: [
          {
            required: true,
            message: '请填写联系人电话',
            trigger: 'blur'
          },
          { validator: validatePhoneTwo, trigger: 'change' }
        ],
        sex: [{ required: true, message: '请选择联系人性别', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '客户名称',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '客户性质',
          prop: 'type',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            { name: '个人', id: '1' },
            { name: '政府', id: '2' },
            { name: '事业单位', id: '3' },
            { name: '私有企业', id: '4' },
            { name: '国有企业', id: '5' },
            { name: '外资企业', id: '6' },
            { name: '合资企业', id: '7' }
          ]
        },
        {
          label: '社会统一信用代码',
          prop: 'properlyCode',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '上级客户',
          prop: 'parentCustomer',
          value: '',
          type: 'select',
          isNoClear: true,
          filterable: true,
          data: []
        },
        {
          label: '所在区域',
          prop: 'area',
          value: '',
          type: 'cascader_city',
          click: 'handleChange',
          filterable: true,
          isRqd: true
        },
        {
          label: '详细地址',
          prop: 'address',
          value: '',
          type: 'input'
        },
        {
          label: '客户状态',
          prop: 'customerType',
          value: '',
          type: 'select',
          data: [
            { name: '已有订单', id: '1' },
            { name: '从无订单', id: '2' },
            { name: '订单中断', id: '3' }
          ]
        },
        {
          label: '客户级别',
          prop: 'importantCustomers',
          value: '',
          type: 'select',
          data: [
            { name: '普通客户', id: '1' },
            { name: '重点客户', id: '2' },
            { name: 'VIP客户', id: '3' }
          ],
          isShow: true
        },
        {
          label: '客户行业',
          prop: 'industryName',
          value: '',
          type: 'inputChoice',
          click: 'getIndustry',
          isRqd: true
        },
        {
          label: '联系人姓名',
          prop: 'contactsName',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '联系人电话',
          prop: 'contactsMobile',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '联系人性别',
          prop: 'sex',
          value: '',
          type: 'select',
          isRqd: true,
          data: [{ name: '男', id: '男' }, { name: '女', id: '女' }]
        },
        {
          label: '备注',
          prop: 'exp',
          value: '',
          type: 'textarea',
          rows: '3'
        }
      ]
    }
  },
  watch: {
    'fromValiData.type': {
      handler (newV, oldV) {
        if (newV === oldV) {
          return
        }
        this.fromItemList.forEach(item => {
          if (item.prop === 'properlyCode') {
            if (newV === '1') {
              this.fromValiData.properlyCode = ''
              this.$notify.info({
                title: '提示',
                dangerouslyUseHTMLString: true,
                message: '<strong>客户性质为<span style="color:red">个人</span>时,合同金额最大限额为<span style="color:red">1000</span>元</strong>',
                duration: 8000
              });
              item.isShow = true
              item.isRqd = false
            } else {
              item.isShow = false
              item.isRqd = true
            }
          }
        })
      },
      deep: true,
      immediate: false
    }
  },
  methods: {
    onSubmit() {
      // this.btnLoading = true
      getCustAddOrModifyCust(this.fromValiData).then(res => {
        if (this.$refs.myUpload.uploadList.length > 0) {
          this.$refs.myUpload.upload(res.result.id, this, this.layerid)
        } else {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          // this.$share.message()
          this.btnLoading = false
        }

        if (res.code === 33) {
          this.btnLoading = false
          this.$confirm('当前客户已存在，是否提交跟进客户申请', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            type: 'warning'
          }).then(() => {
            let ids = {}
            ids.id = res.result.id
            ids.name = res.result.name
            ids.properlyCode = res.result.properlyCode
            ids.contactsMobile = res.result.contactsMobile
            ids.contactsName = res.result.contactsName
            ids.sex = res.result.sex
            getCustResponsibility(ids).then(res => {
              this.$layer.close(this.layerid)
              this.$parent.getListData()
              this.$share.message('申请成功')
              this.loading = false
            }).catch(err => {
              this.$message.error(err.message)
              this.loading = false
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退回'
            })
          })
          return
        }
        this.$layer.close(this.layerid)
        this.$parent.getListData()

        if (res.code === 98) {
          this.btnLoading = false
          // this.$message
        }
        if (res.code === 0) {
          this.$share.message()
        }
        this.btnLoading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleChange(value) {
      this.fromValiData.province = value[0]
      this.fromValiData.city = value[1]
      this.fromValiData.area = value[2]
    },
    // 新增栏客户行业的选择菜单
    getIndustry() {
      this.$layer.iframe({
        content: {
          content: choIndustry, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Max,
        title: '选择行业',
        maxmin: true,
        shadeClose: false
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
      opermanUserId: this.$store.getters.userInfo.userId
    }).then(res => {
      this.fromItemList.forEach(xdd => {
        if (xdd.prop === 'parentCustomer') {
          xdd.data = res.result.pageList
        }
        this.parentCustomer = xdd.data
      })
    })
  },
  created() {}
}
</script>

<style scoped lang='scss'>
</style>
