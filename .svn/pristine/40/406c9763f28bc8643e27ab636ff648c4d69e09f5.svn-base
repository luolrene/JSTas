<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
      <el-form-item label="附件上传:" slot="upload">
        <myUpload ref="myUpload" fileType="4" :fileList="fileList"></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import {
  getCrmReportAddOrModify,
  getCrmReportArrangementGetGroupUser
} from '../../../api/client/report.js'
import { getFileQueryFileList } from '../../../api/file.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        submitUser: [],
        reportType: '',
        reportTime: ''
      },
      rules: {
        reportName: [
          { required: true, message: '请填写报告名称', trigger: 'blur' }
        ],
        reportType: [
          { required: true, message: '请选择报告类型', trigger: 'change' }
        ],
        reportTime: [
          { required: true, message: '请选择报告时间', trigger: 'change' }
        ],
        submitUser: [
          { required: true, message: '请选择抄送人', trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          label: '报告名称',
          prop: 'reportName',
          value: '',
          type: 'input',
          isRqd: true,
          disabled: false
        },
        {
          label: '报告类型',
          prop: 'reportType',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            { id: '1', name: '日报' },
            { id: '2', name: '周报' },
            { id: '3', name: '月报' },
            { id: '4', name: '季报' },
            { id: '5', name: '年报' },
            { id: '6', name: '其他' }
          ]
        },
        {
          label: '报告时间',
          prop: 'reportTime',
          value: '',
          type: 'date',
          isRqd: true
        },
        {
          label: '抄送人',
          prop: 'submitUser',
          value: '',
          type: 'select',
          isRqd: true,
          data: [],
          multiple: true,
          filterable: true,
          disabled: false
        },
        {
          label: '报告内容',
          prop: 'reportContent',
          value: '',
          type: 'textarea'
        }
      ],
      fileList: []
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      let ids = JSON.parse(JSON.stringify(this.fromValiData))
      ids.submitUser = ids.submitUser.join(',')
      getCrmReportAddOrModify(ids)
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
    getUserData() {
      getCrmReportArrangementGetGroupUser({}).then(res => {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'submitUser') {
            res.result.forEach(arc => {
              xdd.data.push({
                id: arc.userId,
                name: arc.name
              })
            })
          }
        })
      })
    }
  },
  mounted() {
    if (this.params) {
      getFileQueryFileList({ id: this.params.id, type: '4' }).then(res => {
        this.fileList = res.result
      })
      this.fromValiData = this.params
      console.log(this.fromValiData.submitUser)

      this.fromValiData.submitUser = this.fromValiData.submitUser.split(',')

      if (this.params.fatherId !== null) {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'submitUser') {
            xdd.disabled = true
          }
        })
      }
    }
  },
  created() {
    this.getUserData()
  }
}
</script>

<style scoped lang="scss">
</style>
