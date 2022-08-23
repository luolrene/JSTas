<!-- 周期合同 -->
<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :labelWidth="100"
      :btnLoading="btnLoading"
      :rules="rules"
      :type="buttonType">
    </fromItem>
  </div>
</template>

<script>
import {getContTaskAddOrModifyCycle, getContTaskQueryCycle} from '../../../api/contract/task.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        weekTimes: 0,
        halfMonthTimes: 0,
        monthTimes: 0,
        quarterlyTimes: 0,
        halfYearTimes: 0,
        yearTimes: 0
      },
      rules: {
        weekTimes: [
          { required: true, message: '请填写周测次数', trigger: 'blur' },
          {type: 'number', message: '周测次数必须为数字值'}
        ],
        halfMonthTimes: [
          { required: true, message: '请填写半月测次数', trigger: 'blur' },
          {type: 'number', message: '半月测次数必须为数字值'}
        ],
        monthTimes: [
          { required: true, message: '请填写月测次数', trigger: 'blur' },
          {type: 'number', message: '月测次数必须为数字值'}
        ],
        quarterlyTimes: [
          { required: true, message: '请填写季度测次数', trigger: 'blur' },
          {type: 'number', message: '季度测次数必须为数字值'}
        ],
        halfYearTimes: [
          { required: true, message: '请填写半年测次数', trigger: 'blur' },
          {type: 'number', message: '半年测次数必须为数字值'}
        ],
        yearTimes: [
          { required: true, message: '请填写年测次数', trigger: 'blur' },
          {type: 'number', message: '年测次数必须为数字值'}
        ]
      },
      fromItemList: [
        {label: '周测次数', prop: 'weekTimes', value: '', number: true, type: 'input', isRqd: true},
        {label: '半月测次数', prop: 'halfMonthTimes', value: '', number: true, type: 'input', isRqd: true},
        {label: '月测次数', prop: 'monthTimes', value: '', number: true, type: 'input', isRqd: true},
        {label: '季度测次数', prop: 'quarterlyTimes', value: '', number: true, type: 'input', isRqd: true},
        {label: '半年测次数', prop: 'halfYearTimes', value: '', number: true, type: 'input', isRqd: true},
        {label: '年测次数', prop: 'yearTimes', value: '', number: true, type: 'input', isRqd: true}
      ],
      buttonType: ''
    }
  },
  methods: {
    onSubmit () {
      this.fromValiData.contId = this.params.id
      console.log(this.fromItemList)
      let isPass = false
      if (this.fromValiData.weekTimes > 0) {
        isPass = true
      } else if (this.fromValiData.halfMonthTimes > 0) {
        isPass = true
      } else if (this.fromValiData.monthTimes > 0) {
        isPass = true
      } else if (this.fromValiData.quarterlyTimes > 0) {
        isPass = true
      } else if (this.fromValiData.halfYearTimes > 0) {
        isPass = true
      } else if (this.fromValiData.yearTimes > 0) {
        isPass = true
      }
      if (!isPass) {
        this.$share.message('请填写一个周期信息并且大于1天', 'warning')
        return
      }
      this.btnLoading = true
      getContTaskAddOrModifyCycle(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    }
  },
  mounted () {
    getContTaskQueryCycle({contId: this.params.id}).then(res => {
      if (res.result !== null) {
        this.fromValiData = res.result
      }
    })
  },
  created () {
    if (this.params.status === '06') {
      this.fromItemList.forEach(xdd => {
        xdd.disabled = true
      })
      this.buttonType = '1'
    }
  }
}
</script>

<style scoped lang="scss">

</style>
