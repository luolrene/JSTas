<!-- 编辑样品 -->
<template>
  <div class="operate-container">
   <fromItem
      :obj="this"
      :label-width="100"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import {validateNumber} from '../../../utils/public.js'
import {getSamplingTaskSaveSampNoList} from '../../../api/sampling/sampTask.js'
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
        jd: [{validator: validateNumber, trigger: 'change'}],
        wd: [{validator: validateNumber, trigger: 'change'}],
        cysd: [{validator: validateNumber, trigger: 'change'}],
        temperature: [{validator: validateNumber, trigger: 'change'}],
        pressure: [{validator: validateNumber, trigger: 'change'}],
        humidity: [{validator: validateNumber, trigger: 'change'}],
        oxygen: [{validator: validateNumber, trigger: 'change'}],
        flowRate: [{validator: validateNumber, trigger: 'change'}],
        flow: [{validator: validateNumber, trigger: 'change'}],
        chimneyHign: [{validator: validateNumber, trigger: 'change'}],
        chimneySection: [{validator: validateNumber, trigger: 'change'}]
      },
      fromItemList: [
        {label: '样品编号', prop: 'sampNo', type: 'input', disabled: true},
        {label: '检测指标', prop: 'targetName', type: 'input', disabled: true},
        {label: '点位名称', prop: 'pointName', type: 'input', disabled: true},
        {label: '样品类型', prop: 'sampLxName', type: 'input', disabled: true},

        {label: '点位编号', prop: 'custPointNo', type: 'input'},
        {label: '经度', prop: 'jd', type: 'input', isRqd: true},
        {label: '纬度', prop: 'wd', type: 'input', isRqd: true},
        {label: '采样深度(m)', prop: 'cysd', type: 'input', isRqd: true},
        {label: '利用现状', prop: 'useTo', type: 'input'},
        {label: '表现', prop: 'show', type: 'input'},
        {label: '采样时间', prop: 'cyTime', type: 'date'},
        {label: '温度', prop: 'temperature', type: 'input', isRqd: true},
        {label: '压力', prop: 'pressure', type: 'input', isRqd: true},
        {label: '含湿量', prop: 'humidity', type: 'input', isRqd: true},
        {label: '含氧量', prop: 'oxygen', type: 'input', isRqd: true},
        {label: '流速', prop: 'flowRate', type: 'input', isRqd: true},
        {label: '流量', prop: 'flow', type: 'input', isRqd: true},
        {label: '烟囱高度', prop: 'chimneyHign', type: 'input', isRqd: true},
        {label: '烟囱截面积', prop: 'chimneySection', type: 'input', isRqd: true},
        {label: '白天黑夜',
          prop: 'dayOrNight',
          type: 'select',
          data: [
            {id: '昼间', name: '昼间'},
            {id: '夜间', name: '夜间'}
          ]},
        {label: '状态', prop: 'statusName', type: 'input', disabled: true},
        {label: '是否质控', prop: 'isZkName', type: 'input', disabled: true}
      ]
    }
  },
  methods: {
    onSubmit () {
      let data = []
      let ids = JSON.parse(JSON.stringify(this.fromValiData))
      delete ids.isZkName
      delete ids.statusName
      ids.workType = '2' // 1新增 2修改
      data.push(ids)
      this.btnLoading = true
      getSamplingTaskSaveSampNoList(data).then(res => {
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
