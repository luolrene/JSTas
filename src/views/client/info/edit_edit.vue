<template>
  <div class='operate-container'>
    <fromItem
      :obj='this'
      :layerid='layerid'
      :fromItemList='fromItemList'
      :fromValiData='fromValiData'
      :btnLoading='btnLoading'
      :rules='rules'
      :labelWidth='100'>

      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' fileType='4' :fileList='fileList'></myUpload>
      </el-form-item>

    </fromItem>
  </div>
</template>

<script>
import choIndustry from './choIndustry'
import { getCustQueryPageData } from '@/api/contract/customer.js'
import { getCustAddOrModifyCust } from '@/api/client/info.js'

export default {
  props: {
    params: Object,
    layerid: '',
    id: String
  },
  data() {
    return {
      fileList: [],
      btnLoading: false,
      fromValiData: {
        id: null,
        industryName: '',
        type: '',
        parentCustomer: null,
        contactsMobile: null,
        contactsName: null
      },
      rules: {
        name: [{ required: true, message: '请填写客户名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择客户性质', trigger: 'blur' }],
        // properlyCode: [
        //   { required: true, message: '请填写社会统一信用代码', trigger: 'blur' }
        // ],

        deal: [{ required: true, message: '请选择是否成交', trigger: 'blur' }]
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
          label: '客户性质',
          prop: 'type',
          value: '',
          type: 'select',
          isRqd: true,
          disabled: true,
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
          isRqd: true,
          disabled: true
        },
        {
          label: '上级客户',
          prop: 'parentCustomer',
          value: '',
          type: 'select',
          filterable: true,
          data: [],
          disabled: true
        },
        {
          label: '所在区域',
          prop: 'area',
          value: '',
          type: 'cascader_city',
          click: 'handleChange'
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
          ],
          disabled: true
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
          disabled: true
        },
        {
          label: '客户行业',
          prop: 'industryName',
          value: '',
          type: 'inputChoice',
          click: 'getIndustry'
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
      deep: true,
      immediate: true,
      handler: function(newV, oldV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'type') {
            if (this.$store.getters.userInfo.lev >= 5) {
              item.disabled = false
            } else {
              item.disabled = true
            }
          }

          if (item.prop === 'properlyCode') {
            if (newV === oldV) {
              return
            }
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
          if (
            item.prop === 'properlyCode' &&
            this.$store.getters.userInfo.lev >= 5
          ) {
            if (newV === '4' || newV === '5' || newV === '6' || newV === '7') {
              item.disabled = false
            } else {
              item.disabled = true
            }
          }
        })
      }
    },

    'fromValiData.importantCustomers': {
      deep: true,
      handler: function(newV, oldV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'importantCustomers') {
            if (this.$store.getters.userInfo.lev >= 5) {
              item.disabled = false
            } else {
              item.disabled = true
            }
          }
        })
      }
    }
  },
  methods: {
    onSubmit(formName) {
      console.log(this.fromValiData)
      if (this.fromValiData.type !== '1' && (this.fromValiData.properlyCode === '' || this.fromValiData.properlyCode === ' ')) {
        this.$share.message('社会统一信用代码不能为空', 'warning')
        return
      }
      this.btnLoading = true
      getCustAddOrModifyCust(this.fromValiData).then(res => {
        if (res.code === 0) {
          this.$share.message()
        }
        if (this.$refs.myUpload.uploadList.length > 0) {
          this.$refs.myUpload.upload(this.params.id, this, this.layerid)
        } else {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.btnLoading = false
        }
        if (res.code === 33) {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.btnLoading = false
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
    getCustQueryPageData({ pageSize: 999, pageNow: 1 }).then(res => {
      this.fromItemList.forEach(xdd => {
        if (xdd.prop === 'parentCustomer') {
          xdd.data = res.result.pageList
        }
      })
    })
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created() {}
}
</script>
<style scoped lang='scss'>
</style>
