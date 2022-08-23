<!-- 周期合同 -->
<template>
  <div class="operate-container">
    <el-row :gutter="20">
      <el-col :span="11">
        <fromItem
          :obj="this"
          :layerid="layerid"
          :fromItemList="fromItemListA"
          :fromValiData="fromValiData"
          :labelWidth="100"
          type='1'>
        </fromItem>
      </el-col>
      <el-col :span="13">
        <fromItem
          :obj="this"
          :layerid="layerid"
          :fromItemList="fromItemListB"
          :fromValiData="fromValiData"
          :labelWidth="140"
          type='1'>
        </fromItem>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getContTaskQueryCycle} from '../../../api/contract/task.js'
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
      fromItemListA: [
        {label: '周测次数', prop: 'weekTimes', type: 'input', disabled: true, placeholder: ' '},
        {label: '半月测次数', prop: 'halfMonthTimes', type: 'input', disabled: true, placeholder: ' '},
        {label: '月测次数', prop: 'monthTimes', type: 'input', disabled: true, placeholder: ' '},
        {label: '季度测次数', prop: 'quarterlyTimes', type: 'input', disabled: true, placeholder: ' '},
        {label: '半年测次数', prop: 'halfYearTimes', type: 'input', disabled: true, placeholder: ' '},
        {label: '年测次数', prop: 'yearTimes', type: 'input', disabled: true, placeholder: ' '}
      ],
      fromItemListB: [
        {label: '完成周测次数', prop: 'weakFnishdays', type: 'input', disabled: true, placeholder: ' '},
        {label: '完成半月测次数', prop: 'halfmonthFinishdays', type: 'input', disabled: true, placeholder: ' '},
        {label: '完成月测次数', prop: 'monthFinishdays', type: 'input', disabled: true, placeholder: ' '},
        {label: '完成季度测次数', prop: 'quarterlyFinishdays', type: 'input', disabled: true, placeholder: ' '},
        {label: '完成半年测次数', prop: 'halfyearFinishdays', type: 'input', disabled: true, placeholder: ' '},
        {label: '完成年测次数', prop: 'yearFinishdays', type: 'input', disabled: true, placeholder: ' '}
      ]
    }
  },
  methods: {

  },
  mounted () {
    getContTaskQueryCycle({contId: this.params.id}).then(res => {
      if (res.result !== null) {
        this.fromValiData = res.result
      }
    })
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
