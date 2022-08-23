<!-- 点位新建 -->
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
import {getContTaskChangePcOrDaysToSampTask} from '../../../api/contract/changeCont.js'
import {getSamplingTaskQuerySamplingPageList} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      disabled: false,
      fromValiData: {
        name: null
      },
      rules: {
        pc: [
          { required: true, message: '请填写频次', trigger: 'blur' },
          {type: 'number', message: '频次必须为数字'}
        ],
        days: [
          { required: true, message: '请填写检测天数', trigger: 'blur' },
          {type: 'number', message: '天数必须为数字'}
        ],
        sampTaskId: [{ required: true, message: '请选择采样任务', trigger: 'change' }]
      },
      fromItemList: [
        {label: '样品类别', prop: 'sampLbName', value: '', type: 'input', isRqd: true, disabled: true},
        {label: '样品类型', prop: 'sampLxName', value: '', type: 'input', isRqd: true, disabled: true},
        {label: '点位名称', prop: 'name', value: '', type: 'input', isRqd: true, disabled: true},
        // {label: '采样任务', prop: 'sampTaskId', value: '', type: 'select', isRqd: true, data: []},
        {label: '频次', prop: 'pc', value: '', type: 'input', number: true, isRqd: true},
        {label: '检测天数', prop: 'days', value: '', type: 'input', number: true, isRqd: true}
      ],
      props: {
        value: 'id',
        label: 'name',
        checkStrictly: true
      }
    }
  },
  methods: {
    onSubmit () {
      if (this.fromValiData.pc < 0) {
        this.$share.message('频次不能为负数', 'warning')
        return
      }
      if (this.fromValiData.days < 0) {
        this.$share.message('检测天数不能为负数', 'warning')
        return
      }

      let ids = {cpods: []}
      let pcNum = this.fromValiData.pc - this.params.pc
      let daysNum = this.fromValiData.days - this.params.days
      if (pcNum > 0) {
        ids.cpods.push({
          changeType: '1', // 1频次2天数
          operType: '1', // 操作类型 1增加2减少
          changeNum: pcNum,
          sampTaskId: this.fromValiData.sampTaskId
        })
      } else if (pcNum < 0) {
        ids.cpods.push({
          changeType: '1', // 1频次2天数
          operType: '2', // 操作类型1增加2减少
          changeNum: -pcNum, // 变化数量
          sampTaskId: this.fromValiData.sampTaskId
        })
      }
      if (daysNum > 0) {
        ids.cpods.push({
          changeType: '2', // 1频次2天数
          operType: '1', // 操作类型 1增加2减少
          changeNum: daysNum,
          sampTaskId: this.fromValiData.sampTaskId
        })
      } else if (daysNum < 0) {
        ids.cpods.push({
          changeType: '2', // 1频次2天数
          operType: '2', // 操作类型1增加2减少
          changeNum: -daysNum, // 变化数量
          sampTaskId: this.fromValiData.sampTaskId
        })
      }
      ids.cp = this.fromValiData
      // console.log(this.fromValiData)
      // console.log(this.params)
      // console.log(ids)
      this.btnLoading = true
      getContTaskChangePcOrDaysToSampTask(ids).then(res => {
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
    this.fromItemList.forEach(xdd => {
      if (xdd.prop === 'sampTaskId') {
        let ids = {pageSize: 99999, pageNow: 1}
        ids.contId = this.params.contId
        getSamplingTaskQuerySamplingPageList(ids).then(res => {
          xdd.data = res.result.pageList
        })
      }
    })
  },
  created () {
    this.fromValiData = JSON.parse(JSON.stringify(this.params))
    this.disabled = true
  }
}
</script>

<style scoped lang="scss">

</style>
