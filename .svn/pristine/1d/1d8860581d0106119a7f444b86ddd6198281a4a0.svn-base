<!-- 新建报告任务-->
<template>
  <div class="operate-container">
   <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :labelWidth="100"
      :btnLoading="btnLoading"
      :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import { validateNumber } from '@/utils/public.js'
import {getReportTaskAddOrModifyReport} from '@/api/sampling/majorTask.js'
export default {
  props: {
    layerid: '',
    addParams: Object,
    params: Object,
    projectTypeData: Array
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        custName: '',
        proName: '',
        name: '',
        addNum: '1'
      },
      rules: {
        name: [{ required: true, message: '请填写监测计划', trigger: 'blur' }],
        xmlxName: [{ required: true, message: '请选择项目类型', trigger: 'change' }],
        addNum: [
          { required: true, message: '请填写数量', trigger: 'change' },
          { validator: validateNumber, trigger: 'change' }
        ],
        cyStartTime: []
      },
      fromItemList: [
        {label: '主任务', prop: 'taskName', value: '', type: 'input', disabled: true},
        {label: '监测计划', prop: 'name', value: '', type: 'input', isRqd: true},
        {label: '数量', prop: 'addNum', value: '', type: 'input', isRqd: true},

        {label: '项目类型', prop: 'xmlxName', value: 'xmlx', type: 'select', isRqd: true, data: this.projectTypeData},
        {label: '报告期限', prop: 'term', value: '', type: 'date', isRqd: true, labelWidth: '110'},
        {label: '客户名称', prop: 'custName', value: '', type: 'input', disabled: true},
        {label: '项目名称', prop: 'proName', value: '', type: 'input', disabled: true},
        {label: '是否周期', prop: 'isCycleName', value: '', type: 'input', disabled: true}
      ]
    }
  },
  methods: {
    onSubmit () {
      this.btnLoading = true
      if (this.fromValiData.addNum !== '') {
        this.fromValiData.addNum = Number(this.fromValiData.addNum)
      }
      getReportTaskAddOrModifyReport(this.fromValiData).then(res => {
        this.$parent.getListData()
        this.$layer.close(this.layerid)
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    }
  },
  mounted () {

  },
  created () {
    if (this.addParams) {
      this.fromValiData.contId = this.addParams.contId
      this.fromValiData.custId = this.addParams.custId
      this.fromValiData.custName = this.addParams.custName
      this.fromValiData.proName = this.addParams.proName
      this.fromValiData.name = this.addParams.proName
      this.fromValiData.taskName = this.addParams.taskName
      this.fromValiData.mainId = this.addParams.id
      this.fromValiData.type = this.addParams.type
      this.fromValiData.isCycle = this.addParams.isCycle
      this.fromValiData.isCycleName = this.addParams.isCycleName
    }
    if (this.params) {
      this.fromValiData = this.params
      this.fromItemList.forEach(xdd => {
        if (xdd.prop === 'xmlxName' || xdd.prop === 'addNum') {
          xdd.type = 'false'
        }
      })
      this.rules.cyStartTime = [
        { required: true, message: '请选择采样开始日期', trigger: 'change' }
      ]
    }
    if (this.projectTypeData.length === 1) {
      this.fromValiData.xmlx = this.projectTypeData[0].id
      this.fromValiData.xmlxName = this.projectTypeData[0].name
    }
  }
}
</script>

<style scoped lang="scss">

</style>
