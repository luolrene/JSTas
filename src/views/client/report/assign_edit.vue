<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import {
  getCrmReportArrangementAddOrModify,
  getCrmReportArrangementGetGroupUser
} from '../../../api/client/report.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        submitUser: []
      },
      rules: {
        reportName: [
          { required: true, message: '请填写报告主题', trigger: 'blur' }
        ],
        remarks: [{ required: true, message: '请填写备注', trigger: 'blur' }],
        submitUser: [
          { required: true, message: '请选择下发用户名称', trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          label: '报告主题',
          prop: 'reportName',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '备注',
          prop: 'remarks',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '下发用户名称',
          prop: 'submitUser',
          value: '',
          type: 'select',
          isRqd: true,
          data: [],
          multiple: true,
          filterable: true,
          labelWidth: 120
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      let ids = JSON.parse(JSON.stringify(this.fromValiData))
      ids.submitUser = ''
      ids.submitUserName = ''
      this.fromItemList[2].data.forEach(xdd => {
        this.fromValiData.submitUser.forEach(arc => {
          if (arc === xdd.id) {
            ids.submitUser += xdd.id + ','
            ids.submitUserName += xdd.name + ','
          }
        })
      })
      ids.submitUser = ids.submitUser.substring(0, ids.submitUser.length - 1)
      ids.submitUserName = ids.submitUserName.substring(
        0,
        ids.submitUserName.length - 1
      )
      getCrmReportArrangementAddOrModify(ids)
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
    getUserData() {
      getCrmReportArrangementGetGroupUser({}).then(res => {
        res.result.forEach(xdd => {
          this.fromItemList[2].data.push({
            id: xdd.userId,
            name: xdd.name
          })
        })
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      this.fromValiData.submitUser = this.fromValiData.submitUser.split(',')
    }
  },
  created() {
    this.getUserData()
  }
}
</script>

<style scoped lang="scss">
</style>
