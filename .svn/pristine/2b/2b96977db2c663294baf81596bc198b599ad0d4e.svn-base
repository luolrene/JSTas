<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules">
       <el-form-item label="附件上传:" slot="upload">
        <myUpload ref="myUpload" fileType="4" :fileList="fileList"></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { getCrmOfferAddOrModify } from '@/api/client/quotationRecord.js'
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
        trigger: '',
        stamp: '1',
        type: '1',
        custName: ''
      },
      rules: {
        custName: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        offerDescribe: [
          { required: true, message: '请填写描述', trigger: 'blur' }
        ],
        offerAmountOfmoney: [
          { required: true, message: '请填写金额', trigger: 'blur' }
        ],
        stamp: [
          { required: true, message: '请选择是否盖章扫描', trigger: 'change' }
        ],
        type: [{ required: true, message: '请选择盖章类型', trigger: 'change' }]
      },
      fromItemList: [
        {
          label: '客户名称',
          prop: 'custName',
          value: '',
          type: 'input',
          isRqd: true,
          disabled: true
        },
        {
          label: '描述',
          prop: 'offerDescribe',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '金额',
          prop: 'offerAmountOfmoney',
          value: '',
          type: 'input',
          isRqd: true
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
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.fromValiData.stamp === '1') {
        if (this.$refs.myUpload.uploadList.length < 1) {
          this.$share.message('请上传相关附件', 'warning')
          this.btnLoading = false
        } else {
          getCrmOfferAddOrModify(this.fromValiData)
            .then(res => {
              this.$refs.myUpload.upload(res.result, this, this.layerid)
            })
            .catch(() => {
              this.btnLoading = false
            })
        }
      }
    }
  },
  mounted() {
    this.fromValiData.custName = this.params.name
    this.fromValiData.custId = this.params.id
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
