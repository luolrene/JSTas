<!-- 编辑样品 -->
<template>
  <div class="operate-container">
   <fromItem
      :obj="this"
      :label-width="130"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import {getTargetResultSaveLrlx1} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {

      },
      rules: {

      },
      fromItemList: [
        {label: '指标名称', prop: 'targetName', type: 'input', disabled: true},
        {label: '检测时间', prop: 'checkTime', type: 'daterange'},
        {label: '检测结果', prop: 'resultNum', type: 'input'},
        {label: '检测结果单位', prop: 'resultDw', type: 'input', disabled: true},
        {label: '折算浓度(mg/m³)', prop: 'zsnd', type: 'input', isRqd: true},
        {label: '排放量(kg/h)', prop: 'pfl', type: 'input', isRqd: true},
        {label: '背景值', prop: 'bjValue', type: 'input', isRqd: true},
        {label: '相对偏差', prop: 'xdpc', type: 'input'},
        {label: '加标量', prop: 'jbl', type: 'input'},
        {label: '回收率', prop: 'hsl', type: 'input'},
        {label: '平行结果', prop: 'pxResult', type: 'input', isRqd: true},
        {label: '相对误差', prop: 'xdwc', type: 'input', isRqd: true},
        {label: '仪器名称+型号', prop: 'machineName', type: 'input', disabled: true, placeholder: ' '},
        {label: '仪器编号', prop: 'machineNo', type: 'input', disabled: true, placeholder: ' '},
        {label: '是否现场', prop: 'isSceneName', type: 'input', disabled: true}
      ]
    }
  },
  methods: {
    onSubmit () {
      let data = []
      let ids = JSON.parse(JSON.stringify(this.fromValiData))
      if (ids.checkTime !== null && ids.checkTime !== '') {
        ids.checkTime = ids.checkTime.join(',')
      }
      // delete ids.isSceneName
      // delete ids.targetStatusName
      data.push(ids)
      getTargetResultSaveLrlx1(data).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
      })
    }
  },
  mounted () {
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
