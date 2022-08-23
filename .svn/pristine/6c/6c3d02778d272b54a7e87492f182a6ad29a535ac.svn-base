<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :rules="rules"
      :btnLoading="btnLoading"
      :labelWidth="120">
      <el-form-item label="附件上传:" slot="upload" label-width="100px">
        <myUpload ref="myUpload" fileType="1" :fileList="fileList" delType="not"></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import {getFileQueryFileList} from '@/api/file.js'
import { getChangeContAddOrModifyData } from '../../../../api/contract/msg.js'
import { getPathQueryAllPath } from '../../../../api/jcxxgl/exmProcess.js'
import { validateNumber } from '../../../../utils/public.js'
export default {
  props: {
    params: Object,
    addParams: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        oldMoney: '',
        newMoney: null,
        changeDetail: '',
        newReportTaskNum: ''
      },
      fileList: [],
      rules: {
        newMoney: [
          { required: true, message: '请填写新合同金额', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],

        newReportTaskNum: [
          { required: true, message: '请填写旧报告任务数', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        hasCase: [
          { required: true, message: '请选择是否包含方案修改', trigger: 'blur' }
        ]
        // checkPath: [{ required: true, message: '请选择审核流程', trigger: 'change' }]
      },
      fromItemList: [
        {
          label: '旧合同金额',
          prop: 'oldMoney',
          type: 'input',
          disabled: true
        },
        {
          label: '新合同金额',
          prop: 'newMoney',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '旧报告任务数',
          prop: 'oldReportTaskNum',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '新报告任务数',
          prop: 'newReportTaskNum',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '是否包含方案修改',
          prop: 'hasCase',
          value: '',
          type: 'select',
          isRqd: true,
          labelWidth: 140,
          data: [{ name: '是', id: '1' }, { name: '否', id: '0' }]
        },

        { label: '变更描述', prop: 'changeDetail', value: '', type: 'textarea' }

        // {label: '审核流程', prop: 'checkPath', value: '', type: 'select', isRqd: true, data: []}
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getChangeContAddOrModifyData(this.fromValiData).then(res => {
        if (this.$refs.myUpload.uploadList.length > 0) {
          this.$refs.myUpload.upload(this.fromValiData.contId, this, this.layerid)
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
    getExmProcess() {
      getPathQueryAllPath({}).then(res => {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'checkPath') {
            xdd.data = res.result
          }
        })
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      getFileQueryFileList({id: this.params.contId, type: '1'}).then(res => {
        this.fileList = res.result
      })
    } else {
      this.fromValiData.contId = this.addParams.id
      this.fromValiData.oldReportTaskNum = this.addParams.reportTaskNum
      this.fromValiData.newReportTaskNum = this.addParams.reportTaskNum
      this.fromValiData.contOldStatus = this.addParams.status
      this.fromValiData.oldMoney = this.addParams.price
      this.fromValiData.newMoney = this.fromValiData.oldMoney
    }
  },
  created() {
    this.getExmProcess()
  }
}
</script>

<style scoped lang="scss">
</style>
